"use server";

import { isRedirectError } from "next/dist/client/components/redirect-error";
import { hashSync } from "bcrypt-ts-edge";
import prisma from "@/db/prisma";
import { auth, signIn, signOut } from "@/auth";
import crypto from "crypto";
import { resend } from "@/lib/email";

import { signInFormSchema } from "../validators";
import { signUpFormSchema } from "../validators";
import { convertToPlainObject, formatError } from "../utils";

export async function signInWithCredentials(
  prevState: unknown,
  formData: FormData
) {
  try {
    const user = signInFormSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    await signIn("credentials", user);

    return { success: true, message: "Signed in successfully." };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    return { success: false, message: "Invalid email or password." };
  }
}

export async function signOutUser() {
  await signOut();
}

export async function signUpUser(prevState: unknown, formData: FormData) {
  try {
    const user = signUpFormSchema.parse({
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    });

    const plainPassword = user.password;

    user.password = hashSync(user.password, 10);

    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });

    await signIn("credentials", {
      email: user.email,
      password: plainPassword,
    });

    return { success: true, message: "User registered successfully." };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    return { success: false, message: formatError(error) };
  }
}

export async function updateUserProfile(user: { name: string; email: string }) {
  try {
    const session = await auth();
    const currentUser = await prisma.user.findFirst({
      where: {
        id: session?.user?.id,
      },
    });

    if (!currentUser) throw new Error("User not found.");

    await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        name: user.name,
      },
    });

    await prisma.character.updateMany({
      where: {
        player: currentUser.name,
      },
      data: {
        player: user.name,
      },
    });

    return { success: true, message: "User updated successfully." };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

export async function getAllUsers() {
  const data = await prisma.user.findMany({
    orderBy: { name: "asc" },
  });

  return convertToPlainObject(data);
}

export async function requestPasswordReset(email: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return { success: true };

  const token = crypto.randomBytes(32).toString("hex");

  await prisma.user.update({
    where: { id: user.id },
    data: {
      resetToken: token,
      resetTokenExpires: new Date(Date.now() + 1000 * 60 * 60),
    },
  });

  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;

  await resend.emails.send({
    from: process.env.EMAIL_FROM!,
    to: user.email,
    subject: "Reset your password",
    html: `
      <p>You requested a password reset.</p>
      <p>
        <a href="${resetUrl}">
          Click here to reset your password
        </a>
      </p>
      <p>This link expires in 1 hour.</p>
      <p>If you didn’t request this, you can ignore this email.</p>
    `,
  });

  return { success: true };
}

export async function resetPassword(token: string, newPassword: string) {
  const user = await prisma.user.findFirst({
    where: {
      resetToken: token,
      resetTokenExpires: {
        gt: new Date(),
      },
    },
  });

  if (!user) {
    return { success: false, message: "Invalid or expired token" };
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      password: hashSync(newPassword, 10),
      resetToken: null,
      resetTokenExpires: null,
    },
  });

  return { success: true };
}

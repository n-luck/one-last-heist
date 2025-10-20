import { Logo } from "@/components/Header/Logo";
import { SignUp } from "@/components/SignUp";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


export const SignUpPage = () => {
  return (
    <div className="w-full max-w-md mx-auto">
      <Card>
        <CardHeader className="gap-4">
          <Logo />
          <CardTitle className="text-center h1-bold">Sign up</CardTitle>
          <CardDescription className="text-center">
            Enter your information below to sign up.
          </CardDescription>
        </CardHeader>
        <CardContent className="gap-4">
          <SignUp />
        </CardContent>
      </Card>
    </div>
  );
};

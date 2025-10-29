// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// to do: update once zod bug is resolved

"use client";

import { useRouter } from "next/navigation";
import { ControllerRenderProps, useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import slugify from "slugify";

import { zodResolver } from "@hookform/resolvers/zod";
import { insertCharacterSchema, updateCharacterSchema } from "@/lib/validators";
import {
  createCharacter,
  updateCharacter,
} from "@/lib/actions/character.actions";

import { Character } from "@/types";
import { characterDefaultValues } from "@/lib/constants";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

import { CharacterFormFields } from "./CharacterFormFields";
import { CharacterFormArray } from "./CharacterFormArray";
import { CharacterFormImage } from "./CharacterFormImage";
import Link from "next/link";

interface CharacterFormProps {
  character?: Character;
  characterId?: string;
  type: "create" | "update";
  player?: string;
}

export const CharacterForm = ({
  character,
  characterId = "",
  type = "create",
  player = "Player",
}: CharacterFormProps) => {
  const router = useRouter();
  const isUpdate = type === "update";
  const formTypeCopy = type.charAt(0).toUpperCase() + type.slice(1);

  const schema = isUpdate ? updateCharacterSchema : insertCharacterSchema;
  const defaultValues = isUpdate
    ? character
    : { ...characterDefaultValues, player };

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const onSubmit: SubmitHandler<z.infer<typeof schema>> = async (values) => {
    const action = isUpdate
      ? updateCharacter({ ...values, id: characterId })
      : createCharacter(values);

    const res = await action;
    if (!res.success) return toast.error(res.message);

    toast.success(res.message);
    router.push("/user");
  };

  return (
    <>
      <h1 className="h1-bold">{formTypeCopy} Character</h1>
      <Form {...form}>
        <form
          className="flex flex-col gap-5"
          method="POST"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="grid md:grid-cols-2 gap-5 items-start">
            <FormField
              control={form.control}
              name="name"
              render={({
                field,
              }: {
                field: ControllerRenderProps<
                  z.infer<typeof insertCharacterSchema>,
                  "name"
                >;
              }) => (
                <FormItem className="w-full">
                  <FormLabel>Character name*</FormLabel>
                  <FormControl>
                    <Input className="input-field" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="slug"
              render={({
                field,
              }: {
                field: ControllerRenderProps<
                  z.infer<typeof insertCharacterSchema>,
                  "slug"
                >;
              }) => (
                <FormItem className="w-full">
                  <FormLabel>Character slug (URL)*</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input className="input-field" {...field} />
                      <Button
                        type="button"
                        size="sm"
                        className="text-xs p-1 h-auto"
                        onClick={() => {
                          form.setValue(
                            "slug",
                            slugify(form.getValues("name"), { lower: true })
                          );
                        }}
                      >
                        Generate
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <CharacterFormFields form={form} />

            <div className="md:col-span-2 upload-field">
              <CharacterFormImage control={form.control} form={form} />
            </div>

            <hr className="col-span-2" />

            <CharacterFormArray
              name="specialAbilities"
              label="Special Abilities*"
              control={form.control}
              register={form.register}
            />
            <CharacterFormArray
              name="bonds"
              label="Bonds"
              control={form.control}
              register={form.register}
            />
            <CharacterFormArray
              name="stress"
              label="Stress"
              control={form.control}
              register={form.register}
            />

            <hr className="col-span-2" />

            <FormField
              control={form.control}
              name="background"
              render={({
                field,
              }: {
                field: ControllerRenderProps<
                  z.infer<typeof insertCharacterSchema>,
                  "background"
                >;
              }) => (
                <FormItem className="w-full">
                  <FormLabel>Background</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="notes"
              render={({
                field,
              }: {
                field: ControllerRenderProps<
                  z.infer<typeof insertCharacterSchema>,
                  "notes"
                >;
              }) => (
                <FormItem className="w-full">
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            size="lg"
            className="button w-full md:mx-auto md:w-md mt-4"
            disabled={form.formState.isSubmitting}
            variant="gradient"
          >
            {form.formState.isSubmitting
              ? "Submitting..."
              : `${formTypeCopy} Character`}
          </Button>
          <Button
            size="lg"
            className="button w-full md:mx-auto md:w-md"
            disabled={form.formState.isSubmitting}
            variant="ghost"
            asChild
          >
            <Link
              href="/user"
            >
              Cancel
            </Link>
          </Button>
        </form>
      </Form>
    </>
  );
};

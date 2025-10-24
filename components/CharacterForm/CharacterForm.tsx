// @ts-nocheck
// to do: update once zod bug is resolved

"use client";

import { useRouter } from "next/navigation";
import {
  ControllerRenderProps,
  useForm,
  useFieldArray,
  SubmitHandler,
} from "react-hook-form";
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

  const createForm = useForm<z.infer<typeof insertCharacterSchema>>({
    resolver: zodResolver(insertCharacterSchema),
    defaultValues: { ...characterDefaultValues, player: player },
  });
  const updateForm = useForm<z.infer<typeof updateCharacterSchema>>({
    resolver: zodResolver(updateCharacterSchema),
    defaultValues: character,
  });

  const form = isUpdate ? updateForm : createForm;
  const {
    fields: specialFields,
    append: specialAppend,
    remove: specialRemove,
  } = useFieldArray({
    control: form.control,
    name: "specialAbilities",
  });

  const {
    fields: bondsFields,
    append: bondsAppend,
    remove: bondsRemove,
  } = useFieldArray({
    control: form.control,
    name: "bonds",
  });

  const {
    fields: conditionsFields,
    append: conditionsAppend,
    remove: conditionsRemove,
  } = useFieldArray({
    control: form.control,
    name: "conditions",
  });

  const {
    fields: stressFields,
    append: stressAppend,
    remove: stressRemove,
  } = useFieldArray({
    control: form.control,
    name: "stress",
  });

  const onSubmit: SubmitHandler<z.infer<typeof insertCharacterSchema>> = async (
    values
  ) => {
    if (isUpdate) {
      if (!characterId) {
        router.push("/user");
        return;
      }

      const res = await updateCharacter({ ...values, id: characterId });

      if (!res.success) {
        return toast.error(res.message);
      } else {
        toast.message(res.message);
        router.push("/user");
      }
    }

    const res = await createCharacter(values);
    if (!res.success) {
      return toast.error(res.message);
    } else {
      toast.message(res.message);
      router.push("/user");
      return;
    }

    toast.message(res.message);
  };

  return (
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
          <FormField
            control={form.control}
            name="pronouns"
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof insertCharacterSchema>,
                "pronouns"
              >;
            }) => (
              <FormItem className="w-full">
                <FormLabel>Pronouns</FormLabel>
                <FormControl>
                  <Input className="input-field" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="campaign"
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof insertCharacterSchema>,
                "campaign"
              >;
            }) => (
              <FormItem className="w-full">
                <FormLabel>Campaign*</FormLabel>
                <FormControl>
                  <Input className="input-field" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="primaryRole"
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof insertCharacterSchema>,
                "primaryRole"
              >;
            }) => (
              <FormItem className="w-full">
                <FormLabel>Primary role*</FormLabel>
                <FormControl>
                  <Input className="input-field" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="secondaryRole"
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof insertCharacterSchema>,
                "secondaryRole"
              >;
            }) => (
              <FormItem className="w-full">
                <FormLabel>Secondary role #1*</FormLabel>
                <FormControl>
                  <Input className="input-field" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="secondaryRole2"
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof insertCharacterSchema>,
                "secondaryRole2"
              >;
            }) => (
              <FormItem className="w-full">
                <FormLabel>Secondary role #2*</FormLabel>
                <FormControl>
                  <Input className="input-field" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="look"
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof insertCharacterSchema>,
                "look"
              >;
            }) => (
              <FormItem className="w-full">
                <FormLabel>Look</FormLabel>
                <FormControl>
                  <Input className="input-field" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="assets"
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof insertCharacterSchema>,
                "assets"
              >;
            }) => (
              <FormItem className="w-full">
                <FormLabel>Assets</FormLabel>
                <FormControl>
                  <Input className="input-field" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof insertCharacterSchema>,
                "image"
              >;
            }) => (
              <FormItem className="w-full">
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <Input className="input-field" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="specialAbilities"
            render={() => (
              <FormItem className="w-full">
                <FormLabel>Special Abilities*</FormLabel>
                <FormControl>
                  <div className="flex flex-col gap-2">
                    {specialFields.map((field, index) => (
                      <div key={field.id} className="flex gap-2 items-center">
                        <Input
                          {...form.register(
                            `specialAbilities.${index}` as const
                          )}
                          className="input-field"
                        />
                        <Button
                          type="button"
                          size="sm"
                          onClick={() => specialRemove(index)}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => specialAppend("")} // add empty string for a new ability
                    >
                      Add Ability
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bonds"
            render={() => (
              <FormItem className="w-full">
                <FormLabel>Bonds</FormLabel>
                <FormControl>
                  <div className="flex flex-col gap-2">
                    {bondsFields.map((field, index) => (
                      <div key={field.id} className="flex gap-2 items-center">
                        <Input
                          {...form.register(`bonds.${index}` as const)}
                          className="input-field"
                        />
                        <Button
                          type="button"
                          size="sm"
                          onClick={() => bondsRemove(index)}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => bondsAppend("")} // add empty string for a new ability
                    >
                      Add Bond
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="conditions"
            render={() => (
              <FormItem className="w-full">
                <FormLabel>Conditions</FormLabel>
                <FormControl>
                  <div className="flex flex-col gap-2">
                    {conditionsFields.map((field, index) => (
                      <div key={field.id} className="flex gap-2 items-center">
                        <Input
                          {...form.register(`conditions.${index}` as const)}
                          className="input-field"
                        />
                        <Button
                          type="button"
                          size="sm"
                          onClick={() => conditionsRemove(index)}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => conditionsAppend("")} // add empty string for a new ability
                    >
                      Add Condition
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="stress"
            render={() => (
              <FormItem className="w-full">
                <FormLabel>Stress</FormLabel>
                <FormControl>
                  <div className="flex flex-col gap-2">
                    {stressFields.map((field, index) => (
                      <div key={field.id} className="flex gap-2 items-center">
                        <Input
                          {...form.register(`stress.${index}` as const)}
                          className="input-field"
                        />
                        <Button
                          type="button"
                          size="sm"
                          onClick={() => stressRemove(index)}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => stressAppend("")} // add empty string for a new ability
                    >
                      Add Stress
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
          className="button w-full md:w-md md:mx-auto mt-4"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting
            ? "Submitting..."
            : `${type.charAt(0).toUpperCase() + type.slice(1)} Character`}
        </Button>
      </form>
    </Form>
  );
};

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateCharacterSchema } from "@/lib/validators";
import { updateCharacter } from "@/lib/actions/character.actions";
import { z } from "zod";
import { toast } from "sonner";
import { Character } from "@/types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export const CharacterForm = (character: {character: Character}) => {
  // console.log(character)
  const form = useForm<z.infer<typeof updateCharacterSchema>>({
    resolver: zodResolver(updateCharacterSchema),
    defaultValues: {
      player: character?.character.player ?? "",
      name: character?.character.name ?? "",
    },
  });

  const onSubmit = async (values: z.infer<typeof updateCharacterSchema>) => {
    const res = await updateCharacter(character.character.id, values.name);

    if (!res.success) {
      return toast.error(res.message);
    }

    toast.message(res.message);
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="grid md:grid-cols-2 gap-5">
          <FormField
            control={form.control}
            name="player"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Player</FormLabel>
                <FormControl>
                  <Input
                    disabled
                    placeholder="Player"
                    className="input-field"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Character name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Name"
                    className="input-field"
                    {...field}
                  />
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
          {form.formState.isSubmitting ? "Submitting..." : "Update Character"}
        </Button>
      </form>
    </Form>
  );
};

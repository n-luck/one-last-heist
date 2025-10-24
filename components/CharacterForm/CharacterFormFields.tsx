/* eslint-disable @typescript-eslint/no-explicit-any */
import slugify from "slugify";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

interface CharacterFormFieldsProps {
  form: any;
}

export const CharacterFormFields = ({ form }: CharacterFormFieldsProps) => {
  const textFields = [
//     { name: "name", label: "Character name*" },
//     { name: "slug", label: "Character slug (URL)*" },
    { name: "pronouns", label: "Pronouns" },
    { name: "campaign", label: "Campaign*" },
    { name: "primaryRole", label: "Primary role*" },
    { name: "secondaryRole", label: "Secondary role #1*" },
    { name: "secondaryRole2", label: "Secondary role #2*" },
    { name: "look", label: "Look" },
    { name: "assets", label: "Assets" },
  ];

  return (
    <>
      {textFields.map(({ name, label }) => (
        <FormField
          key={name}
          control={form.control}
          name={name as any}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{label}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="input-field"
                  onBlur={() => {
                    if (name === "slug" && !field.value) {
                      form.setValue(
                        "slug",
                        slugify(form.getValues("name"), { lower: true })
                      );
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
    </>
  );
};

import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { characterTextFields, roleOptions } from "../Character/constants";

interface CharacterFormFieldsProps {
  form: UseFormReturn;
}

export const CharacterFormFields = ({ form }: CharacterFormFieldsProps) => {
  return (
    <>
      {characterTextFields.map(({ name, label, type }) => {
        return (
          <FormField
            key={name}
            control={form.control}
            name={name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{label}</FormLabel>
                <FormControl>
                  {type === "select" ? (
                    <Select
                      value={field.value}
                      onValueChange={(value) => field.onChange(value)}
                    >
                      <SelectTrigger className="rounded-none w-full">
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        {roleOptions.map(({ value, label }) => (
                          <SelectItem key={value} value={value}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input {...field} className="input-field" />
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );
      })}
    </>
  );
};

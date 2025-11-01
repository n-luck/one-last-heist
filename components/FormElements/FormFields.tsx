"use client"

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

import {
  characterTextFields,
  roleOptions,
} from "../Character/constants";
import { useCampaigns } from "@/lib/hooks/useCampaigns";

interface CharacterFormFieldsProps {
  form: UseFormReturn;
}

export const FormFields = ({ form }: CharacterFormFieldsProps) => {
  const campaigns = useCampaigns()

  return (
    <>
      {characterTextFields.map(({ name, label, type }) => {
        const options = name === "campaign" ? campaigns : roleOptions

        return (
          <FormField
            key={name}
            control={form.control}
            name={name}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={label}>{label}</FormLabel>
                <FormControl>
                  {type === "select" ? (
                    <Select
                      value={field.value}
                      onValueChange={(value) => field.onChange(value)}
                    >
                      <SelectTrigger className="rounded-none w-full" id={label}>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        {options.map(({ value, label }) => (
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

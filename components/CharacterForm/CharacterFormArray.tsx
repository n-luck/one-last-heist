import { Control, FieldValues, useFieldArray, UseFormRegister } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface CharacterFormArrayProps {
  name: string;
  label: string;
  control: Control;
  register: UseFormRegister<FieldValues[string]>
}

export const CharacterFormArray = ({
  name,
  label,
  control,
  register,
}: CharacterFormArrayProps) => {
  const { fields, append, remove } = useFieldArray({ control, name });

  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="flex flex-col gap-2">
              {fields.map((field, index) => (
                <div key={field.id} className="flex gap-2 items-center">
                  <Input {...register(`${name}.${index}`)} />
                  <Button type="button" size="sm" onClick={() => remove(index)}>
                    Remove
                  </Button>
                </div>
              ))}
              <Button type="button" size="sm" onClick={() => append("")}>
                Add {label.slice(0, -1)}
              </Button>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

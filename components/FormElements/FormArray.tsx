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

interface FormArrayProps {
  name: string;
  label: string;
  control: Control;
  register: UseFormRegister<FieldValues[string]>
}

export const FormArray = ({
  name,
  label,
  control,
  register,
}: FormArrayProps) => {
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
                  <Button type="button" size="sm" onClick={() => remove(index)} variant="ghost">
                    Remove
                  </Button>
                </div>
              ))}
              <Button type="button" size="sm" onClick={() => append("")}>
                Add {label}
              </Button>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

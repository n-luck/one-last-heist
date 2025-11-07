import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "../ui/form";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { X as CloseIcon } from "lucide-react";

interface CampaignPlayerSelectProps {
  form: UseFormReturn;
  players: { label: string; value: string }[];
}

export const CampaignPlayerSelect = ({
  form,
  players,
}: CampaignPlayerSelectProps) => {
  return (
    <FormField
      control={form.control}
      name="players"
      render={({ field }) => {
        const remainingPlayers = players.filter(
          (user) => !field.value.includes(user.value)
        );

        return (
          <FormItem>
            <FormLabel>Players</FormLabel>
            <FormControl>
              <div className="flex flex-col gap-2">
                {/* Dropdown to add new players */}
                {remainingPlayers.length > 0 && (
                  <Select
                    value=""
                    onValueChange={(value) =>
                      field.onChange([...field.value, value])
                    }
                  >
                    <SelectTrigger className="rounded-none w-full cursor-pointer">
                      <SelectValue placeholder="Add a player" />
                    </SelectTrigger>
                    <SelectContent>
                      {remainingPlayers.map(({ value, label }) => (
                        <SelectItem key={value} value={value} className="cursor-pointer">
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}

                {/* Selected players */}
                <div className="flex flex-wrap gap-2">
                  {field.value.map((player: string) => (
                    <Button
                      key={player}
                      type="button"
                      onClick={() =>
                        field.onChange(
                          field.value.filter((p: string) => p !== player)
                        )
                      }
                    >
                      {player}
                      <CloseIcon />
                    </Button>
                  ))}
                </div>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

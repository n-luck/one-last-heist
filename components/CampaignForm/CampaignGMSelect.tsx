import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface CampaignGMSelectProps {
  form: UseFormReturn;
  players: { label: string; value: string }[];
  gameMaster?: string
}

export const CampaignGMSelect = ({ form, players, gameMaster }: CampaignGMSelectProps) => {
  return (
    <FormField
      control={form.control}
      name="gameMaster"
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel htmlFor="gameMaster">Game Master*</FormLabel>
            <FormControl>
              <div className="flex flex-col gap-2">
                <Select
                  value={field.value || gameMaster || ""}
                  onValueChange={(value) => field.onChange(value)}
                >
                  <SelectTrigger
                    className="rounded-none w-full cursor-pointer"
                    id="gameMaster"
                    data-testid="gameMaster"
                  >
                    <SelectValue placeholder="Add a game master" />
                  </SelectTrigger>
                  <SelectContent>
                    {players.map((player) => {
                      return (
                        <SelectItem
                          key={player.value}
                          value={player.value}
                          className="cursor-pointer"
                        >
                          {player.label}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

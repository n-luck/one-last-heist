/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import { toast } from "sonner";

import { UploadButton } from "@/lib/uploadthing";
import { Card, CardContent } from "../ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "../ui/form";

interface CharacterFormImageProps {
  control: any;
  form: any;
}

export const CharacterFormImage = ({
  control,
  form,
}: CharacterFormImageProps) => {
  const image = form.watch("image");

  return (
    <FormField
      control={control}
      name="image"
      render={() => (
        <FormItem>
          <FormLabel>Image</FormLabel>
          <Card className="rounded-none">
            <CardContent className="space-y-2">
              {image && image !== "/images/characters/placeholder.jpeg" && (
                <Image
                  src={image}
                  alt="Character image"
                  width={100}
                  height={100}
                  className="w-20 h-20 object-cover"
                />
              )}
              <FormControl>
                <UploadButton
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    const url = res?.[0]?.url;
                    if (url) form.setValue("image", url);
                    else toast.error("Upload failed: no file URL returned.");
                  }}
                />
              </FormControl>
            </CardContent>
          </Card>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

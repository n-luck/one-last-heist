// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// to do: update once zod bug is resolved

"use client";

import { useRouter } from "next/navigation";
import { ControllerRenderProps, useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import slugify from "slugify";
import Link from "next/link";

import { zodResolver } from "@hookform/resolvers/zod";
import { insertCampaignSchema } from "@/lib/validators";
import { createCampaign } from "@/lib/actions/campaigns.actions";
import { campaignDefaultValues } from "@/lib/constants";
import { Campaign } from "@/types";

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

import { FormImage } from "../FormElements/FormImage";
import { CampaignPlayerSelect } from "./CampaignPlayerSelect";

interface CharacterFormProps {
  campaign?: Campaign;
//   campaignId?: string;
  type: "create" | "update";
  players: [];
}

export const CampaignForm = ({
  campaign,
//   campaignId = "",
  type = "create",
  players,
}: CharacterFormProps) => {
  const router = useRouter();
  const isUpdate = type === "update";
  const formTypeCopy = type.charAt(0).toUpperCase() + type.slice(1);

  //   const schema = isUpdate ? updateCharacterSchema : insertCampaignSchema;
  const schema = insertCampaignSchema;
  const defaultValues = isUpdate ? campaign : { ...campaignDefaultValues };

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const onSubmit: SubmitHandler<z.infer<typeof schema>> = async (values) => {
    //     const action = isUpdate
    //       ? updateCharacter({ ...values, id: campaignId })
    //       : createCampaign(values);
    const action = createCampaign(values);

    const res = await action;
    if (!res.success) return toast.error(res.message);

    toast.success(res.message);
    router.push("/campaigns");
  };

  return (
    <>
      <h1 className="h1-bold">{formTypeCopy} Campaign</h1>
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
                  z.infer<typeof insertCampaignSchema>,
                  "name"
                >;
              }) => (
                <FormItem className="w-full">
                  <FormLabel>Campaign name*</FormLabel>
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
                  z.infer<typeof insertCampaignSchema>,
                  "slug"
                >;
              }) => (
                <FormItem className="w-full">
                  <FormLabel>Campaign slug (URL)*</FormLabel>
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

            <CampaignPlayerSelect form={form} players={players} />

            <div className="md:col-span-2 upload-field">
              <FormImage control={form.control} form={form} />
            </div>

            <hr className="md:col-span-2" />

            <FormField
              control={form.control}
              name="notes"
              render={({
                field,
              }: {
                field: ControllerRenderProps<
                  z.infer<typeof insertCampaignSchema>,
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
            className="button w-full md:mx-auto md:w-md mt-4"
            disabled={form.formState.isSubmitting}
            variant="gradient"
          >
            {form.formState.isSubmitting
              ? "Submitting..."
              : `${formTypeCopy} Campaign`}
          </Button>
          <Button
            size="lg"
            className="button w-full md:mx-auto md:w-md"
            disabled={form.formState.isSubmitting}
            variant="ghost"
            asChild
          >
            <Link href="/user">Cancel</Link>
          </Button>
        </form>
      </Form>
    </>
  );
};

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import FormFieldInput from "@/components/custom/formFieldInput";
import { ImageUpload } from "@/components/custom/imageUpload";

// Enum definitions matching the DTO
enum DogSize {
  BIG = "BIG",
  MEDIUM = "MEDIUM",
  SMALL = "SMALL",
}

enum DogFell {
  SHORT = "SHORT",
  LONG = "LONG",
}

// Form schema using Zod instead of Joi (better integration with React Hook Form)
const dogFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  age: z.coerce.number().min(0, "Age must be a positive number"),
  size: z.nativeEnum(DogSize, {
    required_error: "Please select a size",
  }),
  breed: z.string().min(1, "Breed is required"),
  fellColor: z.string().min(1, "Fell color is required"),
  fell: z.nativeEnum(DogFell, {
    required_error: "Please select a fell type",
  }),
  temperament: z.string().min(1, "Temperament is required"),
  situation: z.string().min(1, "Situation is required"),
  history: z.string().min(1, "History is required"),
  imageProfile: z.string().min(1, "Profile image is required"),
  images: z
    .array(z.string())
    .min(1, "At least one additional image is required"),
  available: z.boolean().default(true),
});

type DogFormValues = z.infer<typeof dogFormSchema>;

export function DogRegistrationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Set to true to use the real file uploader, false to use the URL-based mock
  const [useFileUploader, setUseFileUploader] = useState(true);

  // Initialize the form with default values
  const form = useForm<DogFormValues>({
    resolver: zodResolver(dogFormSchema),
    defaultValues: {
      name: "",
      age: 0,
      breed: "",
      fellColor: "",
      temperament: "",
      situation: "",
      history: "",
      imageProfile: "",
      images: [],
      available: true,
    },
  });

  // Form submission handler
  async function onSubmit(data: DogFormValues) {
    setIsSubmitting(true);

    try {
      // Here you would typically send the data to your API
      console.log("Form submitted:", data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast({
        title: "Dog registered successfully!",
        description: `${data.name} has been added to the system.`,
      });

      // Reset form after successful submission
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description:
          "There was a problem registering the dog. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Information */}
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Basic Information</h2>

              <FormFieldInput control={form.control} name="name" label="Name" />

              <FormFieldInput
                control={form.control}
                name="age"
                label="Age"
                inputType="number"
                className="mt-4"
              />

              <FormFieldInput
                control={form.control}
                name="breed"
                label="Breed"
                className="mt-4"
              />

              <FormField
                control={form.control}
                name="size"
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <FormLabel>Size</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={DogSize.SMALL}>Small</SelectItem>
                        <SelectItem value={DogSize.MEDIUM}>Medium</SelectItem>
                        <SelectItem value={DogSize.BIG}>Big</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Appearance */}
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Appearance</h2>

              <FormFieldInput
                control={form.control}
                name="fellColor"
                label="Fell Color"
              />

              <FormField
                control={form.control}
                name="fell"
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <FormLabel>Fell Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select fell type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={DogFell.SHORT}>Short</SelectItem>
                        <SelectItem value={DogFell.LONG}>Long</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormFieldInput
                control={form.control}
                name="temperament"
                label="Temperament"
                className="mt-4"
              />
            </CardContent>
          </Card>
        </div>

        {/* Background Information */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">
              Background Information
            </h2>

            <FormFieldInput
              control={form.control}
              name="situation"
              label="Current Situation"
            />

            <FormField
              control={form.control}
              name="history"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel>History</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Dog's history"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Images */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Images</h2>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setUseFileUploader(!useFileUploader)}
              >
                Switch to {useFileUploader ? "URL" : "File"} Upload
              </Button>
            </div>

            <FormField
              control={form.control}
              name="imageProfile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profile Image</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={field.value ? [field.value] : []}
                      onChange={(urls: string[]) =>
                        field.onChange(urls[0] || "")
                      }
                      onRemove={() => field.onChange("")}
                      maxFiles={1}
                    />
                  </FormControl>
                  <FormDescription>
                    {useFileUploader
                      ? "Upload the main profile image of the dog"
                      : "Enter the URL for the main profile image of the dog"}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem className="mt-6">
                  <FormLabel>Additional Images</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={field.value}
                      onChange={field.onChange}
                      onRemove={(url: string) =>
                        field.onChange(
                          field.value.filter((current) => current !== url),
                        )
                      }
                      maxFiles={10}
                    />
                  </FormControl>
                  <FormDescription>
                    {useFileUploader
                      ? "Upload additional images of the dog (up to 10)"
                      : "Enter URLs for additional images of the dog (up to 10)"}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Availability */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Availability</h2>

            <FormField
              control={form.control}
              name="available"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Available for adoption</FormLabel>
                    <FormDescription>
                      Check this if the dog is currently available for adoption
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Registering Dog...
            </>
          ) : (
            "Register Dog"
          )}
        </Button>
      </form>
    </Form>
  );
}

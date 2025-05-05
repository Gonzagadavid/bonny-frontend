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
import { toast } from "@/hooks/use-toast";
import FormFieldInput from "@/components/custom/formFieldInput";
import { ImageUpload } from "@/components/custom/imageUpload";
import { ProfileImageUpload } from "@/components/custom/profileImageUpload";
import { createAnimal } from "../_lib/createAnimal";
import { DogFell, DogSize, GenderEnum } from "@/types/enums";
import { useRouter } from "next/navigation";
import { Routes } from "@/constants/routes";

const dogFormSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  age: z.coerce.number().min(0, "Idade deve ser um número positivo"),
  size: z.nativeEnum(DogSize, {
    required_error: "Por favor, selecione um tamanho",
  }),
  breed: z.string().min(1, "Raça é obrigatória"),
  fellColor: z.string().min(1, "Cor da pelagem é obrigatória"),
  gender: z.string().min(1, "O gênero do animal obrigatória"),
  fell: z.nativeEnum(DogFell, {
    required_error: "Por favor, selecione um tipo de pelagem",
  }),
  temperament: z.string().min(1, "Temperamento é obrigatório"),
  situation: z.string().min(1, "Situação é obrigatória"),
  history: z.string().min(1, "Histórico é obrigatório"),
  imageProfile: z.string().optional(),
  images: z.array(z.string()).optional(),
  available: z.boolean().default(true),
});

type DogFormValues = z.infer<typeof dogFormSchema>;

export function DogRegistrationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [useFileUploader, setUseFileUploader] = useState(true);

  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [additionalImageFiles, setAdditionalImageFiles] = useState<File[]>([]);

  const router = useRouter();

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

  const uploadFile = async (file: File, prefix: string): Promise<string> => {
    const timestamp = Date.now();
    const safeFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, "-");
    const filename = `${prefix}/${timestamp}-${safeFileName}`;

    const response = await fetch(`/api/upload?filename=${filename}`, {
      method: "POST",
      body: file,
      headers: {
        "content-type": file.type,
      },
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }

    const blob = await response.json();
    return blob.url;
  };

  async function onSubmit(data: DogFormValues) {
    setIsSubmitting(true);

    try {
      let profileImageUrl = data.imageProfile || "";
      if (profileImageFile) {
        profileImageUrl = await uploadFile(profileImageFile, "dogs/profile");
      }

      let additionalImageUrls = data.images || [];
      if (additionalImageFiles.length > 0) {
        const uploadPromises = additionalImageFiles.map((file) =>
          uploadFile(file, "dogs/additional"),
        );
        const newUrls = await Promise.all(uploadPromises);
        additionalImageUrls = [...additionalImageUrls, ...newUrls];
      }

      const finalData = {
        ...data,
        imageProfile: profileImageUrl,
        images: additionalImageUrls,
      };

      await createAnimal(finalData);

      toast({
        title: "Animal cadastrado com sucesso!",
        description: `${data.name} foi adicionado ao sistema.`,
      });

      form.reset();
      setProfileImageFile(null);
      setAdditionalImageFiles([]);
      router.push(Routes.ADMIN_ANIMALS);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Erro",
        description:
          "Houve um problema ao cadastrar o Animal. Por favor, tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Informações Básicas</h3>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <FormFieldInput control={form.control} name="name" label="Nome" />
            <FormFieldInput
              control={form.control}
              name="age"
              label="Idade"
              inputType="number"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <FormFieldInput control={form.control} name="breed" label="Raça" />
            <FormField
              control={form.control}
              name="size"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block mb-5">Tamanho</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tamanho" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={DogSize.SMALL}>Pequeno</SelectItem>
                      <SelectItem value={DogSize.MEDIUM}>Médio</SelectItem>
                      <SelectItem value={DogSize.BIG}>Grande</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block mb-5">Gênero</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o gênero" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={GenderEnum.MALE}>Macho</SelectItem>
                      <SelectItem value={GenderEnum.FEMALE}>Fêmea</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Aparência</h3>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <FormFieldInput
              control={form.control}
              name="fellColor"
              label="Cor da Pelagem"
            />
            <FormField
              control={form.control}
              name="fell"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block mb-5 ">Tipo de Pelagem</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo de pelagem" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={DogFell.SHORT}>Curta</SelectItem>
                      <SelectItem value={DogFell.LONG}>Longa</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormFieldInput
            control={form.control}
            name="temperament"
            label="Temperamento"
          />
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">
            Informações de Histórico
          </h3>
          <div className="mb-4">
            <FormFieldInput
              control={form.control}
              name="situation"
              label="Situação Atual"
            />
          </div>

          <FormField
            control={form.control}
            name="history"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block mb-2">Histórico</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Histórico do Animal"
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">Imagens</h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setUseFileUploader(!useFileUploader)}
            >
              Mudar para Upload de {useFileUploader ? "URL" : "Arquivo"}
            </Button>
          </div>

          <div className="mb-6">
            <FormField
              control={form.control}
              name="imageProfile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block mb-2">Imagem de Perfil</FormLabel>
                  <FormControl>
                    <ProfileImageUpload
                      value={field.value || ""}
                      onChange={field.onChange}
                      onFileChange={setProfileImageFile}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block mb-2">Imagens Adicionais</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value || []}
                    onRemove={(url) =>
                      field.onChange(
                        (field.value || []).filter(
                          (current) => current !== url,
                        ),
                      )
                    }
                    onFilesChange={setAdditionalImageFiles}
                    maxFiles={10}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Disponibilidade</h3>
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
                  <FormLabel>Disponível para adoção</FormLabel>
                  <FormDescription>
                    Marque esta opção se o Animal está atualmente disponível
                    para adoção
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-amber-600 hover:bg-amber-700 text-white"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Cadastrando Animal...
            </>
          ) : (
            "Cadastrar Animal"
          )}
        </Button>
      </form>
    </Form>
  );
}

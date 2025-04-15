"use client";

import FormFieldInput from "@/components/custom/FormFieldInput";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Routes } from "@/constants/routes";

const formSchema = z.object({
  name: z.string().min(3, { message: "Nome deve ter pelo menos 3 caracteres" }),
  email: z.string().email({ message: "E-mail inválido" }),
  age: z.coerce.number().min(18, { message: "Idade mínima é 18 anos" }),
  cellPhone: z.string().regex(/^\d{10,11}$/, { message: "Telefone inválido" }),
  about: z.string().min(10, { message: "Descreva um pouco sobre você" })
});

export default function UserRegister() {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      age: undefined,
      cellPhone: "",
      about: ""
    }
  });

  const onSubmit = async (data: typeof formSchema._type) => {
    try {
      console.log("Form Data:", data);
      toast.success("Perfil atualizado com sucesso");
      router.push(Routes.USER_REGISTER);
    } catch {
      toast.error("Erro ao atualizar perfil");
    }
  };

  return (
    <div className="pt-20 flex justify-center items-center w-full min-h-screen bg-gray-100">
      <Card className="lg:w-[50%] w-full mx-4  pt-5 bg-white shadow-lg rounded-lg">
        <CardContent>
          <CardTitle className="text-center text-2xl font-semibold mb-6">
            Atualizar Perfil
          </CardTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormFieldInput
                name="name"
                control={form.control}
                label="Nome Completo"
              />
              <FormFieldInput
                name="email"
                control={form.control}
                label="E-mail"
                inputType="email"
              />
              <FormFieldInput
                name="age"
                control={form.control}
                label="Idade"
                inputType="number"
              />
              <FormFieldInput
                name="cellPhone"
                control={form.control}
                label="Telefone"
                inputType="tel"
              />
              <FormFieldInput
                name="about"
                control={form.control}
                label="Sobre Você"
                inputType="textarea"
              />
              <div className="flex justify-end">
                <Button type="submit">Salvar</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}


"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CalendarIcon, Loader2 } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { createUser } from "../_lib/createUser";
import { useToast } from "@/hooks/use-toast";
import FormFieldInput from "@/components/custom/formFieldInput";
import { cpf } from "cpf-cnpj-validator";
import { applyDateMask, applyPhoneMask, parseMaskedDate } from "../_lib/masks";
import { UserRole } from "@/constants/permissions";

const formSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: "Nome deve ter pelo menos 2 caracteres" }),
    email: z.string().email({ message: "Por favor, insira um email válido" }),
    birthDate: z.date({
      required_error: "Por favor, selecione uma data de nascimento",
    }),
    cellPhone: z
      .string()
      .min(14, { message: "Número de telefone deve estar completo" })
      .regex(/^\(\d{2}\) \d{5}-\d{4}$/, {
        message: "Formato de telefone inválido. Use (XX) XXXXX-XXXX",
      }),
    password: z
      .string()
      .min(8, { message: "Senha deve ter pelo menos 8 caracteres" })
      .regex(/[A-Z]/, {
        message: "Senha deve conter pelo menos uma letra maiúscula",
      })
      .regex(/[a-z]/, {
        message: "Senha deve conter pelo menos uma letra minúscula",
      })
      .regex(/[0-9]/, { message: "Senha deve conter pelo menos um número" })
      .regex(/[^A-Za-z0-9]/, {
        message: "Senha deve conter pelo menos um caractere especial",
      }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirmação de senha é obrigatória" }),
    individualTaxpayerRegistry: z
      .string()
      .min(11, { message: "CPF deve ter pelo menos 11 caracteres" })
      .regex(/^\d+$/, { message: "CPF deve conter apenas dígitos" })
      .refine((value) => cpf.isValid(value), { message: "CPF inválido" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof formSchema>;

export default function RegisterForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dateInputValue, setDateInputValue] = useState("");
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      cellPhone: "",
      password: "",
      confirmPassword: "",
      individualTaxpayerRegistry: "",
    },
  });

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true);
    try {
      const formattedData = {
        ...data,
        birthDate: format(data.birthDate, "dd-MM-yy"),
        cellPhone: data.cellPhone.replace(/\D/g, ""),
        role: UserRole.USER,
      };

      const { confirmPassword, ...dataToSubmit } = formattedData;

      await createUser(dataToSubmit);
      toast({
        title: "Conta criada!",
        description: "Sua conta foi criada com sucesso.",
        variant: "success",
      });
      form.reset();
      setDateInputValue("");
    } catch (error) {
      toast({
        title: "Erro",
        description:
          "Ocorreu um erro ao criar sua conta. Por favor, tente novamente.",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <FormFieldInput
            control={form.control}
            name="name"
            label="Nome Completo"
            className="w-full"
          />

          <FormFieldInput
            control={form.control}
            name="email"
            label="Email"
            inputType="email"
            className="w-full"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <FormField
            control={form.control}
            name="birthDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block mb-2">Data de Nascimento</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={`w-full pl-3 text-left font-normal ${!field.value ? "text-muted-foreground" : ""}`}
                      >
                        {field.value ? (
                          format(field.value, "dd-MM-yyyy")
                        ) : (
                          <span>Selecione uma data</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <div className="p-3 border-b">
                      <Input
                        type="text"
                        placeholder="DD-MM-YYYY"
                        className="mb-2"
                        value={dateInputValue}
                        onChange={(e) => {
                          const maskedValue = applyDateMask(e.target.value);
                          setDateInputValue(maskedValue);

                          const date = parseMaskedDate(maskedValue);
                          if (date) {
                            field.onChange(date);
                          }
                        }}
                      />
                      <FormDescription className="text-xs text-gray-600">
                        Digite a data no formato DD-MM-YYYY ou use o calendário
                        abaixo
                      </FormDescription>
                    </div>
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={(date) => {
                        field.onChange(date);
                        if (date) {
                          setDateInputValue(format(date, "dd-MM-yyyy"));
                        }
                      }}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cellPhone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block mb-2">Telefone Celular</FormLabel>
                <FormControl>
                  <Input
                    placeholder="(XX) XXXXX-XXXX"
                    value={field.value}
                    onChange={(e) => {
                      const maskedValue = applyPhoneMask(e.target.value);
                      field.onChange(maskedValue);
                    }}
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <FormFieldInput
            control={form.control}
            name="password"
            label="Senha"
            inputType="password"
            className="w-full"
          />

          <FormFieldInput
            control={form.control}
            name="confirmPassword"
            label="Confirmar Senha"
            inputType="password"
            className="w-full"
            onPaste={(event) => {
              event.preventDefault();
            }}
          />
        </div>

        <div className="mb-4">
          <FormFieldInput
            control={form.control}
            name="individualTaxpayerRegistry"
            label="CPF"
            className="w-full"
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
              Criando conta...
            </>
          ) : (
            "Criar Conta"
          )}
        </Button>
      </form>
    </Form>
  );
}

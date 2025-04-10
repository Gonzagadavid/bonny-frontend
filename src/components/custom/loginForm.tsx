"use client";

import { Button } from "@/components/ui/button";
import { authenticate } from "@/lib/actions";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import FormInput from "./formFieldInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useActionState } from "react";
import { Routes } from "@/constants/routes";
import Link from "next/link";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export default function LoginForm() {
  const [errorMessage, formAction, isPeding] = useActionState(
    authenticate,
    undefined,
  );

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <>
      <Form {...form}>
        <form action={formAction} className="space-y-3 sm:w-96 w-full">
          <div className="flex items-center justify-center p-3">
            <Link href={Routes.HOME}>
              <Image
                src="/logotipo.webp"
                alt="Logo Bonny"
                width={80}
                height={80}
                className="hover:opacity-90 transition-opacity"
              />
            </Link>
          </div>
          <div className="flex-1 rounded-lg  px-6 pb-4 pt-8 sm:w-96 w-full ">
            <div className="w-full">
              <div>
                <FormInput control={form.control} name="email" label="E-mail" />
              </div>
              <div className="mt-4">
                <FormInput
                  control={form.control}
                  name="password"
                  label="Senha"
                  inputType="password"
                />
              </div>
            </div>
            <LoginButton isPeding={isPeding} />
            <div
              className="flex h-8 items-end space-x-1"
              aria-live="polite"
              aria-atomic="true"
            >
              {errorMessage && (
                <>
                  <p className="text-sm text-red-500">{errorMessage}</p>
                </>
              )}
            </div>
          </div>
        </form>
      </Form>
    </>
  );
}

function LoginButton({ isPeding }: { isPeding: boolean }) {
  return (
    <Button className="mt-4 w-full" type="submit" aria-disabled={isPeding}>
      Entrar
    </Button>
  );
}

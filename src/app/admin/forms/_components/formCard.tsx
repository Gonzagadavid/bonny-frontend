"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Form } from "../_lib/listForms";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/utils/formatDate";
import { Button } from "@/components/ui/button";
import { activeFormRequest } from "../_lib/activeFormRequest";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Routes } from "@/constants/routes";

export function FormCard({ form }: { form: Form }) {
  const router = useRouter();
  const activeForm = (id: string) => async () => {
    try {
      await activeFormRequest(id);
      toast({
        title: "Formulário ativado com sucesso!",
      });

      router.refresh();
    } catch {
      toast({
        title: "Erro",
        description:
          "Houve um problema ao ativar o formulário. Por favor, tente novamente.",
        variant: "destructive",
      });
    }
  };

  console.log(form);

  return (
    <Card key={form._id}>
      <div className="flex justify-end">
        <Badge className="m-1" variant="outline">
          {form.active ? "Ativo" : "Desativado"}
        </Badge>
      </div>
      <CardContent>
        <p>
          <span>Titulo: </span>
          {form.title}
        </p>
        <p>
          <span>Criado em: </span>
          {formatDate(form.createdAt)}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button className="mr-2">
          <Link href={`${Routes.ADMIN_FORM_DETAILS}/${form._id}`}>
            Ver Detalhes
          </Link>
        </Button>
        <Button onClick={activeForm(form._id)}>Ativar</Button>
      </CardFooter>
    </Card>
  );
}

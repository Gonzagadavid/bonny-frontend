import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { listForm } from "./_lib/listForms";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Routes } from "@/constants/routes";
import { FormCard } from "./_components/formCard";

export default async function FormPage() {
  const forms = await listForm();

  const activatedForm = forms.find((form) => form.active);

  return (
    <div className="container mx-auto py-12 px-4">
      <section className="mb-16 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-8 text-center">Usuários</h2>
        <div>
          <Card>
            <CardHeader>
              <h2 className="text-center text-lg font-bold">
                Formulário ativo
              </h2>
            </CardHeader>
            <CardContent>
              <p className="text-center">
                {activatedForm?.title || "Não há formulário ativo no momento"}
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="p-6 bg-white flex wrap justify-around">
          {forms.map((form) => (
            <FormCard key={form._id} form={form} />
          ))}
        </div>
      </section>
      <div className="fixed bottom-10 right-10">
        <Button size="lg">
          <Link href={`${Routes.ADMIN_FORMS}/new`}>
            Criar um novo Formulário
          </Link>
        </Button>
      </div>
    </div>
  );
}

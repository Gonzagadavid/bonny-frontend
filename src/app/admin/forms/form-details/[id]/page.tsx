import { Card } from "@/components/ui/card";
import { getFormById } from "../../_lib/getFormById";
import { Badge } from "@/components/ui/badge";
import { answerTypeLabel } from "@/constants/labels";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Routes } from "@/constants/routes";

export default async function UserDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const form = await getFormById(id);

  return (
    <div className="container mx-auto py-12 px-4 relative">
      <section className="mb-16 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-8 text-center">{form.title}</h2>
        <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
          {form.questions.map((question) => {
            return (
              <Card className="p-6 my-2" key={question.id}>
                <div className="flex w-full justify-end">
                  <Badge className="font-bold italic">
                    {answerTypeLabel[question.answerType]}
                  </Badge>
                </div>
                <h2 className="p-3 text-lg font-bold">{question.question}</h2>
                {!!question.alternatives.length && (
                  <ul className="list-disc">
                    {question.alternatives.map((alternative) => (
                      <li className="py-2" key={alternative.id}>
                        {alternative.alternativeText}
                      </li>
                    ))}
                  </ul>
                )}
              </Card>
            );
          })}
        </div>
        <div className="fixed bottom-10 md:right-10 right-0 flex justify-center">
          <Button>
            <Link href={`${Routes.ADMIN_FORMS}/new?base=${id}`}>
              Usar este formulário como base para criar uma nova versão
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "../../forms/_lib/listForms";
import { FormAnswer } from "../_lib/getFormAnswerByUser";
import { Badge } from "@/components/ui/badge";
import { answerTypeLabel } from "@/constants/labels";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Alternative } from "../../forms/_lib/createForm";

const AnswerAlternative = ({
  alternatives,
  answer,
}: {
  answer: string;
  alternatives: Alternative[];
}) => {
  const answerSelected = alternatives.find(
    (alternative) => alternative.id === answer,
  );
  return <p className="italic px-3">{answerSelected?.alternativeText}</p>;
};
const AnswerMultiple = ({
  alternatives,
  answer,
}: {
  answer: string[];
  alternatives: Alternative[];
}) => {
  const answersSelected = alternatives.filter((alternative) =>
    answer.includes(alternative.id),
  );
  return (
    <ul>
      {answersSelected.map((answerSelected) => (
        <li className="italic px-3" key={answerSelected.id}>
          {answerSelected.alternativeText}
        </li>
      ))}
    </ul>
  );
};
const AnswerText = ({
  answer,
}: {
  answer: string;
  alternatives: Alternative[];
}) => {
  return <p className="italic px-3">{answer}</p>;
};

const AnswerTypeComponent = {
  ALTERNATIVE: AnswerAlternative,
  MULTIPLE: AnswerMultiple,
  TEXT: AnswerText,
};

export function FormAnswerByUser({
  form,
  formAnswers,
}: {
  formAnswers: FormAnswer | null;
  form: Form | null;
}) {
  const answers = formAnswers?.answers && JSON.parse(formAnswers.answers);

  if (!formAnswers) {
    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Formulário</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground py-8">
            Nenhum formulário respondido encontrado.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">{form?.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className=" pr-4">
          <section className="mb-16 max-w-5xl mx-auto">
            {form?.questions.map((question) => {
              const answer = answers[question.id];
              const AnswerComponent = AnswerTypeComponent[question.answerType];
              return (
                <Card className="p-6 my-2" key={question.id}>
                  <div className="flex w-full justify-end">
                    <Badge className="font-bold italic">
                      {answerTypeLabel[question.answerType]}
                    </Badge>
                  </div>
                  <h2 className="p-3 text-lg font-bold">{question.question}</h2>
                  <AnswerComponent
                    answer={answer}
                    alternatives={question.alternatives}
                  />
                </Card>
              );
            })}
          </section>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

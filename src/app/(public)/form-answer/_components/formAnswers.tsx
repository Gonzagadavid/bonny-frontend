"use client";

import { Form } from "@/app/admin/forms/_lib/listForms";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { createFormAnswer } from "../_lib/createFormAnswers";
import { toast } from "@/hooks/use-toast";
import { Routes } from "@/constants/routes";
import { useRouter } from "next/navigation";
import { AlternativeOptions } from "./alternativeOptions";
import MultipleOptions from "./multipleOptions";
import TextQuestion from "./textQuestion";

const AnswerTypeComponent = {
  ALTERNATIVE: AlternativeOptions,
  MULTIPLE: MultipleOptions,
  TEXT: TextQuestion,
};

export function FormAnswers({ form }: { form: Form }) {
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const router = useRouter();

  const onChangeAnswer = (questionId: string, answerId: string | string[]) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answerId }));
  };

  const isCompleted = Object.keys(answers).length === form.questions.length;

  const sendFormAnswers = async () => {
    try {
      const formAnswers = {
        formVersionId: form._id,
        title: form.title,
        answers,
      };

      await createFormAnswer(formAnswers);
      toast({
        title: "Formulário enviado com sucesso!",
      });
      router.push(Routes.ADOPTION);
    } catch (err) {
      console.log(err);
      toast({
        title: "Erro",
        description:
          "Houve um problema ao enviar o formulário. Por favor, tente novamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-4">{form.title}</h1>
      <div className="w-[95%]">
        {form.questions.map((question) => {
          const Component = AnswerTypeComponent[question.answerType];
          return (
            <Component
              key={question.id}
              question={question}
              onChangeAnswer={onChangeAnswer}
            />
          );
        })}
      </div>
      {
        <div className="fixed bottom-10 right-10">
          {isCompleted && (
            <Button onClick={sendFormAnswers} size="lg">
              Enviar Formulário
            </Button>
          )}
        </div>
      }
    </div>
  );
}

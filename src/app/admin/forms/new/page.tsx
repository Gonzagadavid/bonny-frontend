"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Check, X } from "lucide-react";
import { ChangeEventHandler, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { createForm } from "../_lib/createForm";
import { toast } from "@/hooks/use-toast";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import { BackendRoutes } from "@/constants/backend-routes";
import { fetcher } from "@/lib/fetcher";

enum AnswerType {
  ALTERNATIVE = "ALTERNATIVE",
  MULTIPLE = "MULTIPLE",
  TEXT = "TEXT",
}

const answerTypeLabel = {
  [AnswerType.ALTERNATIVE]: "Altenativa",
  [AnswerType.MULTIPLE]: "Multipla Escolha",
  [AnswerType.TEXT]: "Dissertativa",
};

export default function CreateForms() {
  const searchParams = useSearchParams();
  const base = searchParams.get("base");

  const [form, setForm] = useState<
    {
      id: string;
      question: string;
      answerType: AnswerType;
      alternatives: {
        id: string;
        alternativeText: string;
      }[];
    }[]
  >([]);
  const [question, setQuestion] = useState("");
  const [alternativeText, setAlternativeText] = useState("");
  const [title, setTitle] = useState("");
  const [alternatives, setAlternatives] = useState<
    {
      id: string;
      alternativeText: string;
    }[]
  >([]);
  const [answerType, setAnswerType] = useState<AnswerType>(
    AnswerType.ALTERNATIVE,
  );

  useSWR(base ? `${BackendRoutes.FORMS}/${base}` : null, fetcher, {
    onSuccess(data) {
      setForm(data.questions);
    },
    revalidateOnFocus: false,
    revalidateOnMount: false,
    revalidateOnReconnect: false,
    refreshWhenOffline: false,
    refreshWhenHidden: false,
    refreshInterval: 0,
  });

  const onChangeTitle: ChangeEventHandler<HTMLInputElement> = ({
    target: { value },
  }) => {
    setTitle(value);
  };

  const onChangeAnswerType = (answerTypeSelected: AnswerType) => {
    setAnswerType(answerTypeSelected);
  };

  const onChangeQuestion: ChangeEventHandler<HTMLTextAreaElement> = ({
    target: { value },
  }) => {
    setQuestion(value);
  };
  const onChangeAlternativeText: ChangeEventHandler<HTMLTextAreaElement> = ({
    target: { value },
  }) => {
    setAlternativeText(value);
  };

  const addAlternative = () => {
    const id = uuidv4();
    setAlternatives((prev) => [...prev, { id, alternativeText }]);
    setAlternativeText("");
  };

  const removeAlternative = (id: string) => () => {
    setAlternatives((prev) => prev.filter((item) => item.id !== id));
  };

  const addQuestionInForm = () => {
    const id = uuidv4();

    const questionObject = {
      id,
      question,
      answerType,
      alternatives,
    };
    setForm((prev) => [...prev, questionObject]);
    setQuestion("");
    setAlternatives([]);
    setAlternativeText("");
  };

  const removeQuestionForm = (id: string) => () => {
    setForm((prev) => prev.filter((item) => item.id !== id));
  };

  const createFormVersion = async () => {
    if (!title) {
      toast({ title: "Adicione um titulo para o formulário" });
      return;
    }
    try {
      await createForm({
        title,
        questions: form,
      });

      toast({
        title: "Formulário cadastrado com sucesso!",
        description: `${title} foi adicionado ao sistema.`,
      });

      setQuestion("");
      setAlternatives([]);
      setAlternativeText("");
      setTitle("");
      setForm([]);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Erro",
        description:
          "Houve um problema ao cadastrar o formulário. Por favor, tente novamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto py-2 px-4">
      <section className="mb-16 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-2 text-center">Novo Formulário</h2>
        <div className="p-3">
          <Label>
            Titulo:
            <Input value={title} onChange={onChangeTitle} />
          </Label>
        </div>

        <div>
          <Card className="bg-secondary p-5">
            <CardContent>
              <div className="p-3">
                <Label>
                  Pergunta:
                  <Textarea value={question} onChange={onChangeQuestion} />
                </Label>
              </div>
              <div className="p-3">
                <Label>Tipo:</Label>
                <RadioGroup
                  onValueChange={onChangeAnswerType}
                  className="flex items-center space-x-2"
                  value={answerType}
                >
                  <div>
                    <RadioGroupItem id="r1" value={AnswerType.ALTERNATIVE} />
                    <Label className="p-2" htmlFor="r1">
                      Alternativa
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem id="r2" value={AnswerType.MULTIPLE} />
                    <Label className="p-2" htmlFor="r2">
                      Multipla escolha
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem id="r3" value={AnswerType.TEXT} />
                    <Label className="p-2" htmlFor="r3">
                      Dissertativa
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              {(answerType === AnswerType.ALTERNATIVE ||
                answerType === AnswerType.MULTIPLE) && (
                <div className="p-3">
                  <div>
                    <Label>
                      Resposta
                      <Textarea
                        value={alternativeText}
                        onChange={onChangeAlternativeText}
                      />
                    </Label>
                    <div className="w-full flex justify-end py-3">
                      <Button onClick={addAlternative}>
                        <Check />
                      </Button>
                    </div>
                    <ul>
                      {alternatives.map((alternative) => (
                        <li className="p-1" key={alternative.id}>
                          <div className="flex justify-between">
                            <p>{alternative.alternativeText}</p>
                            <Button onClick={removeAlternative(alternative.id)}>
                              <X />
                            </Button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <div className="flex justify-end w-full">
                <Button onClick={addQuestionInForm}>
                  Adicionar Pergunta ao Formulário
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
        <div>
          {form.map((question) => (
            <Card className="p-6 my-2" key={question.id}>
              <div className="flex w-full justify-between">
                <p className="font-bold italic">
                  {answerTypeLabel[question.answerType]}
                </p>
                <Button onClick={removeQuestionForm(question.id)}>
                  <X />
                </Button>
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
          ))}
        </div>
      </section>
      <div className="fixed bottom-10 right-10">
        <Button onClick={createFormVersion} size="lg">
          Criar Formulário
        </Button>
      </div>
    </div>
  );
}

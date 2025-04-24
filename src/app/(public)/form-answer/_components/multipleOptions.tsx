import { Question } from "@/app/admin/forms/_lib/createForm";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function MultipleOptions({
  question,
  onChangeAnswer,
}: {
  question: Question;
  onChangeAnswer: (questionId: string, answerId: string | string[]) => void;
}) {
  const [checkedList, setChecked] = useState<string[]>([]);

  const onChange = (answerId: string, checked: boolean) => {
    if (checked) {
      setChecked((prev) => {
        const answers = [...prev, answerId];
        return answers;
      });
      onChangeAnswer(question.id, [...checkedList, answerId]);
    }
    if (!checked) {
      setChecked((prev) => {
        const answers = prev.filter((id) => id !== answerId);
        return answers;
      });
      onChangeAnswer(
        question.id,
        checkedList.filter((id) => id !== answerId),
      );
    }
  };
  return (
    <Card className="p-3 mb-2">
      <h2 className="text-lg font-bold p-2 text-start">{question.question}</h2>
      <div>
        {question.alternatives.map((alternative) => (
          <div className="flex items-center py-2" key={alternative.id}>
            <Checkbox
              onCheckedChange={(checked: boolean) =>
                onChange(alternative.id, checked)
              }
              id={alternative.id}
              value={alternative.id}
            />
            <Label className="ml-2 text-sm" htmlFor={alternative.id}>
              {alternative.alternativeText}
            </Label>
          </div>
        ))}
      </div>
    </Card>
  );
}

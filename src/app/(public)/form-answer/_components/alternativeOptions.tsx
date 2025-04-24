import { Question } from "@/app/admin/forms/_lib/createForm";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function AlternativeOptions({
  question,
  onChangeAnswer,
}: {
  question: Question;
  onChangeAnswer: (questionId: string, answerId: string | string[]) => void;
}) {
  const onChange = (answerId: string) => {
    onChangeAnswer(question.id, answerId);
  };
  return (
    <Card className="p-3 mb-2">
      <h2 className="text-lg font-bold p-2 text-start">{question.question}</h2>
      <RadioGroup
        onValueChange={onChange}
        className="flex flex-col items-start"
      >
        {question.alternatives.map((alternative) => (
          <div className="flex items-center py-2" key={alternative.id}>
            <RadioGroupItem id={alternative.id} value={alternative.id} />
            <Label className="ml-2 text-sm" htmlFor={alternative.id}>
              {alternative.alternativeText}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </Card>
  );
}

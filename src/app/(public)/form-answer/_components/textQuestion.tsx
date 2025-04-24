import { Question } from "@/app/admin/forms/_lib/createForm";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ChangeEventHandler } from "react";

export default function TextQuestion({
  question,
  onChangeAnswer,
}: {
  question: Question;
  onChangeAnswer: (questionId: string, answerId: string) => void;
}) {
  const onChange: ChangeEventHandler<HTMLTextAreaElement> = ({
    target: { value },
  }) => {
    onChangeAnswer(question.id, value);
  };

  return (
    <Card className="p-3 mb-2">
      <h2 className="text-lg font-bold p-2 text-start">{question.question}</h2>
      <div>
        <Textarea onChange={onChange} />
      </div>
    </Card>
  );
}

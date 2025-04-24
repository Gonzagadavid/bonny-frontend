import { FormAnswers } from "./_components/formAnswers";
import { getActiveForm } from "./_lib/getActiveForm";

export default async function FormAnswerPage() {
  const form = await getActiveForm();

  return (
    <div className="bg-white">
      <section className="py-16 text-center">
        <FormAnswers form={form} />
      </section>
    </div>
  );
}

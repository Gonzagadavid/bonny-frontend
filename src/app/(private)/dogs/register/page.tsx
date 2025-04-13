import { DogRegistrationForm } from "@/components/custom/dogRegistrationForm";

export default function RegisterDogPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Register a Dog</h1>
      <DogRegistrationForm />
    </div>
  );
}

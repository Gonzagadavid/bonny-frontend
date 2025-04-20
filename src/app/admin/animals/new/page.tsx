import { DogRegistrationForm } from "../_components/dogRegistrationForm";

export default function RegisterDogPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <section className="text-center mb-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Cadastrar um Animal
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Preencha os detalhes para registrar um novo animal em nosso sistema
        </p>
      </section>

      <section className="mb-16 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-8 text-center">
          Informações do Animal
        </h2>

        <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <DogRegistrationForm />
        </div>
      </section>
    </div>
  );
}

import type { Metadata } from "next";
import RegisterForm from "./_components/registerForm";

export const metadata: Metadata = {
  title: "Register | Create an Account",
  description: "Create a new user account",
};

export default function RegisterPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <section className="text-center mb-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Criar Conta</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Preencha seus dados para criar uma nova conta
        </p>
      </section>

      <section className="mb-16 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-8 text-center">
          Informações Pessoais
        </h2>

        <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <RegisterForm />
        </div>
      </section>
    </div>
  );
}

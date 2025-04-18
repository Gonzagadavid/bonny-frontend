import LoginForm from "@/components/custom/loginForm";
import { auth } from "../../api/auth/auth";
import { validateExp } from "@/utils/validateExp";
import { redirect } from "next/navigation";
import { Routes } from "@/constants/routes";
import Link from "next/link";
import ExpiresModal from "@/components/custom/expiresModal";

export default async function Login() {
  const session = await auth();
  if (session && validateExp(session.expires)) {
    redirect(Routes.HOME);
  }
  return (
    <div
      className="flex items-center justify-center w-full h-full flex-col"
      role="main"
      aria-labelledby="login-heading"
    >
      <ExpiresModal
        aria-hidden="true"
        aria-live="polite"
        aria-labelledby="expires-modal-title"
        aria-describedby="expires-modal-description"
      />

      <LoginForm aria-label="Formulário de Login" />

      <Link
        className="text-primary"
        href={Routes.USER_REGISTER}
        aria-label="Cadastrar-se"
        role="button"
        tabIndex={0}
      >
        Cadastrar-se
      </Link>
    </div>
  );
}

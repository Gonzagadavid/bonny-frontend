import { UserRole } from "./permissions";
import { ReactNode } from "react";

import {
  PawPrint,
  Heart,
  Users,
  LayoutTemplate,
  LetterText,
  Store,
  HandHelping,
  AtSign,
  MonitorCog,
} from "lucide-react";

export enum Routes {
  HOME = "/",
  ABOUT = "/about",
  DASHBOARD = "/dashboard",
  HELP = "/how-to-help",
  ADOPTION = "/adoption",
  DONATIONS = "/donations",
  SPONSORSHIP = "/sponsorship",
  SPONSORSHIP_FORM = "/sponsorship/form",
  USER_REGISTER = "/register",
  LOGIN = "/login",
  CONTACT = "/contact",
  FORM_ANSWERS = "/form-answer",
  ADMIN = "/admin",
  ADMIN_USERS = "/admin/users",
  ADMIN_USER_DETAILS = "/admin/users/user-details",
  ADMIN_ANIMALS = "/admin/animals",
  ADMIN_ANIMALS_REGISTER = "/admin/animals/new",
  ADMIN_FORMS = "/admin/forms",
  ADMIN_FORM_DETAILS = "/admin/forms/form-details",
  ADMIN_ADOPTION = "/admin/adoptions",
}

export const routesInfo: Record<
  Routes,
  { label: string; permissions: UserRole; icon?: ReactNode }
> = {
  [Routes.HOME]: {
    label: "Plataforma",
    permissions: UserRole.USER,
    icon: <LayoutTemplate />,
  },
  [Routes.DASHBOARD]: {
    label: "Candidaturas",
    permissions: UserRole.USER,
    icon: <PawPrint />,
  },
  [Routes.ABOUT]: {
    label: "Quem Somos",
    permissions: UserRole.USER,
    icon: <Store />,
  },
  [Routes.HELP]: {
    label: "Como Ajudar",
    permissions: UserRole.USER,
    icon: <HandHelping />,
  },
  [Routes.ADOPTION]: {
    label: "Adoção e Apadrinhamento",
    permissions: UserRole.USER,
    icon: <Heart />,
  },
  [Routes.DONATIONS]: {
    label: "Doações",
    permissions: UserRole.USER,
  },
  [Routes.USER_REGISTER]: {
    label: "Cadastro",
    permissions: UserRole.USER,
  },
  [Routes.LOGIN]: {
    label: "Entrar",
    permissions: UserRole.USER,
  },
  [Routes.CONTACT]: {
    label: "Contato",
    permissions: UserRole.USER,
    icon: <AtSign />,
  },
  [Routes.SPONSORSHIP]: {
    label: "Apadrinhamento",
    permissions: UserRole.USER,
  },
  [Routes.SPONSORSHIP_FORM]: {
    label: "Formulário de Apadrinhamento",
    permissions: UserRole.USER,
  },
  [Routes.ADMIN]: {
    label: "Painel Administrativo",
    permissions: UserRole.VOLUNTEER,
    icon: <MonitorCog />,
  },
  [Routes.ADMIN_USERS]: {
    label: "Usuários",
    permissions: UserRole.VOLUNTEER,
    icon: <Users />,
  },
  [Routes.ADMIN_USER_DETAILS]: {
    label: "",
    permissions: UserRole.VOLUNTEER,
  },
  [Routes.ADMIN_ANIMALS]: {
    label: "Animais",
    permissions: UserRole.VOLUNTEER,
    icon: <PawPrint />,
  },
  [Routes.ADMIN_ANIMALS_REGISTER]: {
    label: "",
    permissions: UserRole.VOLUNTEER,
  },
  [Routes.ADMIN_FORMS]: {
    label: "Formulários",
    permissions: UserRole.VOLUNTEER,
    icon: <LetterText />,
  },
  [Routes.ADMIN_FORM_DETAILS]: {
    label: "",
    permissions: UserRole.VOLUNTEER,
  },
  [Routes.FORM_ANSWERS]: {
    label: "",
    permissions: UserRole.USER,
  },
  [Routes.ADMIN_ADOPTION]: {
    label: "Adoções",
    permissions: UserRole.VOLUNTEER,
    icon: <Heart />,
  },
};

export const adminRole = [UserRole.ADMIN, UserRole.VOLUNTEER];

// { href: Routes.ADMIN_ANIMALS, label: "Animais", icon: PawPrint },
// { href: Routes.ADMIN_ADOPTION, label: "Adoções", icon: Heart },
// { href: Routes.ADMIN_USERS, label: "Usuários", icon: Users },
// { href: Routes.ADMIN_FORMS, label: "Formulários", icon: LetterText },
// { href: Routes.HOME, label: "Plataforma", icon: LayoutTemplate },

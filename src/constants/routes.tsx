import { UserRole } from "./permissions";

export enum Routes {
  HOME = "/",
  ABOUT = "/about",
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
}

export const routesInfo: Record<
  Routes,
  { label: string; permissions: UserRole }
> = {
  [Routes.HOME]: {
    label: "Início",
    permissions: UserRole.USER,
  },
  [Routes.ABOUT]: {
    label: "Quem Somos",
    permissions: UserRole.USER,
  },
  [Routes.HELP]: {
    label: "Como Ajudar",
    permissions: UserRole.USER,
  },
  [Routes.ADOPTION]: {
    label: "Adoção e Apadrinhamento",
    permissions: UserRole.USER,
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
  },
  [Routes.ADMIN_USERS]: {
    label: "",
    permissions: UserRole.VOLUNTEER,
  },
  [Routes.ADMIN_USER_DETAILS]: {
    label: "",
    permissions: UserRole.VOLUNTEER,
  },
  [Routes.ADMIN_ANIMALS]: {
    label: "",
    permissions: UserRole.VOLUNTEER,
  },
  [Routes.ADMIN_ANIMALS_REGISTER]: {
    label: "",
    permissions: UserRole.VOLUNTEER,
  },
  [Routes.ADMIN_FORMS]: {
    label: "",
    permissions: UserRole.VOLUNTEER,
  },
  [Routes.ADMIN_FORM_DETAILS]: {
    label: "",
    permissions: UserRole.VOLUNTEER,
  },
  [Routes.FORM_ANSWERS]: {
    label: "",
    permissions: UserRole.VOLUNTEER,
  },
};

export const adminRole = [UserRole.ADMIN, UserRole.VOLUNTEER];

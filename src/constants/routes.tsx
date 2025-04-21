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
  ADMIN = "/admin",
  ADMIN_USERS = "/admin/users",
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
    label: "Adoção",
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
    label: "",
    permissions: UserRole.VOLUNTEER,
  },
  [Routes.ADMIN_USERS]: {
    label: "",
    permissions: UserRole.VOLUNTEER,
  },
};

export const adminRole = [UserRole.ADMIN, UserRole.VOLUNTEER];

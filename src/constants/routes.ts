export enum Routes {
  HOME = "/",
  ABOUT = "/about",
  HELP = "/how-to-help",
  ADOPTION = "/adoption",
  DONATIONS = "/donations",
  SPONSORSHIP = "/sponsorship",
  SPONSORSHIP_FORM = "/sponsorship/form",
  USER_REGISTER = "/users/register",
  USER_REGISTER_PERSONAL_DATA = "/users/register/personal-data",
  USER_REGISTER_TERMS = "/users/register/terms",
  USER_REGISTER_FORMS = "/users/register/forms",
  LOGIN = "/entrar",
  CONTACT = "/contact"
}

export const routesInfo: Record<Routes, { label: string }> = {
  [Routes.HOME]: {
    label: "Início"
  },
  [Routes.ABOUT]: {
    label: "Quem Somos"
  },
  [Routes.HELP]: {
    label: "Como Ajudar"
  },
  [Routes.ADOPTION]: {
    label: "Adoção"
  },
  [Routes.DONATIONS]: {
    label: "Doações"
  },
  [Routes.USER_REGISTER_PERSONAL_DATA]: {
    label: "Dados Pessoais"
  },
  [Routes.USER_REGISTER_FORMS]: {
    label: "Formulários"
  },
  [Routes.USER_REGISTER_TERMS]: {
    label: "Termos"
  },
  [Routes.USER_REGISTER]: {
    label: "Cadastro"
  },
  [Routes.LOGIN]: {
    label: "Entrar"
  },
  [Routes.CONTACT]: {
   label: "Contato" 
  },
  [Routes.SPONSORSHIP]: { 
    label: "Apadrinhamento" 
  },
  [Routes.SPONSORSHIP_FORM]: {
    label: "Formulário de Apadrinhamento"
  }
};
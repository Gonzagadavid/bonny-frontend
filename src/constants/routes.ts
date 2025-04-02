export enum Routes {
  HOME = "/",
  USER_REGISTER = "/users/register",
  USER_REGISTER_PERSONAL_DATA = "/users/register/personal-data",
  USER_REGISTER_TERMS = "/users/register/terms",
  USER_REGISTER_FORMS = "/users/register/forms"
}

export const routesInfo: Record<Routes, { label: string }> = {
  [Routes.USER_REGISTER_PERSONAL_DATA]: {
    label: "Dados Pessoais"
  },
  [Routes.USER_REGISTER_FORMS]: {
    label: "Formulários"
  },
  [Routes.USER_REGISTER_TERMS]: {
    label: "Termos"
  },
  [Routes.HOME]: {
    label: ""
  },
  [Routes.USER_REGISTER]: {
    label: ""
  }
};


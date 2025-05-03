import { Routes } from "../constants/routes";

export const helpOptions = {
  hero: {
    title: "Como Ajudar o Projeto Bonny",
    subtitle: "Sua contribuição transforma vidas",
    backgroundImage: "/images/help-hero.jpg",
  },
  options: [
    {
      title: "Adoção Responsável",
      description: "Dê um lar permanente a um animal resgatado.",
      icon: "🐾",
      link: Routes.ADOPTION,
    },
    {
      title: "Apadrinhamento",
      description: "Ajuda mensal para custear um animal específico.",
      icon: "🐶",
      link: Routes.ADOPTION,
    },
    {
      title: "Doações Financeiras",
      description: "Qualquer valor faz diferença em nossos resgates.",
      icon: "💰",
      link: Routes.HELP,
    },
    {
      title: "Voluntariado",
      description: "Doe seu tempo e habilidades.",
      icon: "👐",
      link: Routes.HELP,
    },
  ],
  faqs: [
    {
      question: "Posso doar itens em vez de dinheiro?",
      answer: "Sim! Aceitamos ração, medicamentos, cobertores...",
    },
  ],
};

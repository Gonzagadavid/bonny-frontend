// src/data/about.ts
export const aboutData = {
    hero: {
      title: "Quem Somos",
      subtitle: "Conheça a história por trás do Projeto Bomy",
      backgroundImage: "/images/about-hero.jpg"
    },
    history: {
      title: "Nossa Jornada",
      paragraphs: [
        "O Projeto Bomy foi oficializado em 2018, mas nossa história começou muito antes, quando nossa fundadora resgatou Bomy, um vira-lata especial que inspirou tudo.",
        "Hoje, somos uma equipe de 15 voluntários dedicados que já resgatou mais de 500 animais, proporcionando cuidados veterinários, amor e lares permanentes."
      ],
      timeline: [
        { year: "2015", event: "Primeiro resgate (Bomy)" },
        { year: "2018", event: "Fundação oficial do projeto" },
        { year: "2022", event: "Primeira campanha nacional de adoção" }
      ]
    },
    pillars: {
      title: "Nossos Pilares",
      items: [
        {
          title: "Missão",
          content: "Resgatar, reabilitar e encontrar lares amorosos para animais em situação de risco."
        },
        {
          title: "Visão", 
          content: "Ser referência em bem-estar animal até 2030, reduzindo o abandono em 70%."
        },
        {
          title: "Valores",
          content: ["Compaixão", "Transparência", "Responsabilidade"]
        }
      ]
    },
    team: {
      title: "Nossa Equipe",
      members: [
        { name: "Ana Silva", role: "Fundadora", image: "/team/ana.jpg" },
      ]
    },
    cta: {
      title: "Faça parte dessa história",
      buttonText: "Quero Ajudar",
      link: "/how-to-help"
    },
    sponsors: [
      {
        name: "PetLovers",
        description: "Apoiadora oficial desde 2021, fornecendo alimentos e remédios.",
        logo: "/sponsors/petlovers.png"
      },
      {
        name: "Clínica Vet&Cia",
        description: "Responsável pelos cuidados veterinários de nossos resgatados.",
        logo: "/sponsors/clinicavet.png"
      },
      {
        name: "Grupo Amigos do Bem",
        description: "Parceiros nas campanhas de arrecadação e eventos.",
        logo: "/sponsors/amigosdobem.png"
      }
    ]
  };
  
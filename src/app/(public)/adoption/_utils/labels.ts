import { DogFell, DogSize, GenderEnum } from "@/types/enums";

export const dogSizeLabel = {
  [DogSize.BIG]: "Grande",
  [DogSize.MEDIUM]: "Médio",
  [DogSize.SMALL]: "Pequeno",
};

export const dogFellLabel = {
  [DogFell.LONG]: "Longo",
  [DogFell.SHORT]: "Curto",
};

export const genderLabel = {
  [GenderEnum.FEMALE]: "Fêmea",
  [GenderEnum.MALE]: "Macho",
};

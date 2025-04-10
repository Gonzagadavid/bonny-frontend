export const validateExp = (exp: string) => {
  return new Date(exp).getTime() >= Date.now();
};

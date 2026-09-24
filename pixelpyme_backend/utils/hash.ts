import { hash, compare } from "bcrypt";

export const hashPassword = async (password: string) => {
  return await hash(password);
};

export const compararPassword = async (password: string, hashGuardado: string) => {
  return await compare(password, hashGuardado);
};
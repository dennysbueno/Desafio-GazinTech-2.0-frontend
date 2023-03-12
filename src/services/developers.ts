import { api } from "./index";
import {
  DevelopersRequestProps,
  DevelopersResponseProps,
} from "../interfaces/developers";
import { differenceInYears, parseISO } from "date-fns";

export async function findAllDevelopers() {
  return api.get("/developers");
}

export async function insertDeveloper(developer: DevelopersRequestProps) {
  return api.post("/developers", developer);
}

export async function deleteDeveloper(id: number) {
  return api.delete(`developer/${id}`);
}

export async function showDeveloper(id: number) {
  return api.get(`developer/${id}`);
}

export async function updateDeveloper(
  id: number,
  developer: DevelopersRequestProps
) {
  return api.put(`developer/${id}`, developer);
}

export function calculateAge(developer: DevelopersResponseProps): number {
  const birthdate = parseISO(developer.birthdate);
  const today = new Date();
  const age = differenceInYears(today, birthdate);

  return age;
}

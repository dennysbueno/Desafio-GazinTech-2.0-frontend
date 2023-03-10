import { api } from "./index";
import { DevelopersRequestProps } from "../interfaces/developers";

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

export async function updateDeveloper(id: number, developer: DevelopersRequestProps) {
  return api.put(`developer/${id}`, developer);
}
import { api } from "./index";
import { LevelsRequestProps } from "../interfaces/levels";

export async function findAllLevels() {
  return api.get("/levels");
}

export async function insertLevel(level: LevelsRequestProps) {
  return api.post("/levels", level);
}

export async function deleteLevel(id: number) {
  return api.delete(`level/${id}`);
}

export async function showLevel(id: number) {
  return api.get(`level/${id}`);
}

export async function updateLevel(id: number, level: LevelsRequestProps) {
  return api.put(`level/${id}`, level);
}

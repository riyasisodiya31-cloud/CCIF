import api from "./api";
import { suspects as fallbackSuspects } from "../data/mockData.js";

export async function getSuspects() {
  try {
    const response = await api.get("/suspects/");
    return response.data;
  } catch (error) {
    console.error("Error fetching suspects:", error);
    return fallbackSuspects;
  }
}

export async function getSuspectById(suspectId) {
  try {
    const response = await api.get(`/suspects/${suspectId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching suspect:', error);
    return fallbackSuspects.find((s) => s.id === suspectId) || null;
  }
}

export { getSuspectById as getSuspect };

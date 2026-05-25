import api from "./api";
import { cases as fallbackCases } from "../data/mockData.js";

export async function getCases() {
  try {
    const response = await api.get("/cases/");
    return response.data;
  } catch (error) {
    console.error("Error fetching cases:", error);
    return fallbackCases;
  }
}

export async function getCaseById(caseId) {
  try {
    const response = await api.get(`/cases/${caseId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching case:", error);
    return fallbackCases.find((c) => c.id === caseId) || null;
  }
}

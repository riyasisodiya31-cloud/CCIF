import api from "./api";

export async function getCases() {
  try {
    const response = await api.get("/cases/");
    return response.data;
  } catch (error) {
    console.error("Error fetching cases:", error);
    return [];
  }
}

export async function getCaseById(caseId) {
  try {
    const response = await api.get(`/cases/${caseId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching case:", error);
    return null;
  }
}
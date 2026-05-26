import api from "./api";
import { cases as fallbackCases } from "../data/mockData.js";

const LOCAL_CASES_KEY = "ccif-local-cases";

function readLocalCases() {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_CASES_KEY) || "[]");
  } catch (error) {
    console.error("Error reading local cases:", error);
    return [];
  }
}

function writeLocalCase(caseItem) {
  const existing = readLocalCases().filter((item) => item.id !== caseItem.id);
  localStorage.setItem(LOCAL_CASES_KEY, JSON.stringify([caseItem, ...existing]));
}

export async function getCases() {
  try {
    const response = await api.get("/cases");
    const localCases = readLocalCases();
    const liveIds = new Set(response.data.map((item) => item.id));
    return [...localCases.filter((item) => !liveIds.has(item.id)), ...response.data];
  } catch (error) {
    console.error("Error fetching cases:", error);
    return [...readLocalCases(), ...fallbackCases];
  }
}

export async function getCase(caseId) {
  try {
    const response = await api.get(`/cases/${caseId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching case ${caseId}:`, error);
    return readLocalCases().find((item) => item.id === caseId) || fallbackCases.find((item) => item.id === caseId) || null;
  }
}

export async function createCase(caseItem) {
  try {
    const response = await api.post("/cases", caseItem);
    return response.data;
  } catch (error) {
    console.error("Error creating case:", error);
    writeLocalCase(caseItem);
    return caseItem;
  }
}

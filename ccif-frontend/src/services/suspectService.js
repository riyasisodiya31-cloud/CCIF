import api from "./api";

export async function getSuspects() {

 try {

   const response = await api.get("/suspects/");

   return response.data;

 } catch(error){

   console.log(error);

   return [];

 }

}

export async function getSuspectById(suspectId) {
  try {
    const response = await api.get(`/suspects/${suspectId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching suspect:', error);
    return null;
  }
}
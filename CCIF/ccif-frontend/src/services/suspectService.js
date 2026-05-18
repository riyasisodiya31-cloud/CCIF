import api from "./api";

export async function getSuspects() {

 try {

   const response = await api.get("/suspects");

   return response.data;

 } catch(error){

   console.log(error);

   return [];

 }

}
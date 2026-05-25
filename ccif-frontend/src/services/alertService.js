import api from "./api";
import { alerts as fallbackAlerts } from "../data/mockData.js";

export async function getAlerts(){

 try{

 const response=
 await api.get("/alerts/");

 return response.data;

 }

 catch(error){

 console.log(error);

 return fallbackAlerts;

 }

}

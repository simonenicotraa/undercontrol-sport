import { IAthlCoach } from "./iathl-coach";

export interface Iteams {
  id:number,
  name:string,
  season:string,
  gender: string,
  athletes:IAthlCoach[],
  coaches:IAthlCoach[]
}

import { Iatletes } from "./iatletes"

export interface Ipayment {
  id?:number|undefined,
season: string,
amount:number,
payed?:number
paymentStatus?:boolean
idAthlete?:number
}

import { Imedicalcertificates } from "./imedicalcertificates";

export interface Iatletes {
  "id"?: number;
  "name": string;
  "surname": string;
  "dateOfBirth": Date;
  "email": string;
  "ntel": string;
  "fiscalCode": string;
  "address": string;
  "cap": string;
  "listCertificates"?:Imedicalcertificates[]
}

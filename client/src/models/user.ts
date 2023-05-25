import { AuditInstances } from "./audits";


export interface User {
    username: string;
    email: string;
    password: string;
    position: string;
    AuditInstances: AuditInstances[];
}
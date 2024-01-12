import { Element } from "./element";

export interface Form {
    name: string,
    status: status,
    action: string
    method: method
    isEncrypt?: boolean,
    fields?:  [Element],
}

export enum status {
    ACTIVE = 'ACTIVE',
    DELETED = 'DELETED'
}

export enum method {
    GET = 'GET',
    POST = 'POST'
  }

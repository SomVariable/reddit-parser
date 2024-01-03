export const MISSING_SESSION_MESSAGE = (id: string) =>
  `there is no session with id: ${id}`;

export enum KV_STORE_OK {
  OK = 'Ok',
}

export enum KV_STORE_BAD_REQUEST {}

export enum KV_STORE_NOT_FOUND {}



export const SESSION_EXAMPLE = {
  id: '10:desktop',
  verificationKey: null,
  verificationTimestamp: null,
  status: 'ACTIVE',
};

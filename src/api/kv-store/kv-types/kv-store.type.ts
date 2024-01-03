import Bull from "bull";

export interface IBullType {
  id: Bull.JobId,
  name: string,
  data: any,
}
import type { Gender } from "./gender.ts";

export interface Person {
  name: string;
  id: number;
  age: number;
  gender: Gender;
  alive: boolean;
}

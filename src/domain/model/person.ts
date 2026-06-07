import type { Gender } from "./gender.js";

export interface Person {
  name: string;
  id: number;
  age: number;
  gender: Gender;
  alive: boolean;
}

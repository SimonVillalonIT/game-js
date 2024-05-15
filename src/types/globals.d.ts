import { State } from "../scripts/playerStates.ts";

type StateType =
  | "walk"
  | "run"
  | "jump"
  | "idle"
  | "attack"
  | "jumpAttack"
  | "dead";

type InputType =
  | "ArrowDown"
  | "ArrowUp"
  | "ArrowLeft"
  | "ArrowRight"
  | " "
  | "Escape";

type StateObject = { [key in StateType]: State };

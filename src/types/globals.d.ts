import { State } from "../scripts/playerStates.ts";

type StateType =
  | "walk"
  | "run"
  | "jump"
  | "idle"
  | "attack"
  | "jumpAttack"
  | "dead";

type InputType = "ArrowDown" | "ArrowUp" | "ArrowLeft" | "ArrowRight" | " ";

type StateObject = { [key in StateType]: State };

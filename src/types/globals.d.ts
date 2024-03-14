import { State } from "../scripts/playerStates.ts"

type StateType = "idle" | "walk" | "run" | "jump" | "attack"

type InputType = "ArrowDown" | "ArrowUp" | "ArrowLeft" | "ArrowRight" | "Enter"

type StateObject = { [key in StateType]: State }


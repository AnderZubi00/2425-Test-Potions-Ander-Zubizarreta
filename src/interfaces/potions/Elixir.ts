import { Modifiers } from "./Modifier";


export interface Elixir {
    name: string,
    modifiers: Modifiers,
    duration: number,
    type: string,
    value: number,
    image: string,
    min_lvl: number,
    description: string,
}
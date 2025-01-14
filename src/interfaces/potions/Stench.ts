import { Modifiers } from "./Modifier";


export interface Stench {
    name: string,
    modifiers: Modifiers,
    type: string,
    value: number,
    image: string,
    min_lvl: number,
    description: string,
}
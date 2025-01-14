import { Modifiers } from "./Modifier";


export interface Antidote {
    name: string,
    modifiers: Modifiers,
    type: string,
    value: number,
    image: string,
    min_lvl: number,
    description: string,
}
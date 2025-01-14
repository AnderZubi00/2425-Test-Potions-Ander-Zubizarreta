import { Modifiers } from "./Modifier";


export interface FailedPotion {
    name: string,
    modifiers: Modifiers,
    type: string,
    value: number,
    image: string,
    min_lvl: number,
    description: string,
}
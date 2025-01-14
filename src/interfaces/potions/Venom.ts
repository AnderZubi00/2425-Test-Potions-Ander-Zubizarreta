import { Modifiers } from "./Modifier";


export interface Venom {
    name: string,
    modifiers: Modifiers,
    duration: number,
    type: string,
    value: number,
    image: string,
    min_lvl: number,
    description: string,
}
import { Modifiers } from "./Modifier"




export interface Disease {
    modifiers: Modifiers,
    _id: string,
    name: string,
    description: string,
    type: string,
    antidote_effects: Array<string>,
    poison_effects: Array<string>

}


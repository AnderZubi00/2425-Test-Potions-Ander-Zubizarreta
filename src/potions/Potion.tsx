import { Modifiers } from "../interfaces/potions/Modifier";


// Exportarla clase potion 
export default class Potion {

    // Elementos que contiene la clase potion
    name: string;
    modifier: Modifiers;
    type: string;

    // Constructor de la clase Potion
    constructor(name:string, modifier:Modifiers) {
        this.name = name;
        this.modifier = modifier;
        this.type = "Potion";
    }

    // Clase estatica para crear las pociones
    static createBasicPotion(name:string, modifier:Modifiers){
        return( new Potion(name, modifier));
    }

    // Metodo para conseguir el valor minimo del modificador 
    static getTheMinModifierFromAllTheIngredients(ingredients:[], attribute:string) {
    
        let ingredientModifier = "greater";

        for (let i = 0; i < ingredients.length; i++) {
            const ingredient = ingredients[i];

            for (let i = 0; i < ingredient.effects.length; i++) {
                const effect = ingredient.effects[i];
                
                if (effect.attribute === attribute) {
                    switch (ingredientModifier) {
    
                        case "greater":
    
                            if ((effect.modifier === "lesser") ||  (effect.modifier === "least") ||  (effect.modifier === "nada")) {
                                ingredientModifier = effect.modifier;
                            }
    
                            break;
    
                        case "nada":
                            if ((effect.modifier === "lesser") ||  (effect.modifier === "least")) {
                                ingredientModifier = effect.modifier;
                            }
    
                            break;
    
                        case "lesser":
    
                            if (effect.modifier === "least") {
                                ingredientModifier = effect.modifier;
                            }
                            
                            break;
                    
                        default:
                            break;
                    }
                }
            }
            
        }

        return (ingredientModifier === "nada" ? "" : ingredientModifier +" ");
    }
}
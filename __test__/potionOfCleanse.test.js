import Cauldron from "../src/classes/cauldron.js";
import Ingredient from "../src/classes/ingredient.js";
import Purification from "../src/potions/Purification.tsx";

// POTION OF CLEANSE
describe('Cuando los efectos de ingredientes asociados llevan los nombres: "Cleanse Parchment", son 2 y distintos.', () => {
    it('Se creará la poción de limpieza', () => {
        const ingredients = [
            new Ingredient('Dragon\'s Blood Resin', [{ attribute: 'purification', effect: 'cleanse', fullName: 'Cleanse Parchment' }], 15, 'image1.png'),
            new Ingredient('Gloomshade Moss', [{ attribute: 'purification', effect: 'cleanse', fullName: 'Cleanse Parchment' }], 10, 'image2.png')
        ];
        
        const diseases = []; 
        const cauldron = new Cauldron({ ingredients }, diseases, {});
        const potion = cauldron.createPotion(ingredients);

        expect(potion).toBeInstanceOf(Purification);
        expect(potion.name).toBe('Potion of Purification');
    });
});



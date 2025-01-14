import Cauldron from "../src/classes/cauldron.js";
import Ingredient from "../src/classes/ingredient.js";
import FailedPotion from "../src/potions/FailedPotion.tsx";

// FAILED POTION
describe('Si no se cumple cualquiera de las condiciones de creación anteriores', () => {
    it('Se creará el Tonic of Downfall.', () => {
        const ingredients = [
            new Ingredient('Mysterious Leaf', [{ attribute: 'unknown', effect: 'mystery', fullName: 'Mysterious Effect' }], 5, 'image1.png'),
            new Ingredient('Old Root', [{ attribute: 'unknown', effect: 'mystery', fullName: 'Mysterious Effect' }], 3, 'image2.png')
        ];

        const diseases = []; 
        const playerData = { attributes: { insanity: 5, charisma: 3 } }; 
        const cauldron = new Cauldron({ ingredients }, diseases, playerData);
        const potion = cauldron.createPotion(ingredients);

        expect(potion).toBeInstanceOf(FailedPotion);
        expect(potion.name).toBe('Tonic of Downfall');
    });
});
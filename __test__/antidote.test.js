import Cauldron from "../src/classes/cauldron.js";
import Ingredient from "../src/classes/ingredient.js";

jest.spyOn(Math, 'random').mockReturnValue(0.5);

//ANTIDOTE
describe('Cuando todos los ingredientes llevan el efecto "Restore"', () => {
    describe('Si los ingredientes contienen los efectos necesarios para combatir una enfermedad concreta, se creará el antídoto asociado a la enfermedad', () =>  {
      it('El nombre deberá ser el correspondiente: "Antidote of + nombre de la enfermedad"', () => {
        const ingredients = [
            new Ingredient('Elysian Flower', [{ attribute: 'intelligence', effect: 'restore', fullName: 'restore_intelligence' }], 10, 'image1.png'),
            new Ingredient('Calming Herb', [{ attribute: 'insanity', effect: 'restore', fullName: 'lesser_restore_insanity' }], 5, 'image2.png')
          ];
          const diseases = [
            {
              name: 'Ethereal Consumption',
              antidote_effects: ['restore_intelligence', 'lesser_restore_insanity'],
              attributes: { intelligence: -10, insanity: -5 },
              modifiers: { 
                hit_points: -10,
                intelligence: -10,
                dexterity: -5,
                insanity: 6,
                charisma: 0,
                constitution: -4,
                strength: -3,
                resistence: 0
              }
            }
          ];
        const cauldron = new Cauldron(ingredients, diseases, {});
        const potion = cauldron.createPotion(ingredients);
        
        expect(potion.name).toBe('Antidote of Ethereal Consumption');
      });

      it('Los atributos tendrán el valor que aparece en la enfermedad pero cambiado de signo', () => {
        const ingredients = [
            new Ingredient('Elysian Flower', [{ attribute: 'intelligence', effect: 'restore', fullName: 'restore_intelligence' }], 10, 'image1.png'),
            new Ingredient('Calming Herb', [{ attribute: 'insanity', effect: 'restore', fullName: 'lesser_restore_insanity' }], 6, 'image2.png')
        ];
        
        const diseases = [
            {
              name: 'Ethereal Consumption',
              antidote_effects: ['restore_intelligence', 'lesser_restore_insanity'],
              attributes: { intelligence: -10, insanity: -6 },
              modifiers: { 
                hit_points: -10,
                intelligence: -10,
                dexterity: -5,
                insanity: 6,
                charisma: 0,
                constitution: -4,
                strength: -3,
                resistence: 0
              }
            }
        ];
        
        const cauldron = new Cauldron({ ingredients }, diseases, {});
        const potion = cauldron.createPotion(ingredients);
        
        expect(potion).toHaveProperty('modifier'); 
        expect(potion.modifier.intelligence).toBe(11); 
        expect(potion.modifier.insanity).toBe(-9); 
      });
    });
  });

  describe('Si alguno de los ingredientes no tiene el efecto "Restore"', () => {
    it('No podremos crear un antídoto. El nombre de la poción creada no llevará la palabra "Antidote"', () => {

        const ingredients = [
            new Ingredient('Elysian Flower', [{ attribute: 'intelligence', effect: 'restore', fullName: 'restore_intelligence' }], 10, 'image1.png'),
            new Ingredient('Wretched Extract', [{ attribute: 'intelligence', effect: 'damage', fullName: 'greater_damage_intelligence' }], 6, 'image2.png')
        ];
        const diseases = [
            {
              name: 'Ethereal Consumption',
              antidote_effects: ['restore_intelligence', 'lesser_restore_insanity'],
              attributes: { intelligence: -10, insanity: -6 },
              modifiers: { 
                hit_points: -10,
                intelligence: -10,
                dexterity: -5,
                insanity: 6,
                charisma: 0,
                constitution: -4,
                strength: -3,
                resistence: 0
              }
            }
        ];

        const playerData = {
            attributes: {
              insanity: 5,
              charisma: 3
            }
          };
        
        const cauldron = new Cauldron({ ingredients }, diseases, playerData);
        const potion = cauldron.createPotion(ingredients);
        
        expect(potion.name).not.toContain('Antidote');
    });
  });

  
import Cauldron from "../src/classes/cauldron.js";
import Ingredient from "../src/classes/ingredient.js";

jest.spyOn(Math, 'random').mockReturnValue(0.5);

  //POISON
  describe('Cuando todos los ingredientes llevan el efecto "Damage"', () => {
    describe('Si los ingredientes contienen los efectos necesarios para combatir una enfermedad concreta, se creará el poison asociado a la enfermedad', () =>  {
      it('El nombre deberá ser el correspondiente: "Poison of + nombre de la enfermedad"', () => {
        const ingredients = [
            new Ingredient('Cursed Blossom', [{ attribute: 'intelligence', effect: 'damage', fullName: 'damage_intelligence' }], 10, 'image1.png'),
            new Ingredient('Elixir of Despair', [{ attribute: 'insanity', effect: 'damage', fullName: 'lesser_damage_insanity' }], 5, 'image2.png')
          ];
          const diseases = [
            {
              name: 'Ethereal Consumption',
              poison_effects: ['damage_intelligence', 'lesser_damage_insanity'], 
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
        
        expect(potion.name).toBe('Poison of Ethereal Consumption');
      });

      it('Los atributos tendrán el valor que aparece en la enfermedad pero cambiado de signo', () => {
        const ingredients = [
            new Ingredient('Cursed Blossom', [{ attribute: 'intelligence', effect: 'damage', fullName: 'damage_intelligence' }], 10, 'image1.png'),
            new Ingredient('Elixir of Despair', [{ attribute: 'insanity', effect: 'damage', fullName: 'lesser_damage_insanity' }], 5, 'image2.png')
          ];
          const diseases = [
            {
              name: 'Ethereal Consumption',
              poison_effects: ['damage_intelligence', 'lesser_damage_insanity'], 
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
        
        const cauldron = new Cauldron({ ingredients }, diseases, {});
        const potion = cauldron.createPotion(ingredients);
        
        expect(potion).toHaveProperty('modifier'); 
        expect(potion.modifier.intelligence).toBe(-10); 
        expect(potion.modifier.insanity).toBe(6); 
      });
    });
  });

  describe('Si alguno de los ingredientes no tiene el efecto "Damage"', () => {
    it('No podremos crear un poison. El nombre de la poción creada no llevará la palabra "Poison"', () => {

        const ingredients = [
            new Ingredient('Cursed Blossom', [{ attribute: 'intelligence', effect: 'damage', fullName: 'damage_intelligence' }], 10, 'image1.png'),
            new Ingredient('Elixir of Despair', [{ attribute: 'insanity', effect: 'restore', fullName: 'restore_insanity' }], 5, 'image2.png')
          ];
          const diseases = [
            {
              name: 'Ethereal Consumption',
              antidote_effects: ['damage_intelligence', 'lesser_damage_insanity'],
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

        const playerData = {
            attributes: {
              insanity: 5,
              charisma: 3
            }
          };
        
        const cauldron = new Cauldron({ ingredients }, diseases, playerData);
        const potion = cauldron.createPotion(ingredients);
        
        expect(potion.name).not.toContain('Poison');
    });
  });

import Cauldron from "../src/classes/cauldron.js";
import Ingredient from "../src/classes/ingredient.js";


describe('Cuando el numero de ingredientes es 2-4', () => {
    describe('Cuando los efectos de ingredientes asociados llevaran los nombres: "Stench"', () => {
        describe('Cuando todos los ingredientes tienen el mismo atributo (INT, DEX, ...)', () => {
            describe('Cuando todos los efectos son de tipo least', () => {
                it('El valor resultante del atributo será la media de los valores de los ingredientes redondeada al múltiplo de 5 inmediatamente inferior y la duración será la media de duraciones redondeada para abajo', () => {
                    const ingredients = [
                        new Ingredient('Toxic Petal', [{ attribute: 'charisma', effect: 'stench', fullName: 'least_stench_charisma', duration: 12 }], 20, 'image1.png'),
                        new Ingredient('Toxic Petal', [{ attribute: 'charisma', effect: 'stench', fullName: 'least_stench_charisma', duration: 14 }], 18, 'image2.png')
                    ];

                    const diseases = [];
                    const playerData = { attributes: { insanity: 0, charisma: 0 } };
                    const cauldron = new Cauldron({ ingredients }, diseases, playerData);
                    const potion = cauldron.createPotion(ingredients);

                    expect(potion.name).toBe('Tonic of Downfall');
                    expect(potion.modifier.charisma).toBe(0);
                    expect(potion.duration).toBe(undefined);
                });
            });

            describe('Cuando todos los efectos son de tipo lesser', () => {
                it('El valor resultante del atributo será la media de los valores de los ingredientes redondeada al múltiplo de 5 inmediatamente inferior y la duración será la media de duraciones redondeada para abajo', () => {
                    const ingredients = [
                        new Ingredient('Venomleaf', [{ attribute: 'intelligence', effect: 'stench', fullName: 'lesser_stench_intelligence', duration: 10 }], 20, 'image1.png'),
                        new Ingredient('Venomleaf', [{ attribute: 'intelligence', effect: 'stench', fullName: 'lesser_stench_intelligence', duration: 16 }], 18, 'image2.png')
                    ];

                    const diseases = [];
                    const playerData = { attributes: { insanity: 0, charisma: 0 } };
                    const cauldron = new Cauldron({ ingredients }, diseases, playerData);
                    const potion = cauldron.createPotion(ingredients);

                    expect(potion.name).toBe('Tonic of Downfall');
                    expect(potion.modifier.intelligence).toBe(-0);
                    expect(potion.duration).toBe(undefined);
                });
            });

            describe('Cuando todos los efectos son de tipo normal', () => {
                it('El valor resultante del atributo será la media de los valores de los ingredientes redondeada al múltiplo de 5 inmediatamente inferior y la duración será la media de duraciones redondeada para abajo', () => {
                    const ingredients = [
                        new Ingredient('Nightshade Blossom', [{ attribute: 'intelligence', effect: 'stench', fullName: 'stench_intelligence', duration: 12 }], 20, 'image1.png'),
                        new Ingredient('Nightshade Blossom', [{ attribute: 'intelligence', effect: 'stench', fullName: 'stench_intelligence', duration: 14 }], 18, 'image2.png')
                    ];

                    const diseases = [];
                    const playerData = { attributes: { insanity: 0, charisma: 0 } };
                    const cauldron = new Cauldron({ ingredients }, diseases, playerData);
                    const potion = cauldron.createPotion(ingredients);

                    expect(potion.name).toBe('Tonic of Downfall');
                    expect(potion.modifier.intelligence).toBe(-6);
                    expect(potion.duration).toBe(0);
                });
            });

            describe('Cuando todos los efectos son de tipo greater', () => {
                it('El valor resultante del atributo será la media de los valores de los ingredientes redondeada al múltiplo de 5 inmediatamente inferior y la duración será la media de duraciones redondeada para abajo', () => {
                    const ingredients = [
                        new Ingredient('Poisonous Herb', [{ attribute: 'intelligence', effect: 'stench', fullName: 'greater_stench_intelligence', duration: 12 }], 20, 'image1.png'),
                        new Ingredient('Poisonous Herb', [{ attribute: 'intelligence', effect: 'stench', fullName: 'greater_stench_intelligence', duration: 14 }], 18, 'image2.png')
                    ];

                    const diseases = [];
                    const playerData = { attributes: { insanity: 0, charisma: 0 } };
                    const cauldron = new Cauldron({ ingredients }, diseases, playerData);
                    const potion = cauldron.createPotion(ingredients);

                    expect(potion.name).toBe('Tonic of Downfall');
                    expect(potion.modifier.intelligence).toBe(0);
                    expect(potion.duration).toBe(0);
                });
            });
        });

        describe('Cuando todos los efectos son de tipo diferente', () => {
            it('El valor resultante del atributo será la media de los valores de los ingredientes redondeada al múltiplo de 5 inmediatamente inferior y la duración será la media de duraciones redondeada para abajo. El nombre de la poción será "Modifier + Atributo + Venom".', () => {
                const ingredients = [
                    new Ingredient('Radiant Petal', [{ attribute: 'charisma', effect: 'stench', fullName: 'least_stench_charisma', duration: 12 }], 20, 'image1.png'),
                    new Ingredient('Celestial Orchid', [{ attribute: 'charisma', effect: 'stench', fullName: 'greater_stench_charisma', duration: 14 }], 18, 'image2.png')
                ];

                const diseases = [];
                const playerData = { attributes: { insanity: 0, charisma: 0 } };
                const cauldron = new Cauldron({ ingredients }, diseases, playerData);
                const potion = cauldron.createPotion(ingredients);

                expect(potion.name).toBe('Tonic of Downfall');
                expect(potion.modifier.charisma).toBe(0);
                expect(potion.duration).toBe(0);
            });
        });

        describe('Cuando no todos los ingredientes tienen el mismo atributo (INT, DEX, ...)', () => {
            it('No podremos crear el venom. El nombre de la poción creada no llevará la palabra "Venom".', () => {
                const ingredients = [
                    new Ingredient('Starfall Blossom', [{ attribute: 'intelligence', effect: 'stench', fullName: 'stench_intelligence' }], 10, 'image1.png'),
                    new Ingredient('Firepetal', [{ attribute: 'strength', effect: 'stench', fullName: 'stench_strength' }], 12, 'image2.png')
                ];

                const diseases = [];
                const playerData = { attributes: { insanity: 0, charisma: 0 } };
                const cauldron = new Cauldron({ ingredients }, diseases, playerData);
                const potion = cauldron.createPotion(ingredients);

                expect(potion.name).not.toContain('Venom');
            });
        });

        describe('Cuando alguno de los efectos de ingredientes no lleva el nombre "Stench"', () => {
            it('No podremos crear el venom. Comprobar nombre.', () => {
                const ingredients = [
                    new Ingredient('Starfall Blossom', [{ attribute: 'intelligence', effect: 'stench', fullName: 'stench_intelligence' }], 10, 'image1.png'),
                    new Ingredient('Cursed Blossom', [{ attribute: 'intelligence', effect: 'heal', fullName: 'heal_intelligence' }], 12, 'image2.png')
                ];

                const diseases = [];
                const playerData = { attributes: { insanity: 0, charisma: 0 } };
                const cauldron = new Cauldron({ ingredients }, diseases, playerData);
                const potion = cauldron.createPotion(ingredients);

                expect(potion.name).not.toContain('Venom');
            });
        });

        describe('Cuando los efectos de ingredientes asociados llevaran el nombre "Frenzy"', () => {
            it('No podremos crear el venom. Comprobar nombre.', () => {
                const ingredients = [
                    new Ingredient('Starfall Blossom', [{ attribute: 'insanity', effect: 'frenzy', fullName: 'frenzy_insanity' }], 10, 'image1.png'),
                    new Ingredient('Soothing Leaf', [{ attribute: 'insanity', effect: 'frenzy', fullName: 'frenzy_insanity' }], 12, 'image2.png')
                ];

                const diseases = [];
                const playerData = { attributes: { insanity: 0, charisma: 0 } };
                const cauldron = new Cauldron({ ingredients }, diseases, playerData);
                const potion = cauldron.createPotion(ingredients);

                expect(potion.description).toBe('This is a venom!!!!');
            });
        });

        describe('Si el número de ingredientes es menor que 2 o mayor que 4', () => {
            it('No podremos crear el venom. Comprobar nombre.', () => {
                const ingredients = [
                    new Ingredient('Starfall Blossom', [{ attribute: 'intelligence', effect: 'stench', fullName: 'stench_intelligence' }], 10, 'image1.png')
                ];

                const diseases = [];
                const playerData = { attributes: { insanity: 0, charisma: 0 } };
                const cauldron = new Cauldron({ ingredients }, diseases, playerData);

                try {
                    const potion = cauldron.createPotion(ingredients);
                    expect(potion.name).not.toContain('Venom');
                } catch (error) {
                    expect(error.message).toBe('Se requieren dos, tres o cuatro ingredientes para crear una poción.');
                }
            });
        });

    });
});

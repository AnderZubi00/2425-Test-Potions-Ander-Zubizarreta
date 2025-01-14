import Cauldron from "../src/classes/cauldron.js";
import Ingredient from "../src/classes/ingredient.js";

describe('Cuando el numero de ingredientes es 2-4', () => {
    describe('Cuando los efectos de ingredientes asociados llevaran los nombres: "Boost"', () => {
        describe('Cuando todos los ingredientes tienen el mismo atributo (INT, DEX, ...)', () => {
            describe('Cuando todos los efectos son de tipo least', () => {
                it('El valor resultante del atributo será la media de los valores de los ingredientes redondeada al múltiplo de 5 inmediatamente inferior y la duración será la media de duraciones redondeada para abajo', () => {
                    const ingredients = [
                        new Ingredient('Radiant Petal', [{ attribute: 'charisma', effect: 'boost', fullName: 'least_boost_charisma', duration: 12 }], 20, 'image1.png'),
                        new Ingredient('Radiant Petal', [{ attribute: 'charisma', effect: 'boost', fullName: 'least_boost_charisma', duration: 14 }], 18, 'image2.png')
                    ];

                    const diseases = [];
                    const cauldron = new Cauldron({ ingredients }, diseases, {});
                    const potion = cauldron.createPotion(ingredients);

                    expect(potion.name).toBe('Charisma Elixir');
                    expect(potion.modifier.charisma).toBe(0);
                    expect(potion.duration).toBe(0);
                });
            });

            describe('Cuando todos los efectos son de tipo lesser', () => {
                it('El valor resultante del atributo será la media de los valores de los ingredientes redondeada al múltiplo de 5 inmediatamente inferior y la duración será la media de duraciones redondeada para abajo', () => {
                    const ingredients = [
                        new Ingredient('Sageleaf', [{ attribute: 'intelligence', effect: 'boost', fullName: 'lesser_boost_intelligence', duration: 10 }], 20, 'image1.png'),
                        new Ingredient('Sageleaf', [{ attribute: 'intelligence', effect: 'boost', fullName: 'lesser_boost_intelligence', duration: 16 }], 18, 'image2.png')
                    ];

                    const diseases = [];
                    const cauldron = new Cauldron({ ingredients }, diseases, {});
                    const potion = cauldron.createPotion(ingredients);

                    expect(potion.name).toBe('Intelligence Elixir');
                    expect(potion.modifier.intelligence).toBe(0);
                    expect(potion.duration).toBe(0);
                });
            });

            describe('Cuando todos los efectos son de tipo normal', () => {
                it('El valor resultante del atributo será la media de los valores de los ingredientes redondeada al múltiplo de 5 inmediatamente inferior y la duración será la media de duraciones redondeada para abajo', () => {
                    const ingredients = [
                        new Ingredient('Starfall Blossom', [{ attribute: 'intelligence', effect: 'boost', fullName: 'boost_intelligence', duration: 12 }], 20, 'image1.png'),
                        new Ingredient('Starfall Blossom', [{ attribute: 'intelligence', effect: 'boost', fullName: 'boost_intelligence', duration: 14 }], 18, 'image2.png')
                    ];

                    const diseases = [];
                    const cauldron = new Cauldron({ ingredients }, diseases, {});
                    const potion = cauldron.createPotion(ingredients);

                    expect(potion.name).toBe('Intelligence Elixir');
                    expect(potion.modifier.intelligence).toBe(0);
                    expect(potion.duration).toBe(0);
                });
            });

            describe('Cuando todos los efectos son de tipo greater', () => {
                it('El valor resultante del atributo será la media de los valores de los ingredientes redondeada al múltiplo de 5 inmediatamente inferior y la duración será la media de duraciones redondeada para abajo', () => {
                    const ingredients = [
                        new Ingredient('Astral Herb', [{ attribute: 'intelligence', effect: 'boost', fullName: 'greater_boost_intelligence', duration: 12 }], 20, 'image1.png'),
                        new Ingredient('Astral Herb', [{ attribute: 'intelligence', effect: 'boost', fullName: 'greater_boost_intelligence', duration: 14 }], 18, 'image2.png')
                    ];

                    const diseases = [];
                    const cauldron = new Cauldron({ ingredients }, diseases, {});
                    const potion = cauldron.createPotion(ingredients);

                    expect(potion.name).toBe('Intelligence Elixir');
                    expect(potion.modifier.intelligence).toBe(0);
                    expect(potion.duration).toBe(0);
                });
            });
        });

        describe('Cuando todos los efectos son de tipo diferente', () => {
            it('El valor resultante del atributo será la media de los valores de los ingredientes redondeada al múltiplo de 5 inmediatamente inferior y la duración será la media de duraciones redondeada para abajo. El nombre de la poción será "Boost + Atributo + Elixir".', () => {
                const ingredients = [
                    new Ingredient('Radiant Petal', [{ attribute: 'charisma', effect: 'boost', fullName: 'least_boost_charisma', duration: 12 }], 20, 'image1.png'),
                    new Ingredient('Celestial Orchid', [{ attribute: 'charisma', effect: 'boost', fullName: 'greater_boost_intelligence', duration: 14 }], 18, 'image2.png')
                ];

                const diseases = [];
                const cauldron = new Cauldron({ ingredients }, diseases, {});
                const potion = cauldron.createPotion(ingredients);

                expect(potion.name).toBe('Charisma Elixir');
                expect(potion.modifier.intelligence).toBe(0);
                expect(potion.duration).toBe(0);
            });
        });

        describe('Cuando no todos los ingredientes tienen el mismo atributo (INT, DEX, ...)', () => {
            it('No podremos crear el elixir. El nombre de la poción creada no llevará la palabra "Elixir".', () => {
                const ingredients = [
                    new Ingredient('Starfall Blossom', [{ attribute: 'intelligence', effect: 'boost', fullName: 'boost_intelligence' }], 10, 'image1.png'),
                    new Ingredient('Firepetal', [{ attribute: 'strength', effect: 'boost', fullName: 'boost_strength' }], 12, 'image2.png')
                ];

                const diseases = [];
                const playerData = { attributes: { insanity: 0, charisma: 0 } };
                const cauldron = new Cauldron({ ingredients }, diseases, playerData);
                const potion = cauldron.createPotion(ingredients);

                expect(potion.name).not.toContain('Elixir');
            });
        });

        describe('Cuando alguno de los efectos de ingredientes no lleva el nombre "Boost"', () => {
            it('No podremos crear el elixir. Comprobar nombre.', () => {
                const ingredients = [
                    new Ingredient('Starfall Blossom', [{ attribute: 'intelligence', effect: 'boost', fullName: 'boost_intelligence' }], 10, 'image1.png'),
                    new Ingredient('Cursed Blossom', [{ attribute: 'intelligence', effect: 'heal', fullName: 'heal_intelligence' }], 12, 'image2.png')
                ];
        
                const diseases = [];
                const playerData = { attributes: { insanity: 0, charisma: 0 } }; 
                const cauldron = new Cauldron({ ingredients }, diseases, playerData);
                const potion = cauldron.createPotion(ingredients);
        
                expect(potion.name).not.toBe('Elixir');
            });
            });
        });

        describe('Cuando los efectos de ingredientes asociados llevaran el nombre "Calm"', () => {
            it('No podremos crear el elixir. Comprobar nombre.', () => {
                const ingredients = [
                    new Ingredient('Starfall Blossom', [{ attribute: 'insanity', effect: 'calm', fullName: 'calm_insanity' }], 10, 'image1.png'),
                    new Ingredient('Soothing Leaf', [{ attribute: 'insanity', effect: 'calm', fullName: 'calm_insanity' }], 12, 'image2.png')
                ];
        
                const diseases = [];
                const playerData = { attributes: { insanity: 0, charisma: 0 } };
                const cauldron = new Cauldron({ ingredients }, diseases, playerData);
                const potion = cauldron.createPotion(ingredients);
        
                expect(potion.description).toBe('This is an elixir!!!!');
            });
        });

        describe('Cuando alguno de los efectos de ingredientes no lleva el nombre "Boost"', () => {
            it('No podremos crear el elixir. Comprobar nombre.', () => {
                const ingredients = [
                    new Ingredient('Starfall Blossom', [{ attribute: 'intelligence', effect: 'boost', fullName: 'boost_intelligence' }], 10, 'image1.png'),
                    new Ingredient('Cursed Blossom', [{ attribute: 'intelligence', effect: 'heal', fullName: 'heal_intelligence' }], 12, 'image2.png')
                ];
        
                const diseases = [];
                const playerData = { attributes: { insanity: 0, charisma: 0 } };
                const cauldron = new Cauldron({ ingredients }, diseases, playerData);
                const potion = cauldron.createPotion(ingredients);
        
                expect(potion.description).toBe('This is an elixir!!!!');
            });
        });



        describe('Si el número de ingredientes es menor que 2 o mayor que 4', () => {
            it('No podremos crear el elixir. Comprobar nombre.', () => {
                const ingredients = [
                    new Ingredient('Starfall Blossom', [{ attribute: 'intelligence', effect: 'boost', fullName: 'boost_intelligence' }], 10, 'image1.png')
                ];

                const diseases = [];
                const playerData = { attributes: { insanity: 0, charisma: 0 } };
                const cauldron = new Cauldron({ ingredients }, diseases, playerData);

                try {
                    const potion = cauldron.createPotion(ingredients);
                    expect(potion.name).not.toContain('Elixir');
                } catch (error) {
                    expect(error.message).toBe('Se requieren dos, tres o cuatro ingredientes para crear una poción.');
                }
            });
        });

    });



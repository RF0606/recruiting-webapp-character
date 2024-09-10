import React, { createContext, useReducer, useContext } from 'react';
import { ATTRIBUTE_LIST, SKILL_LIST } from './consts';

// initialize attributes
const initialAttributes = ATTRIBUTE_LIST.reduce((acc, attr) => {
    acc[attr] = 10;
    return acc;
}, {});


// initialize modifiers
const initialModifiers = ATTRIBUTE_LIST.reduce((acc, attr) => {
    acc[attr] = Math.floor((initialAttributes[attr] - 10) / 2);
    return acc;
}, {});


// initialize skills
const initialSkills = SKILL_LIST.reduce((acc, skill) => {
    acc[skill.name] = 0;
    return acc;
}, {});


// initial available skill points
const calculateAvailableSkillPoints = (intelligenceModifier) => { return 10 + 4 * intelligenceModifier }
const initialAvailableSkillPoints = calculateAvailableSkillPoints(initialModifiers.Intelligence)


// initial character state
const initialCharacterState = {
    attributes: initialAttributes,
    modifiers: initialModifiers,
    skills: initialSkills,
    availableSkillPoints: initialAvailableSkillPoints,
    skillCheckResult: [],
};


// initialized state as array
const initialState = {
    characters: [initialCharacterState],
};

const AttributesContext = createContext();

const attributesReducer = (state, action) => {
    const updatedCharacters = [...state.characters];
    const character = updatedCharacters[action.index];

    switch (action.type) {
        // attribute increase
        case 'INCREMENT_ATTRIBUTE':

            if (!character) return state; // check if character exist

            const increasedAttributes = {
                ...character.attributes,
                [action.payload]: character.attributes[action.payload] + 1,
            };
            const increasedModifiers = {
                ...character.modifiers,
                [action.payload]: Math.floor((increasedAttributes[action.payload] - 10) / 2),
            };
            const increasedAvailableSkillPoints = calculateAvailableSkillPoints(increasedModifiers.Intelligence);

            updatedCharacters[action.index] = {
                ...character,
                attributes: increasedAttributes,
                modifiers: increasedModifiers,
                availableSkillPoints: increasedAvailableSkillPoints - Object.values(character.skills).reduce((sum, val) => sum + val, 0),
            };

            return {
                ...state,
                characters: updatedCharacters,
            };


        // attribute decrease
        case 'DECREMENT_ATTRIBUTE':

            if (!character) return state; // check if character exist

            const decreasedAttributes = {
                ...character.attributes,
                [action.payload]: character.attributes[action.payload] - 1,
            };
            const decreasedModifiers = {
                ...character.modifiers,
                [action.payload]: Math.floor((decreasedAttributes[action.payload] - 10) / 2),
            };
            const decreasedAvailableSkillPoints = calculateAvailableSkillPoints(decreasedModifiers.Intelligence);

            updatedCharacters[action.index] = {
                ...character,
                attributes: decreasedAttributes,
                modifiers: decreasedModifiers,
                availableSkillPoints: decreasedAvailableSkillPoints - Object.values(character.skills).reduce((sum, val) => sum + val, 0),
            };


            return {
                ...state,
                characters: updatedCharacters,
            };


        // skill increase
        case 'INCREMENT_SKILL': {
            if (!character || character.availableSkillPoints <= 0) {
                alert("No available skill points left.");
                return state;
            }
            const newSkills = {
                ...character.skills,
                [action.payload]: character.skills[action.payload] + 1,
            };

            updatedCharacters[action.index] = {
                ...character,
                skills: newSkills,
                availableSkillPoints: character.availableSkillPoints - 1,
            };

            return {
                ...state,
                characters: updatedCharacters,
            };
        }


        // skill decrease
        case 'DECREMENT_SKILL': {
            if (!character || character.skills[action.payload] <= 0) {
                return state;
            }
            const newSkills = {
                ...character.skills,
                [action.payload]: character.skills[action.payload] - 1,
            };

            updatedCharacters[action.index] = {
                ...character,
                skills: newSkills,
                availableSkillPoints: character.availableSkillPoints + 1,
            };

            return {
                ...state,
                characters: updatedCharacters,
            };
        }


        // check skills status
        case 'CHECK_SKILL': {

            if (!character) return state; // check if character exist

            const { selectedSkill, dc } = action.payload;
            const randomRoll = Math.floor(Math.random() * 20) + 1;
            const skillModifier = character.modifiers[SKILL_LIST.find(skill => skill.name === selectedSkill).attributeModifier];
            const skillTotal = character.skills[selectedSkill] + skillModifier;
            const total = skillTotal + randomRoll;
            const isSuccess = total >= dc;

            updatedCharacters[action.index] = {
                ...character,
                skillCheckResult: {
                    selectedSkill,
                    dc,
                    rollResult: randomRoll,
                    skillTotal,
                    total,
                    isSuccess,
                },
            }

            return {
                ...state,
                characters: updatedCharacters,
            };
        }

        case 'ADD_NEW_CHARACTER': {
            return {
                ...state,
                characters: [...state.characters, initialCharacterState],
            };
        }


        // reset all
        case 'RESET_ALL': {
            // iterate every character to reset
            const resetCharacters = state.characters.map(() => ({
                attributes: { ...initialAttributes },
                modifiers: { ...initialModifiers },
                skills: { ...initialSkills },
                availableSkillPoints: initialAvailableSkillPoints,
                skillCheckResult: {},
            }));

            return {
                ...state,
                characters: resetCharacters,
            };
        }


        //default 
        default:
            return state;
    }
};

export const AttributesProvider = ({ children }) => {
    const [state, dispatch] = useReducer(attributesReducer, initialState);

    return (
        <AttributesContext.Provider
            value={{
                characters: state.characters,
                dispatch,
            }}
        >
            {children}
        </AttributesContext.Provider>
    );
};

export const useAttributes = () => useContext(AttributesContext);

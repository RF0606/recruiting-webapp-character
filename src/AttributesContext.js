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


// initialized state
const initialState = {
    attributes: initialAttributes,
    modifiers: initialModifiers,
    skills: initialSkills,
    availableSkillPoints: initialAvailableSkillPoints,
    skillCheckResult: [],
};

const AttributesContext = createContext();

const attributesReducer = (state, action) => {
    switch (action.type) {
        // attribute increase
        case 'INCREMENT_ATTRIBUTE':
            const increasedAttributes = {
                ...state.attributes,
                [action.payload]: state.attributes[action.payload] + 1,
            };
            const incresedModifiers = {
                ...state.modifiers,
                [action.payload]: Math.floor((increasedAttributes[action.payload] - 10) / 2),
            };
            const increasedAvailableSkillPoints = calculateAvailableSkillPoints(incresedModifiers.Intelligence);
            return {
                ...state,
                attributes: increasedAttributes,
                modifiers: incresedModifiers,
                availableSkillPoints: increasedAvailableSkillPoints - Object.values(state.skills).reduce((sum, val) => sum + val, 0),
            };


        // attribute decrease
        case 'DECREMENT_ATTRIBUTE':
            const decreasedAttributes = {
                ...state.attributes,
                [action.payload]: state.attributes[action.payload] - 1,
            };
            const decreasedModifiers = {
                ...state.modifiers,
                [action.payload]: Math.floor((decreasedAttributes[action.payload] - 10) / 2),
            };
            const decreasedAvailableSkillPoints = calculateAvailableSkillPoints(decreasedModifiers.Intelligence);
            return {
                ...state,
                attributes: decreasedAttributes,
                modifiers: decreasedModifiers,
                availableSkillPoints: decreasedAvailableSkillPoints - Object.values(state.skills).reduce((sum, val) => sum + val, 0),
            };


        // skill increase
        case 'INCREMENT_SKILL': {
            if (state.availableSkillPoints <= 0) {
                alert("No available skill points left.");
                return state;
            }
            const newSkills = {
                ...state.skills,
                [action.payload]: state.skills[action.payload] + 1,
            };
            return {
                ...state,
                skills: newSkills,
                availableSkillPoints: state.availableSkillPoints - 1,
            };
        }


        // skill decrease
        case 'DECREMENT_SKILL': {
            if (state.skills[action.payload] <= 0) {
                return state;
            }
            const newSkills = {
                ...state.skills,
                [action.payload]: state.skills[action.payload] - 1,
            };
            return {
                ...state,
                skills: newSkills,
                availableSkillPoints: state.availableSkillPoints + 1,
            };
        }


        // check skills status
        case 'CHECK_SKILL': {
            const { selectedSkill, dc } = action.payload;
            const randomRoll = Math.floor(Math.random() * 20) + 1;
            const skillModifier = state.modifiers[SKILL_LIST.find(skill => skill.name === selectedSkill).attributeModifier];
            const skillTotal = state.skills[selectedSkill] + skillModifier;
            const total = skillTotal + randomRoll;
            const isSuccess = total >= dc;

            return {
                ...state,
                skillCheckResult: {
                    selectedSkill,
                    dc,
                    rollResult: randomRoll,
                    skillTotal,
                    total,
                    isSuccess,
                },
            };
        }


        // reset all
        case 'RESET_ALL': {
            return {
                attributes: initialAttributes,
                modifiers: initialModifiers,
                skills: initialSkills,
                availableSkillPoints: initialAvailableSkillPoints,
                skillCheckResult: [],
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
                attributes: state.attributes,
                modifiers: state.modifiers,
                skills: state.skills,
                availableSkillPoints: state.availableSkillPoints,
                skillCheckResult: state.skillCheckResult,
                dispatch,
            }}
        >
            {children}
        </AttributesContext.Provider>
    );
};

export const useAttributes = () => useContext(AttributesContext);

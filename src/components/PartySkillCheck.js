import React, { useState } from 'react';
import { SKILL_LIST } from '../consts';
import { useAttributes } from '../AttributesContext';

function PartySkillCheck({ setSelectedCharacterIndex  }) {
    const { characters, dispatch } = useAttributes();
    const [selectedSkill, setSelectedSkill] = useState(SKILL_LIST[0].name);
    const [dc, setDc] = useState(20);

    // roll function and result pass
    const handleRoll = () => {
        let highestSkillTotal = -Infinity;
        let characterIndexWithHighestSkill = null;

        // find which character has highest skill
        characters.forEach((character, index) => {
            const skillModifier = character.modifiers[SKILL_LIST.find(skill => skill.name === selectedSkill).attributeModifier];
            const skillTotal = character.skills[selectedSkill] + skillModifier;

            if (skillTotal > highestSkillTotal) {
                highestSkillTotal = skillTotal;
                characterIndexWithHighestSkill = index;
            }
        });

        if (characterIndexWithHighestSkill !== null) {
            dispatch({
                type: 'CHECK_SKILL',
                payload: {
                    selectedSkill,
                    dc,
                },
                index: characterIndexWithHighestSkill,
            });
            setSelectedCharacterIndex(characterIndexWithHighestSkill);
        }
    };

    return (
        <div className="party-skill-check">
            <h3>Party Skill Check</h3>
            <div className="skill-check">
                <label>Skill:
                    <select value={selectedSkill} onChange={(e) => setSelectedSkill(e.target.value)}>
                        {SKILL_LIST.map((skill) => (
                            <option key={skill.name} value={skill.name}>
                                {skill.name}
                            </option>
                        ))}
                    </select>
                </label>

                <label>DC:
                    <input
                        type="number"
                        value={dc}
                        onChange={(e) => setDc(parseInt(e.target.value, 10))}
                    />
                </label>

                <button onClick={handleRoll}>Roll</button>
            </div>
        </div>
    );
}

export default PartySkillCheck;

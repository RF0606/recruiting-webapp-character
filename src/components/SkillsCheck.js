import React, { useState } from 'react';
import { SKILL_LIST } from '../consts';
import { useAttributes } from '../AttributesContext';

function CharacterCheck({ characterIndex }) {
  const { characters, dispatch } = useAttributes();
  const character = characters[characterIndex];
  const { skillCheckResult } = character;
  const [selectedSkill, setSelectedSkill] = useState(SKILL_LIST[0].name);
  const [dc, setDc] = useState(20);

  const handleRoll = () => {
    dispatch({
      type: 'CHECK_SKILL',
      payload: {
        selectedSkill,
        dc,
      },
      index: characterIndex,
    });
    console.log(skillCheckResult);
  };

  return (
    <div className="character-check">
      <h3>Character: {characterIndex}</h3>
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

export default CharacterCheck;

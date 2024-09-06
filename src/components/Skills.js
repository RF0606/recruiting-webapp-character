import React from 'react';
import { useAttributes } from '../AttributesContext';
import { SKILL_LIST } from '../consts';

function Skills() {
  const { skills, modifiers, availableSkillPoints, dispatch } = useAttributes();

  //handle increase
  const handleIncrement = (skillName) => {
    dispatch({ type: 'INCREMENT_SKILL', payload: skillName });
  };

  //handle decrease
  const handleDecrement = (skillName) => {
    dispatch({ type: 'DECREMENT_SKILL', payload: skillName });
  };

  return (
    <div className="skills">
      <h3>Skills</h3>
      <p>Available Skill Points: {availableSkillPoints}</p>
      {SKILL_LIST.map((skill) => (
        <div key={skill.name} className="skill-row">
          <span>
            {skill.name}: {skills[skill.name]}
            (modifier {skill.attributeModifier}): {modifiers[skill.attributeModifier]}
            <button onClick={() => handleIncrement(skill.name)}>+</button>
            <button onClick={() => handleDecrement(skill.name)}>-</button>
            total: {skills[skill.name] + modifiers[skill.attributeModifier]}
          </span>
        </div>
      ))}
    </div>
  );
}

export default Skills;



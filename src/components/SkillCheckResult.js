import React from 'react';
import { useAttributes } from '../AttributesContext';


function SkillCheckResults() {
    const { skillCheckResult } = useAttributes();
    const { selectedSkill, dc, rollResult, skillTotal } = skillCheckResult;

    return (
        <div className="skill-check-results">
            <h2>Skill Check Results</h2>
            <div className="character-result">
                <p>Character: 1</p>
                <p>Skill: {selectedSkill} : {skillTotal}</p>
                <p>You Rolled: {rollResult}</p>
                <p>The DC was: {dc}</p>
                <p>Result: {skillCheckResult.isSuccess ? 'Success' : 'Failure'}</p>
            </div>
        </div>
    );
}

export default SkillCheckResults;

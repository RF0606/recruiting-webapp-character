import React, { useEffect }  from 'react';
import { useAttributes } from '../AttributesContext';


function SkillCheckResults({ characterIndex }) {
    const { characters } = useAttributes();
    const { skillCheckResult } = characters[characterIndex];
    const { selectedSkill, dc, rollResult, skillTotal } = skillCheckResult;

    useEffect(() => {
        // console.log('SkillCheckResults: characterIndex or characters changed', characterIndex, characters);
    }, [characterIndex, characters]);

    // check if characters valid
    if (characterIndex === null || !characters[characterIndex]) {
        return (
            <div className="skill-check-results">
                <h2>Skill Check Results</h2>
                <p>No skill check results available.</p>
            </div>
        );
    }

    // if skillCheckResult is null or undefined, give a defult
    if (!skillCheckResult || Object.keys(skillCheckResult).length === 0) {
        return (
            <div className="skill-check-results">
                <h2>Skill Check Results</h2>
                <p>No skill check results available for this character.</p>
            </div>
        );
    }

    return (
        <div className="skill-check-results">
            <h2>Skill Check Results</h2>
            <div className="character-result">
                <p>Character: {characterIndex}</p>
                <p>Skill: {selectedSkill} : {skillTotal}</p>
                <p>You Rolled: {rollResult}</p>
                <p>The DC was: {dc}</p>
                <p>Result: {skillCheckResult.isSuccess ? 'Success' : 'Failure'}</p>
            </div>
        </div>
    );
}

export default SkillCheckResults;

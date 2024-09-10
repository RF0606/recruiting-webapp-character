import React from 'react';
import { useAttributes } from '../AttributesContext';


function SkillCheckResults({ characterIndex }) {
    const { characters } = useAttributes();
    const { skillCheckResult } = characters[characterIndex];
    const { selectedSkill, dc, rollResult, skillTotal } = skillCheckResult;

    // 检查 characters 是否有效，以及是否存在指定索引的角色
    if (characterIndex === null || !characters[characterIndex]) {
        return (
            <div className="skill-check-results">
                <h2>Skill Check Results</h2>
                <p>No skill check results available.</p>
            </div>
        );
    }

    // 如果 skillCheckResult 为空或未定义，提供一个默认值
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

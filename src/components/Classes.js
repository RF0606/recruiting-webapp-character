import React, { useState } from 'react';
import { CLASS_LIST } from '../consts';
import { useAttributes } from '../AttributesContext';

function Classes({ characterIndex }) {
  const { characters } = useAttributes();
  const character = characters[characterIndex];
  const { attributes } = character;
  const [selectedClass, setSelectedClass] = useState(null);

  // check if meet requirements
  const meetsRequirements = (className) => {
    const classRequirements = CLASS_LIST[className];
    return Object.keys(classRequirements).every(attr =>
      attributes[attr] >= classRequirements[attr]
    );
  };

  // handle click to display the requirement of roles
  const handleClassClick = (className) => {
    setSelectedClass(className);
  };

  // handle click to close the requirement details
  const handleCloseClick = () => {
    setSelectedClass(null);
    console.log('Close button clicked, selectedClass set to null');
  };

  return (
    <div className="classes">
      <h3>Classes</h3>
      {Object.keys(CLASS_LIST).map((className) => (
        <p
          key={className}
          style={{ color: meetsRequirements(className) ? 'red' : 'inherit', cursor: 'pointer' }}
          onClick={() => handleClassClick(className)}
        >
          {className}
        </p>
      ))}

      {/* show minimum requirement if selected */}
      {selectedClass && (
        <div className="class-requirements">
          <h4>{selectedClass} Minimum Requirements:</h4>
          <ul>
            {Object.entries(CLASS_LIST[selectedClass]).map(([attr, value]) => (
              <li key={attr}>{attr}: {value}</li>
            ))}
          </ul>
          <button onClick={() => handleCloseClick()}>close</button>
        </div>
      )}

    </div>
  );
}

export default Classes;

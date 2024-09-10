import React from 'react';
import { useAttributes } from '../AttributesContext';

function Attributes({ characterIndex }) {
  const { characters, dispatch } = useAttributes();
  const character = characters[characterIndex];
  const { attributes, modifiers } = character;
  const totalAttributes = Object.values(attributes).reduce((sum, value) => sum + value, 0);

  // increase attributes
  const handleIncrement = (attr) => {
    if (totalAttributes >= 70) {
      alert("Total attributes cannot exceed 70.");
    } else {
      dispatch({ type: 'INCREMENT_ATTRIBUTE', payload: attr, index: characterIndex });
      console.log(character);
    }
  };

  // decrease attributes
  const handleDecrement = (attr) => {
    dispatch({ type: 'DECREMENT_ATTRIBUTE', payload: attr, index: characterIndex });
  };


  return (
    <div className="attributes">
      <h3>Attributes</h3>
      {Object.keys(attributes).map((attr) => (
        <div key={attr} className="attribute-row">
          <span>{attr}: {attributes[attr]} (Modifier: {modifiers[attr]})</span>
          <button onClick={() => handleIncrement(attr)}>+</button>
          <button onClick={() => handleDecrement(attr)}>-</button>
        </div>
      ))}
    </div>
  );
}

export default Attributes;

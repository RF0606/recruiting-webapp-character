import React from 'react';
import axios from 'axios';
import { useAttributes } from '../AttributesContext';

function Controls() {
  const { characters, dispatch } = useAttributes();
  const githubUsername = 'RF0606';

  // add new character
  const handleAddNewCharacter = () => {
    dispatch({ type: 'ADD_NEW_CHARACTER' });
  };

  // reset all function
  const handleResetAll = () => {
    dispatch({ type: 'RESET_ALL' });
  };

  // Save the character(s) to an API 
  const handleSaveAll = async () => {

    // 确保 characters 被正确初始化
    if (!characters || characters.length === 0) {
      alert("No characters to save.");
      return;
    }

    const payload = characters.map(character => ({
      attributes: character.attributes,
      modifiers: character.modifiers,
      skills: character.skills,
    }));

    try {
      const response = await axios.post(`https://recruiting.verylongdomaintotestwith.ca/api/${githubUsername}/character`, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        alert('Characters saved successfully!');
      } else {
        alert('Failed to save characters.');
      }
    } catch (error) {
      console.error('Error saving characters:', error);
      alert('An error occurred while saving characters.');
    }
  };

  return (
    <div className="controls">
      <button onClick={handleAddNewCharacter}>Add New Character</button>
      <button onClick={handleResetAll}>Reset All Characters</button>
      <button onClick={handleSaveAll}>Save All Characters</button>
    </div>
  );
}

export default Controls;

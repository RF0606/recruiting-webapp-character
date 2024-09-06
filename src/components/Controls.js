import React from 'react';
import axios from 'axios';
import { useAttributes } from '../AttributesContext';

function Controls() {
  const { attributes, modifiers, skills, dispatch } = useAttributes();
  const githubUsername = 'RF0606';

  // reset all function
  const handleResetAll = () => {
    dispatch({ type: 'RESET_ALL' });
  };

  // Save the character(s) to an API 
  const handleSaveAll = async () => {
    const payload = {
      attributes,
      modifiers,
      skills,
    };

    try {
      const response = await axios.post(`https://recruiting.verylongdomaintotestwith.ca/api/${githubUsername}/character`, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log(response);
      console.log(payload);

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
      <button>Add New Character</button>
      <button onClick={handleResetAll}>Reset All Characters</button>
      <button onClick={handleSaveAll}>Save All Characters</button>
    </div>
  );
}

export default Controls;

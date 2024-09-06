import React, { useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { useAttributes } from './AttributesContext.js';

import Controls from './components/Controls.js';
import SkillCheckResults from './components/SkillCheckResult.js'
import SkillsCheck from './components/SkillsCheck.js'
import Attributes from './components/Attributes.js'
import Classes from './components/Classes.js'
import Skills from './components/Skills.js'


function App() {
  const { dispatch } = useAttributes();
  const githubUsername = 'RF0606';

  useEffect(() => {
    //fetch data
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://recruiting.verylongdomaintotestwith.ca/api/${githubUsername}/character`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 200) {
          // update states
          dispatch({ type: 'LOAD_CHARACTER_DATA', payload: response.data });
        } else {
          console.error('Failed to load character data.');
        }
      } catch (error) {
        console.error('Error loading character data:', error);
      }
    };

    fetchData();
  }, [dispatch, githubUsername]);


  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise - Peter Fang</h1>
      </header>

      <section className="App-section">
        <Controls />
        <SkillCheckResults />
        
        <div className="character">
          <div className='character-checks'>
            <SkillsCheck />
          </div>

          <div className="character-details">
            <Attributes />
            <Classes />
            <Skills />
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;

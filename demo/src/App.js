import React, { useState } from 'react';
import { Counter as UseStateCounter } from './lab/01-useState';
import { TitleUpdater } from './lab/02-useEffect';
import { ThemeApp } from './lab/03-useContext';
import { Counter as UseReducerCounter } from './lab/04-useReducer';
import { CounterWithCallback } from './lab/05-useCallback';
import { Calculator } from './lab/06-useMemo';
import { FocusInput } from './lab/07-useRef';
import { ToggleExample } from './lab/08-customHooks';

function App() {
  const [activeTab, setActiveTab] = useState('useState');

  const tabs = [
    { id: 'useState', name: 'useState', component: <UseStateCounter /> },
    { id: 'useEffect', name: 'useEffect', component: <TitleUpdater /> },
    { id: 'useContext', name: 'useContext', component: <ThemeApp /> },
    { id: 'useReducer', name: 'useReducer', component: <UseReducerCounter /> },
    { id: 'useCallback', name: 'useCallback', component: <CounterWithCallback /> },
    { id: 'useMemo', name: 'useMemo', component: <Calculator /> },
    { id: 'useRef', name: 'useRef', component: <FocusInput /> },
    { id: 'customHook', name: 'Custom Hook', component: <ToggleExample /> }
  ];

  const activeComponent = tabs.find(tab => tab.id === activeTab)?.component;

  return (
    <div style={{ fontFamily: 'Arial' }}>
      <div style={{ display: 'flex' }}>
        <nav style={{ width: '200px', background: '#f5f5f5', padding: '20px', minHeight: '100vh' }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'block',
                width: '100%',
                padding: '10px',
                margin: '5px 0',
                border: 'none',
                background: activeTab === tab.id ? '#007bff' : 'white',
                color: activeTab === tab.id ? 'white' : 'black',
                cursor: 'pointer',
                borderRadius: '5px'
              }}
            >
              {tab.name}
            </button>
          ))}
        </nav>

        <main style={{ flex: 1, padding: '40px' }}>
          {activeComponent}
        </main>
      </div>
    </div>
  );
}

export default App;
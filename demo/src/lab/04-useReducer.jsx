import React, { useReducer } from 'react';

const ACTIONS = {
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT',
  RESET: 'RESET',
  INCREMENT_BY: 'INCREMENT_BY',
  DECREMENT_BY: 'DECREMENT_BY',
};

const actionCreators = {
  increment: () => ({ type: ACTIONS.INCREMENT }),
  decrement: () => ({ type: ACTIONS.DECREMENT }),
  reset: () => ({ type: ACTIONS.RESET }),
  incrementBy: (amount) => ({ type: ACTIONS.INCREMENT_BY, payload: amount }),
  decrementBy: (amount) => ({ type: ACTIONS.DECREMENT_BY, payload: amount }),
};

const initialState = {
  count: 0,
  history: [],
};

function counterReducer(state, action) {
  switch (action.type) {
    case ACTIONS.INCREMENT:
      return {
        ...state,
        count: state.count + 1,
        history: [...state.history, 'incremented'],
      };
      
    case ACTIONS.DECREMENT:
      return {
        ...state,
        count: state.count - 1,
        history: [...state.history, 'decremented'],
      };
      
    case ACTIONS.INCREMENT_BY:
      return {
        ...state,
        count: state.count + action.payload,
        history: [...state.history, `incremented by ${action.payload}`],
      };
      
    case ACTIONS.DECREMENT_BY:
      return {
        ...state,
        count: state.count - action.payload,
        history: [...state.history, `decremented by ${action.payload}`],
      };
      
    case ACTIONS.RESET:
      return {
        ...initialState,
        history: [...state.history, 'reset'],
      };
      
    default:
      console.warn(`Unknown action type: ${action.type}`);
      return state;
  }
}

export function Counter() {
  const [state, dispatch] = useReducer(counterReducer, initialState);
  
  const handleIncrement = () => dispatch(actionCreators.increment());
  const handleDecrement = () => dispatch(actionCreators.decrement());
  const handleReset = () => dispatch(actionCreators.reset());
  const handleIncrementBy = (amount) => dispatch(actionCreators.incrementBy(amount));
  
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>useReducer</h2>
      
      <div style={{ fontSize: '24px', margin: '20px 0' }}>
        Count: <strong>{state.count}</strong>
      </div>
      
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button onClick={handleIncrement}>+ 1</button>
        <button onClick={handleDecrement}>- 1</button>
        <button onClick={() => handleIncrementBy(5)}>+ 5</button>
        <button onClick={handleReset}>Reset</button>
      </div>
      
      <div>
        <h3>History:</h3>
        <ul>
          {state.history.slice(-5).map((action, index) => (
            <li key={index}>{action}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
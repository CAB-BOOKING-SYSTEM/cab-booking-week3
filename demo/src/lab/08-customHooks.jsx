import React, { useState } from 'react';

// Custom hook
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);
  
  const toggle = () => {
    setValue(!value);
  };
  
  return [value, toggle];
}

export function ToggleExample() {
  const [isOn, toggle] = useToggle(false);
  
  return (
    <div>
      <h2>Custom Hook - useToggle</h2>
      <p>Trạng thái: {isOn ? 'BẬT' : 'TẮT'}</p>
      <button onClick={toggle}>
        {isOn ? 'Tắt' : 'Bật'}
      </button>
    </div>
  );
}
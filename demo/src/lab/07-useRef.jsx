import React, { useRef } from 'react';

export function FocusInput() {
  const inputRef = useRef(null);
  
  return (
    <div>
      <h2>useRef - Focus Input</h2>
      <input ref={inputRef} type="text" placeholder="Nhập gì đó..." />
      <button onClick={() => inputRef.current.focus()}>
        Focus vào input
      </button>
    </div>
  );
}
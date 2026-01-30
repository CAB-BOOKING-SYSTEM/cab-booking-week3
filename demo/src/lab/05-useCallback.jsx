import React, { useState, useCallback, memo } from 'react';

const Button = memo(({ onClick, children }) => {
  console.log('Button rendered:', children);
  return <button onClick={onClick}>{children}</button>;
});

export function CounterWithCallback() {
  const [count, setCount] = useState(0);
  const [other, setOther] = useState(0);
  
  const handleClick = useCallback(() => {
    setCount(prev => prev + 1);
  }, []);
  
  return (
    <div>
      <h2>useCallback - Prevent Re-render</h2>
      <p>Count: {count}</p>
      <p>Other: {other}</p>
      <Button onClick={handleClick}>Tăng count</Button>
      <button onClick={() => setOther(other + 1)}>Tăng other</button>
      <p>Mở console xem Button có render lại không</p>
    </div>
  );
}
import React, { useState, useEffect } from 'react';

export function TitleUpdater() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    document.title = `Bạn đã click ${count} lần`;
  }, [count]);
  
  return (
    <div>
      <h2>useEffect - Update Title</h2>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
      <p>Xem title trên tab browser!</p>
    </div>
  );
}
import React, { useState, useMemo } from 'react';

export function Calculator() {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState([1, 2, 3, 4, 5]);
  
  const sum = useMemo(() => {
    console.log('Tính tổng...');
    return items.reduce((acc, item) => acc + item, 0);
  }, [items]);
  
  return (
    <div>
      <h2>useMemo - Expensive Calculation</h2>
      <p>Count: {count}</p>
      <p>Tổng: {sum}</p>
      <button onClick={() => setCount(count + 1)}>Tăng count (không tính lại tổng)</button>
      <button onClick={() => setItems([...items, items.length + 1])}>Thêm số (tính lại tổng)</button>
      <p>Mở console để xem</p>
    </div>
  );
}
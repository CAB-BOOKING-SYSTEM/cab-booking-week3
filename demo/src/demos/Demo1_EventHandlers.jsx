import React, { useState, useCallback } from 'react';

export default function Demo1_EventHandlers() {
  const [clicks, setClicks] = useState({
    funcDecl: 0,
    arrowVar: 0,
    inlineArrow: 0,
    useCallbackFn: 0
  });
  
  const [renderCount, setRenderCount] = useState(0);

  // 1. Function Declaration
  function handleFuncDecl() {
    console.log('🔵 Function Declaration được gọi');
    console.log('Value tại thời điểm gọi:', clicks.funcDecl);
    setClicks(prev => ({ ...prev, funcDecl: prev.funcDecl + 1 }));
  }

  // 2. Arrow Function Variable
  const handleArrowVar = () => {
    console.log('🟢 Arrow Function Variable được gọi');
    console.log('Value tại thời điểm gọi:', clicks.arrowVar);
    setClicks(prev => ({ ...prev, arrowVar: prev.arrowVar + 1 }));
  };

  // 3. useCallback (Performance optimized)
  const handleUseCallback = useCallback(() => {
    console.log('🟡 useCallback được gọi');
    console.log('Value tại thời điểm gọi:', clicks.useCallbackFn);
    setClicks(prev => ({ ...prev, useCallbackFn: prev.useCallbackFn + 1 }));
  }, [clicks.useCallbackFn]);

  // Force re-render để demo
  const forceReRender = () => {
    console.log('\n=== FORCE RE-RENDER ===');
    setRenderCount(prev => prev + 1);
  };

  console.log(`🔄 Demo 1 đã render lần thứ ${renderCount + 1}`);

  return (
    <div>
      <div className="explanation-box">
        <h3>🎯 Mục tiêu demo:</h3>
        <p>So sánh 4 cách khai báo event handlers và tác động đến performance</p>
        
        <h4>📋 HƯỚNG DẪN THỰC THI:</h4>
        <ol>
          <li>Mở Console trong Developer Tools (F12)</li>
          <li>Click từng nút và quan sát log trong console</li>
          <li>Click "Force Re-render" nhiều lần</li>
          <li>Quan sát số lần render trong console</li>
          <li>Nhận xét sự khác biệt giữa các cách khai báo</li>
        </ol>
      </div>

      <div className="comparison-grid">
        {/* CARD 1: Function Declaration */}
        <div className="demo-card">
          <h3>1. Function Declaration</h3>
          <div className="code-block">
            {`function handleClick() {
  console.log('Clicked');
  setCount(count + 1);
}

<button onClick={handleClick}>`}
          </div>
          <button 
            className="btn btn-primary"
            onClick={handleFuncDecl}
          >
            Click me ({clicks.funcDecl} clicks)
          </button>
          <p><strong>Đặc điểm:</strong> Hoisted, tạo lại mỗi lần render</p>
          <p><strong>Console sẽ hiển thị:</strong> "Function Declaration được gọi"</p>
        </div>

        {/* CARD 2: Arrow Function Variable */}
        <div className="demo-card">
          <h3>2. Arrow Function Variable</h3>
          <div className="code-block">
            {`const handleClick = () => {
  console.log('Clicked');
  setCount(count + 1);
};

<button onClick={handleClick}>`}
          </div>
          <button 
            className="btn btn-success"
            onClick={handleArrowVar}
          >
            Click me ({clicks.arrowVar} clicks)
          </button>
          <p><strong>Đặc điểm:</strong> Không hoisted, tạo lại mỗi render</p>
          <p><strong>Console sẽ hiển thị:</strong> "Arrow Function Variable được gọi"</p>
        </div>

        {/* CARD 3: Inline Arrow Function */}
        <div className="demo-card">
          <h3>3. Inline Arrow Function</h3>
          <div className="code-block">
            {`<button onClick={() => {
  console.log('Clicked');
  setCount(count + 1);
}}>`}
          </div>
          <button 
            className="btn btn-warning"
            onClick={() => {
              console.log('🟠 Inline Arrow Function được gọi');
              console.log('Value tại thời điểm gọi:', clicks.inlineArrow);
              setClicks(prev => ({ ...prev, inlineArrow: prev.inlineArrow + 1 }));
            }}
          >
            Click me ({clicks.inlineArrow} clicks)
          </button>
          <p><strong>Đặc điểm:</strong> Tạo hàm MỚI mỗi lần render</p>
          <p><strong>Console sẽ hiển thị:</strong> "Inline Arrow Function được gọi"</p>
        </div>

        {/* CARD 4: useCallback */}
        <div className="demo-card">
          <h3>4. useCallback (Optimized)</h3>
          <div className="code-block">
            {`const handleClick = useCallback(() => {
  console.log('Clicked');
  setCount(count + 1);
}, [count]);

<button onClick={handleClick}>`}
          </div>
          <button 
            className="btn btn-danger"
            onClick={handleUseCallback}
          >
            Click me ({clicks.useCallbackFn} clicks)
          </button>
          <p><strong>Đặc điểm:</strong> Giữ reference ổn định</p>
          <p><strong>Console sẽ hiển thị:</strong> "useCallback được gọi"</p>
        </div>
      </div>

      <div className="button-group">
        <button className="btn btn-primary" onClick={forceReRender}>
          🔄 Force Re-render (Đã render: {renderCount + 1} lần)
        </button>
      </div>

      <div className="log-container">
        <h4>📊 Console Log Summary:</h4>
        <div className="log-entry">
          Mỗi lần render: "Demo 1 đã render lần thứ X"
        </div>
        <div className="log-entry">
          Click Function Declaration: "Function Declaration được gọi"
        </div>
        <div className="log-entry">
          Click Arrow Variable: "Arrow Function Variable được gọi"
        </div>
        <div className="log-entry">
          Click Inline: "Inline Arrow Function được gọi"
        </div>
        <div className="log-entry">
          Click useCallback: "useCallback được gọi"
        </div>
      </div>

      <div className="explanation-box">
        <h4>🔬 KẾT LUẬN SAU KHI THỰC THI:</h4>
        <ul>
          <li><strong>Function Declaration & Arrow Variable:</strong> Tương tự nhau, đều tạo lại hàm khi render</li>
          <li><strong>Inline Arrow Function:</strong> Tạo hàm MỚI mỗi lần render → performance kém với list lớn</li>
          <li><strong>useCallback:</strong> Tối ưu performance, giữ reference ổn định cho child components</li>
          <li><strong>Force Re-render:</strong> Chứng minh component re-render khi state thay đổi</li>
        </ul>
      </div>
    </div>
  );
}
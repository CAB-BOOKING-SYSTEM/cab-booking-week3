import React, { useState } from 'react';
import './App.css';  // ✅ THÊM IMPORT CSS

// Import các demo - ĐIỀU CHỈNH ĐƯỜNG DẪN THEO FILE THỰC TẾ
import Demo1_EventHandlers from './demos/Demo1_EventHandlers.jsx';
import Demo2_ContextParameters from './demos/Demo2_ContextParameters.jsx';
import Demo3_SyntheticEvents from './demos/Demo3_SyntheticEvents.jsx';
import Demo4_RenderCommit from './demos/Demo4_RenderCommit.jsx';
import Demo5_StateSnapshot from './demos/Demo5_StateSnapshot.jsx';
import Demo6_ReusableComponents from './demos/Demo6_ReusableComponents.jsx';

function App() {
  const [activeDemo, setActiveDemo] = useState(1);
  
  const demos = [
    { 
      id: 1, 
      title: '1️⃣ Event Handlers', 
      desc: 'Cách khai báo & Performance',
      component: <Demo1_EventHandlers />
    },
    { 
      id: 2, 
      title: '2️⃣ Context & Params', 
      desc: 'Truyền tham số & "this"',
      component: <Demo2_ContextParameters />
    },
    { 
      id: 3, 
      title: '3️⃣ Synthetic Events', 
      desc: 'Event Pooling & Methods',
      component: <Demo3_SyntheticEvents />
    },
    { 
      id: 4, 
      title: '4️⃣ Render & Commit', 
      desc: 'Quá trình render component',
      component: <Demo4_RenderCommit />
    },
    { 
      id: 5, 
      title: '5️⃣ State as Snapshot', 
      desc: 'State hoạt động như snapshot',
      component: <Demo5_StateSnapshot />
    },
    { 
      id: 6, 
      title: '6️⃣ Reusable Components', 
      desc: 'Pattern tái sử dụng',
      component: <Demo6_ReusableComponents />
    },
  ];

  // Tìm demo đang active
  const activeDemoData = demos.find(demo => demo.id === activeDemo);
  
  return (
    <div className="app">
      <header className="app-header">
        <h1>🎯 React Events & Rendering Demos</h1>
        <p>Interactive demonstrations - Mở Console (F12) để xem log chi tiết</p>
      </header>

      <nav className="demo-nav">
        {demos.map(demo => (
          <button
            key={demo.id}
            className={`nav-btn ${activeDemo === demo.id ? 'active' : ''}`}
            onClick={() => setActiveDemo(demo.id)}
          >
            <div className="nav-btn-title">{demo.title}</div>
            <div className="nav-btn-desc">{demo.desc}</div>
          </button>
        ))}
      </nav>

      <main className="demo-container">
        <div className="demo-header">
          <h2>{activeDemoData?.title || 'Demo'}</h2>
          <p className="demo-instructions">
            <strong>📋 Hướng dẫn thực thi:</strong> Xem phần hướng dẫn bên dưới mỗi demo
          </p>
        </div>
        
        <div className="demo-content">
          {activeDemoData?.component || <div>Demo not found</div>}
        </div>
        
        <div className="console-note">
          ⚠️ <strong>LUÔN MỞ CONSOLE (F12)</strong> để xem log chi tiết khi thao tác
        </div>
      </main>
    </div>
  );
}

export default App;
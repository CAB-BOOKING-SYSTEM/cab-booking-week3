import React, { useState } from 'react';

export default function Demo3_SyntheticEvents() {
  const [logs, setLogs] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [formData, setFormData] = useState({ username: '', email: '' });

  const addLog = (message, type = 'info') => {
    console.log(`[${type}] ${message}`);
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev.slice(-8), { message, type, timestamp }]);
  };

  // Demo 1: Event Pooling Issue
  const handleEventPooling = (e) => {
    addLog('=== EVENT POOLING DEMO STARTED ===', 'event');
    addLog(`Event type: ${e.type}, Target: ${e.target.tagName}`, 'event');
    
    // VẤN ĐỀ: Event object bị pool
    addLog('⚠️ Trying to access event after 1 second...', 'warning');
    
    setTimeout(() => {
      addLog(`❌ After 1s - Event type: ${e.type}`, 'error');
      addLog('=> Event properties may be null/undefined!', 'error');
    }, 1000);
    
    // GIẢI PHÁP 1: e.persist()
    e.persist();
    setTimeout(() => {
      addLog(`✅ With e.persist() - Event type: ${e.type}`, 'success');
    }, 2000);
    
    // GIẢI PHÁP 2: Save values
    const savedType = e.type;
    const savedTarget = e.target.tagName;
    setTimeout(() => {
      addLog(`✅ With saved values - Type: ${savedType}, Target: ${savedTarget}`, 'success');
    }, 3000);
  };

  // Demo 2: Event Methods
  const handleFormSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    addLog('=== FORM SUBMITTED ===', 'event');
    addLog(`Form data: ${JSON.stringify(formData)}`, 'event');
    addLog('e.preventDefault() called - form không submit', 'info');
    addLog('e.stopPropagation() called - event không bubble', 'info');
    
    // Truy cập form data
    const formElements = e.target.elements;
    addLog(`Number of form elements: ${formElements.length}`, 'info');
  };

  // Demo 3: Mouse Events
  const handleMouseMove = (e) => {
    const x = e.clientX;
    const y = e.clientY;
    setMousePosition({ x, y });
    
    // Synthetic event properties
    addLog(`🖱️ Mouse: ${x}, ${y}`, 'mouse');
    addLog(`Screen: ${e.screenX}, ${e.screenY}`, 'mouse');
    addLog(`Page: ${e.pageX}, ${e.pageY}`, 'mouse');
    addLog(`Buttons: ${e.buttons}`, 'mouse');
  };

  // Demo 4: Keyboard Events
  const handleKeyEvents = (e) => {
    addLog(`⌨️ Key: ${e.key} (Code: ${e.code})`, 'keyboard');
    addLog(`Ctrl: ${e.ctrlKey}, Alt: ${e.altKey}, Shift: ${e.shiftKey}`, 'keyboard');
    
    if (e.key === 'Enter') {
      addLog('✅ Enter key pressed!', 'success');
    }
    
    if (e.ctrlKey && e.key === 's') {
      e.preventDefault();
      addLog('🛑 Ctrl+S prevented (save shortcut)', 'warning');
    }
  };

  // Demo 5: Event Bubbling/Capturing
  const handleBubble = (e, element) => {
    addLog(`🫧 ${element} clicked (Phase: ${e.eventPhase})`, 'bubble');
    
    if (element === 'Inner Div') {
      // e.stopPropagation(); // Uncomment để test
    }
  };

  const clearLogs = () => {
    setLogs([]);
    addLog('=== LOGS CLEARED ===', 'info');
  };

  return (
    <div>
      <div className="explanation-box">
        <h3>🎯 Mục tiêu demo:</h3>
        <p>Hiểu Synthetic Events, Event Pooling, và các phương thức của event object</p>
        
        <h4>📋 HƯỚNG DẪN THỰC THI:</h4>
        <ol>
          <li>Click "Test Event Pooling" và quan sát console trong 3 giây</li>
          <li>Di chuột trong vùng màu xám để xem mouse events</li>
          <li>Nhấn phím trong input để xem keyboard events</li>
          <li>Submit form và xem event methods</li>
          <li>Click vào các div lồng nhau để xem event bubbling</li>
        </ol>
      </div>

      <div className="comparison-grid">
        {/* Demo 1: Event Pooling */}
        <div className="demo-card">
          <h3>1. Event Pooling Issue</h3>
          <div className="code-block">
{`// PROBLEM: Event object is pooled
setTimeout(() => {
  console.log(e.type); // ❌ May be null
}, 1000);

// SOLUTION: e.persist()
e.persist();
setTimeout(() => {
  console.log(e.type); // ✅ Preserved
}, 1000);`}
          </div>
          <button 
            className="btn btn-danger"
            onClick={handleEventPooling}
          >
            🔥 Test Event Pooling
          </button>
          <p><strong>Thao tác:</strong> Click và quan sát console trong 3 giây</p>
          <p><strong>Kết quả mong đợi:</strong> e.type sẽ undefined sau 1s (nếu không persist)</p>
        </div>

        {/* Demo 2: Form Events */}
        <div className="demo-card">
          <h3>2. Form Event Methods</h3>
          <form onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label>Username:</label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                placeholder="Enter username"
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="Enter email"
              />
            </div>
            <button type="submit" className="btn btn-success">
              📝 Submit Form (preventDefault)
            </button>
          </form>
          <p><strong>Thao tác:</strong> Nhập data và submit</p>
          <p><strong>Chú ý:</strong> Form không reload trang</p>
        </div>

        {/* Demo 3: Mouse Events */}
        <div className="demo-card">
          <h3>3. Mouse Events</h3>
          <div 
            style={{
              height: '150px',
              background: '#f0f0f0',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'crosshair',
              border: '2px dashed #ccc'
            }}
            onMouseMove={handleMouseMove}
            onClick={(e) => addLog(`🎯 Click at: ${e.clientX}, ${e.clientY}`, 'mouse')}
            onDoubleClick={(e) => addLog('🎯 Double click!', 'mouse')}
            onContextMenu={(e) => {
              e.preventDefault();
              addLog('🎯 Right click (context menu prevented)', 'mouse');
            }}
          >
            <div style={{textAlign: 'center'}}>
              <p>🖱️ Di chuột trong vùng này</p>
              <p>Position: {mousePosition.x}, {mousePosition.y}</p>
              <p>Click, Double-click, Right-click</p>
            </div>
          </div>
          <p><strong>Thao tác:</strong> Di chuột, click trong vùng xám</p>
        </div>

        {/* Demo 4: Keyboard Events */}
        <div className="demo-card">
          <h3>4. Keyboard Events</h3>
          <div className="form-group">
            <label>Try keyboard events:</label>
            <input
              type="text"
              placeholder="Nhập và nhấn phím..."
              onKeyDown={handleKeyEvents}
              onKeyUp={(e) => addLog(`⌨️ Key up: ${e.key}`, 'keyboard')}
              onKeyPress={(e) => addLog(`⌨️ Key press: ${e.key}`, 'keyboard')}
              style={{width: '100%'}}
            />
          </div>
          <div className="tips">
            <p><strong>Thử:</strong></p>
            <ul>
              <li>Nhấn Enter</li>
              <li>Ctrl+S (bị prevent)</li>
              <li>Shift, Alt, Ctrl với phím khác</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Demo 5: Event Bubbling */}
      <div className="demo-section">
        <h3>5. Event Bubbling & Capturing</h3>
        <div 
          style={{
            padding: '40px',
            background: '#e3f2fd',
            borderRadius: '10px',
            position: 'relative',
            border: '3px solid #2196F3'
          }}
          onClick={(e) => handleBubble(e, 'Outer Div')}
        >
          <strong>Outer Div (click me)</strong>
          <div 
            style={{
              padding: '30px',
              background: '#c8e6c9',
              marginTop: '20px',
              borderRadius: '8px',
              border: '3px solid #4CAF50'
            }}
            onClick={(e) => handleBubble(e, 'Middle Div')}
          >
            <strong>Middle Div (click me)</strong>
            <div 
              style={{
                padding: '20px',
                background: '#ffecb3',
                marginTop: '20px',
                borderRadius: '8px',
                border: '3px solid #FFC107'
              }}
              onClick={(e) => handleBubble(e, 'Inner Div')}
            >
              <strong>Inner Div (click me)</strong>
              <p>Click bất kỳ div nào → Event sẽ bubble lên</p>
              <button 
                className="btn btn-warning"
                onClick={(e) => {
                  e.stopPropagation();
                  addLog('🛑 Button click (propagation stopped)', 'bubble');
                }}
              >
                Stop Propagation
              </button>
            </div>
          </div>
        </div>
        <p><strong>Thao tác:</strong> Click các div từ trong ra ngoài</p>
        <p><strong>Quan sát:</strong> Event bubble từ trong ra ngoài (3 → 2 → 1)</p>
      </div>

      {/* Log Display */}
      <div className="demo-section">
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <h3>📊 Event Logs</h3>
          <button className="btn btn-primary" onClick={clearLogs}>
            🗑️ Clear Logs
          </button>
        </div>
        
        <div className="log-container">
          {logs.length === 0 ? (
            <div style={{textAlign: 'center', color: '#888', padding: '20px'}}>
              Chưa có log. Hãy thực hiện các thao tác bên trên!
            </div>
          ) : (
            logs.map((log, index) => (
              <div 
                key={index} 
                className="log-entry"
                style={{
                  borderLeftColor: 
                    log.type === 'error' ? '#f44336' :
                    log.type === 'success' ? '#4CAF50' :
                    log.type === 'warning' ? '#FF9800' :
                    log.type === 'event' ? '#2196F3' : '#9E9E9E'
                }}
              >
                <span style={{color: '#9E9E9E', fontSize: '0.8em'}}>
                  [{log.timestamp}]
                </span>{' '}
                {log.message}
              </div>
            ))
          )}
        </div>
      </div>

      <div className="explanation-box">
        <h4>🔬 KẾT LUẬN SAU KHI THỰC THI:</h4>
        <ul>
          <li><strong>Event Pooling:</strong> React tái sử dụng event objects → cần e.persist() hoặc lưu giá trị</li>
          <li><strong>Event Methods:</strong> preventDefault(), stopPropagation() hoạt động cross-browser</li>
          <li><strong>Synthetic Events:</strong> Wrapper của native events, nhất quán giữa browsers</li>
          <li><strong>Event Bubbling:</strong> Mặc định events bubble từ trong ra ngoài</li>
          <li><strong>Event Properties:</strong> clientX/Y, screenX/Y, key, ctrlKey, v.v.</li>
        </ul>
      </div>
    </div>
  );
}
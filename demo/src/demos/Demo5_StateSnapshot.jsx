import React, { useState } from 'react';

export default function Demo5_StateSnapshot() {
  const [count, setCount] = useState(0);
  const [executionLog, setExecutionLog] = useState([]);
  const [batchLog, setBatchLog] = useState([]);
  const [renderCount, setRenderCount] = useState(0);

  const addLog = (message, type = 'info') => {
    console.log(`[${type}] ${message}`);
    const timestamp = new Date().toLocaleTimeString();
    setExecutionLog(prev => [...prev.slice(-8), { 
      message, 
      type, 
      timestamp,
      countValue: count 
    }]);
  };

  const addBatchLog = (message) => {
    setBatchLog(prev => [...prev.slice(-6), message]);
  };

  // Demo 1: Multiple Updates Issue
  const handleMultipleUpdates = () => {
    addLog('=== START: Multiple Direct Updates ===', 'start');
    addLog(`📸 Current snapshot value: count = ${count}`, 'snapshot');
    
    // ❌ SAI: Multiple updates với cùng snapshot
    setCount(count + 1);
    addLog(`1. setCount(${count} + 1) → queue: ${count} + 1 = ${count + 1}`, 'update');
    
    setCount(count + 1);
    addLog(`2. setCount(${count} + 1) → queue: ${count} + 1 = ${count + 1}`, 'update');
    
    setCount(count + 1);
    addLog(`3. setCount(${count} + 1) → queue: ${count} + 1 = ${count + 1}`, 'update');
    
    addLog(`❌ Expected: +3, Actual: +1 (snapshot!)`, 'warning');
    addLog('=== END ===', 'end');
  };

  // Demo 2: Functional Updates
  const handleFunctionalUpdates = () => {
    addLog('=== START: Functional Updates ===', 'start');
    addLog(`📸 Current snapshot value: count = ${count}`, 'snapshot');
    
    // ✅ ĐÚNG: Functional updates
    setCount(prev => {
      const newValue = prev + 1;
      addLog(`1. setCount(prev => prev + 1) → ${prev} + 1 = ${newValue}`, 'update');
      return newValue;
    });
    
    setCount(prev => {
      const newValue = prev + 1;
      addLog(`2. setCount(prev => prev + 1) → ${prev} + 1 = ${newValue}`, 'update');
      return newValue;
    });
    
    setCount(prev => {
      const newValue = prev + 1;
      addLog(`3. setCount(prev => prev + 1) → ${prev} + 1 = ${newValue}`, 'update');
      return newValue;
    });
    
    addLog(`✅ Expected: +3, Actual: +3`, 'success');
    addLog('=== END ===', 'end');
  };

  // Demo 3: Async State Issue
  const handleAsyncIssue = () => {
    addLog('=== START: Async State Issue ===', 'start');
    const currentCount = count;
    addLog(`📸 Captured value for async: ${currentCount}`, 'snapshot');
    
    setTimeout(() => {
      // ❌ SAI: Stale closure - sử dụng giá trị cũ
      addLog(`⏰ After 2s - Using captured value: ${currentCount}`, 'async');
      setCount(currentCount + 1);
      addLog(`setCount(${currentCount} + 1) → May be stale!`, 'warning');
    }, 2000);
    
    addLog('=== Async function scheduled ===', 'end');
  };

  // Demo 4: Async Functional Update
  const handleAsyncFunctional = () => {
    addLog('=== START: Async Functional Update ===', 'start');
    
    setTimeout(() => {
      // ✅ ĐÚNG: Functional update trong async
      addLog(`⏰ After 2s - Using functional update`, 'async');
      setCount(prev => {
        const newValue = prev + 1;
        addLog(`setCount(prev => prev + 1) → ${prev} + 1 = ${newValue}`, 'update');
        return newValue;
      });
    }, 2000);
    
    addLog('=== Async functional update scheduled ===', 'end');
  };

  // Demo 5: Batched vs Non-batched
  const handleBatchedUpdates = () => {
    addBatchLog('=== BATCHED (in event handler) ===');
    addBatchLog(`Before: ${count}`);
    
    // Batched trong event handler
    setCount(c => c + 1);
    setCount(c => c + 1);
    setCount(c => c + 1);
    
    addBatchLog(`After (queued): ${count} → ${count + 3}`);
    addBatchLog('(3 updates, 1 render)');
  };

  const handleNonBatchedUpdates = () => {
    addBatchLog('=== NON-BATCHED (in setTimeout) ===');
    addBatchLog(`Before: ${count}`);
    
    // Non-batched trong setTimeout
    setTimeout(() => {
      addBatchLog('Timeout 1 executing...');
      setCount(c => c + 1);
    }, 0);
    
    setTimeout(() => {
      addBatchLog('Timeout 2 executing...');
      setCount(c => c + 1);
    }, 0);
    
    setTimeout(() => {
      addBatchLog('Timeout 3 executing...');
      setCount(c => c + 1);
    }, 0);
    
    addBatchLog(`After (immediate): ${count}`);
    addBatchLog('(3 updates, 3 renders)');
  };

  // Reset
  const resetDemo = () => {
    setCount(0);
    setExecutionLog([]);
    setBatchLog([]);
    setRenderCount(0);
    addLog('=== DEMO RESET ===', 'system');
  };

  // Theo dõi render
  React.useEffect(() => {
    setRenderCount(prev => prev + 1);
    addLog(`🔄 Component rendered (Render #${renderCount + 1})`, 'render');
  }, [count]);

  return (
    <div>
      <div className="explanation-box">
        <h3>🎯 Mục tiêu demo:</h3>
        <p>Hiểu State hoạt động như một Snapshot và cách cập nhật state chính xác</p>
        
        <h4>📋 HƯỚNG DẪN THỰC THI:</h4>
        <ol>
          <li>Click "Multiple Updates" - quan sát count chỉ tăng 1 (sai)</li>
          <li>Click "Functional Updates" - quan sát count tăng 3 (đúng)</li>
          <li>Click "Async Issue" - chờ 2s, quan sát stale value</li>
          <li>Click "Async Functional" - chờ 2s, quan sát correct update</li>
          <li>So sánh Batched vs Non-batched updates</li>
          <li>Quan sát render count mỗi lần state thay đổi</li>
        </ol>
      </div>

      {/* Current State Display */}
      <div className="visual-demo" style={{flexDirection: 'column', padding: '30px'}}>
        <h2 style={{marginBottom: '20px'}}>Current State</h2>
        <div style={{
          fontSize: '4rem',
          fontWeight: 'bold',
          marginBottom: '10px'
        }}>
          {count}
        </div>
        <div style={{
          background: 'rgba(255,255,255,0.2)',
          padding: '10px 20px',
          borderRadius: '20px',
          fontSize: '1.2rem'
        }}>
          Render Count: {renderCount} | Updates in queue: 0
        </div>
      </div>

      {/* Controls */}
      <div className="demo-section">
        <h3>State Update Demos</h3>
        <div className="button-group">
          <button className="btn btn-danger" onClick={handleMultipleUpdates}>
            ❌ Multiple Direct Updates
          </button>
          <button className="btn btn-success" onClick={handleFunctionalUpdates}>
            ✅ Functional Updates
          </button>
          <button className="btn btn-warning" onClick={handleAsyncIssue}>
            ⏰ Async Issue (Stale Closure)
          </button>
          <button className="btn btn-success" onClick={handleAsyncFunctional}>
            ⏰ Async Functional
          </button>
          <button className="btn btn-primary" onClick={handleBatchedUpdates}>
            🔄 Batched Updates
          </button>
          <button className="btn" onClick={handleNonBatchedUpdates} style={{background: '#FF9800', color: 'white'}}>
            🕒 Non-batched Updates
          </button>
          <button className="btn" onClick={resetDemo} style={{background: '#666', color: 'white'}}>
            🗑️ Reset
          </button>
        </div>
      </div>

      {/* Visual Snapshot Explanation */}
      <div className="demo-section">
        <h3>📸 State as Snapshot - Visual Explanation</h3>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px',
          background: '#f5f5f5',
          borderRadius: '10px',
          margin: '20px 0'
        }}>
          <div style={{textAlign: 'center'}}>
            <div style={{
              padding: '15px',
              background: '#4CAF50',
              color: 'white',
              borderRadius: '8px',
              minWidth: '150px'
            }}>
              <h4>Snapshot tại render</h4>
              <p style={{fontSize: '1.5rem', margin: '10px 0'}}>count = {count}</p>
              <p>Giá trị KHÔNG thay đổi</p>
            </div>
            <p style={{marginTop: '10px'}}>Render #{renderCount}</p>
          </div>
          
          <div style={{fontSize: '2rem', color: '#666'}}>→</div>
          
          <div style={{textAlign: 'center'}}>
            <div style={{
              padding: '15px',
              background: '#2196F3',
              color: 'white',
              borderRadius: '8px',
              minWidth: '150px'
            }}>
              <h4>Update Queue</h4>
              <div style={{
                background: 'rgba(255,255,255,0.2)',
                padding: '10px',
                borderRadius: '5px',
                margin: '10px 0',
                fontFamily: 'monospace'
              }}>
                setCount({count} + 1)<br/>
                setCount({count} + 1)<br/>
                setCount({count} + 1)
              </div>
              <p>Tất cả dùng cùng snapshot!</p>
            </div>
          </div>
          
          <div style={{fontSize: '2rem', color: '#666'}}>→</div>
          
          <div style={{textAlign: 'center'}}>
            <div style={{
              padding: '15px',
              background: '#FF9800',
              color: 'white',
              borderRadius: '8px',
              minWidth: '150px'
            }}>
              <h4>Kết quả</h4>
              <p style={{fontSize: '1.5rem', margin: '10px 0'}}>count = {count + 1}</p>
              <p>Chỉ +1 thay vì +3!</p>
            </div>
          </div>
        </div>
        
        <div className="explanation-box" style={{marginTop: '20px'}}>
          <h4>Giải thích trực quan:</h4>
          <p>Khi bạn gọi <code>setCount(count + 1)</code> 3 lần:</p>
          <ol>
            <li><strong>count</strong> là giá trị tại thời điểm render hiện tại (snapshot)</li>
            <li>Mỗi lần gọi đều dùng cùng giá trị <strong>{count}</strong></li>
            <li>React queue: <strong>{count} + 1</strong>, <strong>{count} + 1</strong>, <strong>{count} + 1</strong></li>
            <li>Tất cả đều tính ra <strong>{count + 1}</strong></li>
            <li>Kết quả: count chỉ tăng 1 đơn vị</li>
          </ol>
        </div>
      </div>

      {/* Execution Log */}
      <div className="demo-section">
        <h3>📊 Execution Log</h3>
        <div className="log-container">
          {executionLog.length === 0 ? (
            <div style={{textAlign: 'center', color: '#888', padding: '20px'}}>
              Chưa có log. Hãy thực hiện các thao tác bên trên!
            </div>
          ) : (
            executionLog.map((log, index) => (
              <div 
                key={index} 
                className="log-entry"
                style={{
                  borderLeftColor: 
                    log.type === 'warning' ? '#FF9800' :
                    log.type === 'success' ? '#4CAF50' :
                    log.type === 'error' ? '#f44336' :
                    log.type === 'start' ? '#2196F3' :
                    log.type === 'end' ? '#9C27B0' :
                    log.type === 'render' ? '#9E9E9E' :
                    log.type === 'snapshot' ? '#FF5722' :
                    log.type === 'update' ? '#4CAF50' :
                    log.type === 'async' ? '#3F51B5' : '#666'
                }}
              >
                <span style={{color: '#9E9E9E', fontSize: '0.8em'}}>
                  [{log.timestamp}] {log.type.toUpperCase()}
                </span><br/>
                {log.message}
                {log.type === 'snapshot' && (
                  <div style={{
                    background: 'rgba(255, 87, 34, 0.1)',
                    padding: '5px',
                    borderRadius: '3px',
                    marginTop: '5px',
                    fontSize: '0.9em'
                  }}>
                    Snapshot value: {log.countValue}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Batch vs Non-batch */}
      <div className="demo-section">
        <h3>🔄 Batched vs Non-batched Updates</h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '20px',
          marginTop: '20px'
        }}>
          <div className="demo-card">
            <h4>Batched (in event handler)</h4>
            <div className="code-block">
{`// Trong event handler
setCount(c => c + 1);
setCount(c => c + 1);
setCount(c => c + 1);
// → 1 render`}
            </div>
            <p><strong>React batches</strong> updates trong event handlers</p>
          </div>
          
          <div className="demo-card">
            <h4>Non-batched (async)</h4>
            <div className="code-block">
{`// Trong setTimeout
setTimeout(() => {
  setCount(c => c + 1); // Render 1
}, 0);
setTimeout(() => {
  setCount(c => c + 1); // Render 2
}, 0);
// → 2 renders`}
            </div>
            <p><strong>Không batch</strong> trong setTimeout/promise</p>
          </div>
        </div>
        
        <div className="log-container" style={{marginTop: '20px'}}>
          <h4>Batch Execution Log:</h4>
          {batchLog.length === 0 ? (
            <div style={{textAlign: 'center', color: '#888', padding: '10px'}}>
              Chưa có batch log
            </div>
          ) : (
            batchLog.map((log, index) => (
              <div key={index} className="log-entry">
                {log}
              </div>
            ))
          )}
        </div>
      </div>

      <div className="explanation-box">
        <h4>🔬 KẾT LUẬN SAU KHI THỰC THI:</h4>
        <ul>
          <li><strong>State là Snapshot:</strong> Giá trị không thay đổi trong một render</li>
          <li><strong>Functional Updates:</strong> Luôn dùng khi tính toán dựa trên state trước đó</li>
          <li><strong>Stale Closure:</strong> Async functions capture giá trị tại thời điểm tạo</li>
          <li><strong>Batching:</strong> React batches updates trong event handlers</li>
          <li><strong>Non-batching:</strong> setTimeout/promise tạo multiple renders</li>
          <li><strong>Render Count:</strong> Mỗi state change (batch) → 1 render</li>
        </ul>
        
        <h4>📝 QUY TẮC VÀNG:</h4>
        <ol>
          <li>Luôn dùng functional updates: <code>setCount(prev = prev + 1)</code></li>
          <li>Không bao giờ dùng state hiện tại trong tính toán phức tạp</li>
          <li>Khi cần async updates, dùng functional updates</li>
          <li>Nhóm updates trong event handlers để được batch</li>
        </ol>
      </div>
    </div>
  );
}
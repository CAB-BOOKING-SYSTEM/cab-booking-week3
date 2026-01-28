import React, { useState, useEffect, memo } from 'react';

// Child components để demo re-render
const HeavyComponent = memo(({ id, value }) => {
  console.log(`🔄 HeavyComponent ${id} rendered`);
  
  return (
    <div className="demo-card">
      <h4>Component {id}</h4>
      <p>Value: {value}</p>
      <p>Simulated heavy render (~2ms)</p>
    </div>
  );
});

const LightComponent = memo(({ id, value }) => {
  console.log(`⚡ LightComponent ${id} rendered`);
  return (
    <div className="demo-card">
      <h4>Component {id}</h4>
      <p>Value: {value}</p>
      <p>Light render (~0ms)</p>
    </div>
  );
});

function Demo4_RenderCommit() {
  const [renderPhase, setRenderPhase] = useState('idle');
  const [renderCount, setRenderCount] = useState(0);
  const [commitCount, setCommitCount] = useState(0);
  const [componentValues, setComponentValues] = useState({
    heavy1: 0,
    heavy2: 0,
    light1: 0,
    light2: 0
  });
  const [updates, setUpdates] = useState([]);
  const [batchType, setBatchType] = useState('');

  const addUpdate = (message, phase) => {
    const timestamp = new Date().toLocaleTimeString();
    console.log(`[${phase}] ${message}`);
    setUpdates(prev => [...prev.slice(-8), { message, phase, timestamp }]);
  };

  // Simulate render process
  const triggerRender = (type) => {
    addUpdate(`🚀 Trigger ${type} update`, 'trigger');
    setRenderPhase('rendering');
    setBatchType(type);
    
    if (type === 'single') {
      setComponentValues(prev => ({ 
        ...prev, 
        heavy1: prev.heavy1 + 1 
      }));
    } 
    else if (type === 'batch') {
      setComponentValues(prev => ({ 
        ...prev, 
        heavy1: prev.heavy1 + 1,
        heavy2: prev.heavy2 + 1,
        light1: prev.light1 + 1 
      }));
      addUpdate('🔄 Batched 3 updates together', 'render');
    } 
    else if (type === 'sequential') {
      addUpdate('🔄 Sequential updates with timeouts', 'render');
      
      setTimeout(() => {
        setComponentValues(prev => ({ 
          ...prev, 
          heavy1: prev.heavy1 + 1 
        }));
        addUpdate('⏰ Timeout 1 executed', 'render');
      }, 100);
      
      setTimeout(() => {
        setComponentValues(prev => ({ 
          ...prev, 
          heavy2: prev.heavy2 + 1 
        }));
        addUpdate('⏰ Timeout 2 executed', 'render');
      }, 200);
      
      setTimeout(() => {
        setComponentValues(prev => ({ 
          ...prev, 
          light1: prev.light1 + 1 
        }));
        addUpdate('⏰ Timeout 3 executed', 'render');
      }, 300);
    }
    
    setRenderCount(prev => prev + 1);
  };

  const forceReRender = () => {
    addUpdate('💥 Force Re-render', 'trigger');
    setComponentValues(prev => ({ 
      ...prev, 
      light2: prev.light2 + 1 
    }));
  };

  const resetDemo = () => {
    setRenderPhase('idle');
    setRenderCount(0);
    setCommitCount(0);
    setComponentValues({ 
      heavy1: 0, heavy2: 0, light1: 0, light2: 0 
    });
    setUpdates([]);
    setBatchType('');
    addUpdate('🔄 Demo reset', 'system');
  };

  useEffect(() => {
    if (renderPhase === 'rendering') {
      setTimeout(() => {
        setRenderPhase('committing');
        addUpdate('✅ Render phase completed - Calculating Virtual DOM', 'render');
        
        setTimeout(() => {
          addUpdate('🎉 Commit phase completed - DOM updated', 'commit');
          setCommitCount(prev => prev + 1);
          setRenderPhase('idle');
        }, 500);
      }, 300);
    }
  }, [renderCount]);

  useEffect(() => {
    if (batchType === 'sequential') {
      addUpdate(`📊 State changed: ${JSON.stringify(componentValues)}`, 'state');
    }
  }, [componentValues, batchType]);

  return (
    <div>
      <div className="explanation-box">
        <h3>🎯 Mục tiêu demo:</h3>
        <p>Hiểu quá trình Render (Virtual DOM) và Commit (Real DOM) trong React</p>
        
        <h4>📋 HƯỚNG DẪN THỰC THI:</h4>
        <ol>
          <li>Mở Console (F12) để xem log chi tiết</li>
          <li>Click "Single Update" - quan sát 1 lần render/commit</li>
          <li>Click "Batch Update" - 3 updates nhưng chỉ 1 render</li>
          <li>Click "Sequential Update" - 3 updates với 3 renders (do timeout)</li>
          <li>Quan sát các phase: Trigger → Render → Commit</li>
          <li>Chú ý số lần render vs commit</li>
        </ol>
      </div>

      {/* Render Phase Visual */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: '20px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '10px',
        color: 'white',
        margin: '20px 0'
      }}>
        <div style={{ 
          textAlign: 'center',
          padding: '20px',
          background: renderPhase === 'idle' ? '#4CAF50' : 'rgba(255,255,255,0.2)',
          borderRadius: '10px',
          minWidth: '150px',
          transition: 'all 0.3s'
        }}>
          <div style={{
            background: '#2196F3',
            color: 'white',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 10px',
            fontWeight: 'bold'
          }}>
            1
          </div>
          <h4>Trigger</h4>
          <p>State/Prop thay đổi</p>
        </div>
        
        <div style={{ fontSize: '2rem', color: 'white' }}>→</div>
        
        <div style={{ 
          textAlign: 'center',
          padding: '20px',
          background: renderPhase === 'rendering' ? '#4CAF50' : 'rgba(255,255,255,0.2)',
          borderRadius: '10px',
          minWidth: '150px',
          transition: 'all 0.3s'
        }}>
          <div style={{
            background: '#2196F3',
            color: 'white',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 10px',
            fontWeight: 'bold'
          }}>
            2
          </div>
          <h4>Render</h4>
          <p>Virtual DOM tính toán</p>
          {renderPhase === 'rendering' && (
            <div style={{
              animation: 'pulse 1s infinite',
              marginTop: '10px',
              fontWeight: 'bold'
            }}>
              🔄 Đang render...
            </div>
          )}
        </div>
        
        <div style={{ fontSize: '2rem', color: 'white' }}>→</div>
        
        <div style={{ 
          textAlign: 'center',
          padding: '20px',
          background: renderPhase === 'committing' ? '#2196F3' : 'rgba(255,255,255,0.2)',
          borderRadius: '10px',
          minWidth: '150px',
          transition: 'all 0.3s'
        }}>
          <div style={{
            background: '#2196F3',
            color: 'white',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 10px',
            fontWeight: 'bold'
          }}>
            3
          </div>
          <h4>Commit</h4>
          <p>DOM thật được cập nhật</p>
          {renderPhase === 'committing' && (
            <div style={{
              animation: 'pulse 1s infinite',
              marginTop: '10px',
              fontWeight: 'bold'
            }}>
              🎉 Đang commit...
            </div>
          )}
        </div>
      </div>

      {/* Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '20px',
        margin: '20px 0'
      }}>
        <div className="demo-card">
          <h4>Render Count</h4>
          <p style={{ fontSize: '2rem', textAlign: 'center', color: '#4CAF50' }}>
            {renderCount}
          </p>
          <p>Số lần tính toán Virtual DOM</p>
        </div>
        <div className="demo-card">
          <h4>Commit Count</h4>
          <p style={{ fontSize: '2rem', textAlign: 'center', color: '#2196F3' }}>
            {commitCount}
          </p>
          <p>Số lần cập nhật DOM thật</p>
        </div>
        <div className="demo-card">
          <h4>Current Phase</h4>
          <p style={{ 
            fontSize: '1.5rem', 
            textAlign: 'center',
            color: renderPhase === 'rendering' ? '#4CAF50' : 
                   renderPhase === 'committing' ? '#2196F3' : '#666'
          }}>
            {renderPhase === 'idle' ? '🟢 Idle' : 
             renderPhase === 'rendering' ? '🔄 Rendering' : '🎉 Committing'}
          </p>
          <p>Trạng thái hiện tại</p>
        </div>
      </div>

      {/* Controls */}
      <div className="demo-section">
        <h3>Trigger Different Update Types</h3>
        <div className="button-group">
          <button 
            className="btn btn-primary" 
            onClick={() => triggerRender('single')}
            disabled={renderPhase !== 'idle'}
          >
            ⚡ Single Update
          </button>
          <button 
            className="btn btn-success" 
            onClick={() => triggerRender('batch')}
            disabled={renderPhase !== 'idle'}
          >
            🔄 Batch Update (3 updates)
          </button>
          <button 
            className="btn btn-warning" 
            onClick={() => triggerRender('sequential')}
            disabled={renderPhase !== 'idle'}
          >
            🕒 Sequential Update (3 timeouts)
          </button>
          <button 
            className="btn btn-danger" 
            onClick={forceReRender}
            disabled={renderPhase !== 'idle'}
          >
            💥 Force Re-render
          </button>
          <button 
            className="btn" 
            onClick={resetDemo} 
            style={{background: '#666', color: 'white'}}
          >
            🗑️ Reset Demo
          </button>
        </div>
        
        <div className="explanation-box" style={{marginTop: '20px'}}>
          <h4>Giải thích:</h4>
          <ul>
            <li><strong>Single Update:</strong> 1 state change → 1 render → 1 commit</li>
            <li><strong>Batch Update:</strong> 3 state changes CÙNG LÚC → 1 render → 1 commit</li>
            <li><strong>Sequential Update:</strong> 3 state changes với setTimeout → 3 renders → 3 commits</li>
            <li><strong>Force Re-render:</strong> Thay đổi state nhỏ → vẫn re-render</li>
            <li><strong>React.memo:</strong> Component chỉ re-render khi props thay đổi</li>
          </ul>
        </div>
      </div>

      {/* Components */}
      <div className="demo-section">
        <h3>Components Being Rendered (React.memo)</h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          marginTop: '20px'
        }}>
          <HeavyComponent id="Heavy 1" value={componentValues.heavy1} />
          <HeavyComponent id="Heavy 2" value={componentValues.heavy2} />
          <LightComponent id="Light 1" value={componentValues.light1} />
          <LightComponent id="Light 2" value={componentValues.light2} />
        </div>
        <p style={{textAlign: 'center', color: '#666', marginTop: '10px'}}>
          HeavyComponent và LightComponent đều được bọc bằng <strong>React.memo</strong><br/>
          → Chỉ re-render khi props thay đổi
        </p>
      </div>

      {/* Batch Explanation */}
      <div className="demo-section">
        <h3>🔄 How Batching Works</h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '20px',
          marginTop: '20px'
        }}>
          <div className="demo-card">
            <h4>Inside Event Handler (BATCHED)</h4>
            <div style={{
              background: '#e8f5e9',
              padding: '15px',
              borderRadius: '8px',
              fontFamily: 'monospace',
              fontSize: '0.9rem'
            }}>
              handleClick = () = {'{'} <br/>
              &nbsp;&nbsp;setCount(prev =&gt; prev + 1);<br/>
              &nbsp;&nbsp;setCount(prev =&gt; prev + 1);<br/>
              &nbsp;&nbsp;setCount(prev =&gt; prev + 1);<br/>
              {'}'}
            </div>
            <p style={{marginTop: '10px'}}>
              <strong>→ 1 render, 1 commit</strong><br/>
              React batches all updates together
            </p>
          </div>
          
          <div className="demo-card">
            <h4>Inside setTimeout (NOT BATCHED)</h4>
            <div style={{
              background: '#fff3e0',
              padding: '15px',
              borderRadius: '8px',
              fontFamily: 'monospace',
              fontSize: '0.9rem'
            }}>
              setTimeout(() =&gt; {'{'} <br/>
              &nbsp;&nbsp;setCount(prev =&gt; prev + 1);<br/>
              {'}'}, 0);<br/><br/>
              setTimeout(() =&gt; {'{'} <br/>
              &nbsp;&nbsp;setCount(prev =&gt; prev + 1);<br/>
              {'}'}, 0);
            </div>
            <p style={{marginTop: '10px'}}>
              <strong>→ 2 renders, 2 commits</strong><br/>
              React cannot batch async updates
            </p>
          </div>
        </div>
      </div>

      {/* Timeline & Logs */}
      <div className="demo-section">
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <h3>📊 Render & Commit Timeline</h3>
          <button 
            className="btn btn-primary" 
            onClick={() => setUpdates([])}
          >
            Clear Logs
          </button>
        </div>
        
        <div className="log-container" style={{marginTop: '10px'}}>
          {updates.length === 0 ? (
            <div style={{textAlign: 'center', color: '#888', padding: '20px'}}>
              Chưa có log. Hãy trigger render để xem timeline!
            </div>
          ) : (
            updates.map((update, index) => (
              <div 
                key={index} 
                className="log-entry"
                style={{
                  borderLeftColor: 
                    update.phase === 'trigger' ? '#FF9800' :
                    update.phase === 'render' ? '#4CAF50' :
                    update.phase === 'commit' ? '#2196F3' : 
                    update.phase === 'system' ? '#9C27B0' :
                    update.phase === 'state' ? '#FF5722' : '#9E9E9E',
                  padding: '8px',
                  margin: '5px 0'
                }}
              >
                <span style={{
                  display: 'inline-block',
                  width: '80px',
                  color: '#9E9E9E',
                  fontSize: '0.8em'
                }}>
                  [{update.timestamp}]
                </span>
                <span style={{
                  display: 'inline-block',
                  width: '80px',
                  fontWeight: 'bold',
                  color: 
                    update.phase === 'trigger' ? '#FF9800' :
                    update.phase === 'render' ? '#4CAF50' :
                    update.phase === 'commit' ? '#2196F3' : 
                    update.phase === 'system' ? '#9C27B0' :
                    update.phase === 'state' ? '#FF5722' : '#9E9E9E'
                }}>
                  {update.phase.toUpperCase()}
                </span>
                {update.message}
              </div>
            ))
          )}
        </div>
      </div>

      <div className="explanation-box">
        <h4>🔬 KẾT LUẬN SAU KHI THỰC THI:</h4>
        <ul>
          <li><strong>Render Phase:</strong> Tính toán Virtual DOM, có thể bị hủy (trong Concurrent Mode)</li>
          <li><strong>Commit Phase:</strong> Cập nhật DOM thật, không thể hủy</li>
          <li><strong>Batching:</strong> React tự động batch updates trong event handlers</li>
          <li><strong>No Batching:</strong> setTimeout, promise, native event handlers → không batch</li>
          <li><strong>React.memo:</strong> Ngăn re-render không cần thiết, tối ưu performance</li>
        </ul>
      </div>

      <style jsx="true">{`
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
        
        .btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}

export default Demo4_RenderCommit;
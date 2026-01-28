import React, { useState } from 'react';

// Class Component để demo "this" binding
class UserClass extends React.Component {
  constructor(props) {
    super(props);
    this.name = props.name;
    
    // Bind method trong constructor
    this.greetBound = this.greetBound.bind(this);
  }
  
  // Regular method - sẽ mất "this"
  greetRegular() {
    console.log(`Hello, ${this.name}! (Regular method)`);
    return `Hello, ${this.name}!`;
  }
  
  // Bound method trong constructor
  greetBound() {
    console.log(`Hello, ${this.name}! (Bound method)`);
    return `Hello, ${this.name}!`;
  }
  
  // Arrow function - giữ "this"
  greetArrow = () => {
    console.log(`Hello, ${this.name}! (Arrow method)`);
    return `Hello, ${this.name}!`;
  }
  
  render() {
    return <div>User: {this.name}</div>;
  }
}

export default function Demo2_ContextParameters() {
  const [users] = useState(['Alice 👩‍💻', 'Bob 👨‍💼', 'Charlie 👨‍🔬']);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('');
  const [logs, setLogs] = useState([]);

  const addLog = (message) => {
    console.log(message);
    setLogs(prev => [...prev.slice(-5), message]);
  };

  // Tạo instance của class
  const alice = new UserClass({ name: 'Alice' });
  const bob = new UserClass({ name: 'Bob' });
  const charlie = new UserClass({ name: 'Charlie' });

  // Demo các cách truyền tham số
  const handleSelectUser = (userName) => {
    addLog(`✅ Selected user: ${userName} (via parameter)`);
    setSelectedUser(userName);
  };

  const handleDataAttribute = (e) => {
    const user = e.target.dataset.user;
    addLog(`✅ Selected user: ${user} (via data attribute)`);
    setSelectedUser(user);
  };

  const handleBindMethod = (userName) => {
    addLog(`✅ Selected user: ${userName} (via bind)`);
    setSelectedUser(userName);
  };

  // Demo "this" context
  const testThisBinding = (methodName) => {
    addLog(`\n=== TESTING "${methodName}" METHOD ===`);
    
    let result = '';
    try {
      switch(methodName) {
        case 'regular':
          // ❌ Mất "this" context
          result = alice.greetRegular();
          break;
        case 'bound':
          // ✅ Giữ "this" (đã bind trong constructor)
          result = alice.greetBound();
          break;
        case 'arrow':
          // ✅ Giữ "this" (arrow function)
          result = alice.greetArrow();
          break;
        case 'inline-bind':
          // ✅ Bind tại chỗ
          result = alice.greetRegular.bind(alice)();
          break;
        case 'arrow-wrapper':
          // ✅ Arrow wrapper
          result = () => alice.greetRegular()();
          break;
      }
      addLog(`Result: ${result}`);
    } catch (error) {
      addLog(`❌ ERROR: ${error.message}`);
    }
    
    setSelectedMethod(methodName);
  };

  return (
    <div>
      <div className="explanation-box">
        <h3>🎯 Mục tiêu demo:</h3>
        <p>Hiểu cách truyền tham số cho event handlers và vấn đề "this" binding trong class components</p>
        
        <h4>📋 HƯỚNG DẪN THỰC THI:</h4>
        <ol>
          <li>Click các nút user để xem cách truyền tham số khác nhau</li>
          <li>Test các phương thức với "this" binding</li>
          <li>Quan sát console log và errors (nếu có)</li>
          <li>Chú ý: Regular method sẽ gây lỗi vì mất "this"</li>
        </ol>
      </div>

      <div className="demo-section">
        <h3>1. Cách truyền tham số cho Event Handlers</h3>
        
        <div className="comparison-grid">
          {/* Cách 1: Inline Arrow Function */}
          <div className="demo-card">
            <h4>Cách 1: Inline Arrow Function</h4>
            <div className="code-block">
{`<button onClick={() => 
  handleSelectUser(user)
}>`}
            </div>
            <div className="button-group">
              {users.map(user => (
                <button
                  key={user}
                  className="btn btn-primary"
                  onClick={() => handleSelectUser(user)}
                >
                  Select {user}
                </button>
              ))}
            </div>
            <p><strong>Đặc điểm:</strong> Dễ đọc, nhưng tạo hàm mới mỗi render</p>
          </div>

          {/* Cách 2: Data Attributes */}
          <div className="demo-card">
            <h4>Cách 2: Data Attributes</h4>
            <div className="code-block">
{`<button data-user={user}
  onClick={handleDataAttribute}
>`}
            </div>
            <div className="button-group">
              {users.map(user => (
                <button
                  key={user}
                  className="btn btn-success"
                  data-user={user}
                  onClick={handleDataAttribute}
                >
                  Select {user}
                </button>
              ))}
            </div>
            <p><strong>Đặc điểm:</strong> Không tạo hàm mới, nhưng cần đọc từ event</p>
          </div>

          {/* Cách 3: Bind Method */}
          <div className="demo-card">
            <h4>Cách 3: Bind trong render</h4>
            <div className="code-block">
{`<button onClick={
  handleBindMethod.bind(null, user)
}>`}
            </div>
            <div className="button-group">
              {users.map(user => (
                <button
                  key={user}
                  className="btn btn-warning"
                  onClick={handleBindMethod.bind(null, user)}
                >
                  Select {user}
                </button>
              ))}
            </div>
            <p><strong>Đặc điểm:</strong> Tạo hàm mới mỗi render (giống inline arrow)</p>
          </div>
        </div>

        <div className="selected-info">
          <h4>👤 User đã chọn: <span style={{color: '#2196F3'}}>{selectedUser || 'Chưa chọn'}</span></h4>
        </div>
      </div>

      <div className="demo-section">
        <h3>2. Vấn đề "this" binding trong Class Components</h3>
        
        <div className="visual-demo">
          <div style={{textAlign: 'center'}}>
            <h4>User Instance: Alice</h4>
            <p>Test các phương thức khác nhau:</p>
          </div>
        </div>

        <div className="button-group">
          <button 
            className="btn btn-danger"
            onClick={() => testThisBinding('regular')}
          >
            ❌ Test Regular Method
          </button>
          <button 
            className="btn btn-success"
            onClick={() => testThisBinding('bound')}
          >
            ✅ Test Bound Method
          </button>
          <button 
            className="btn btn-success"
            onClick={() => testThisBinding('arrow')}
          >
            ✅ Test Arrow Method
          </button>
          <button 
            className="btn btn-warning"
            onClick={() => testThisBinding('inline-bind')}
          >
            ⚠️ Test Inline Bind
          </button>
          <button 
            className="btn btn-warning"
            onClick={() => testThisBinding('arrow-wrapper')}
          >
            ⚠️ Test Arrow Wrapper
          </button>
        </div>

        <div className="log-container">
          <h4>📊 Console Log:</h4>
          {logs.map((log, index) => (
            <div key={index} className="log-entry">
              {log}
            </div>
          ))}
        </div>

        <div className="explanation-box">
          <h4>🔬 KẾT LUẬN SAU KHI THỰC THI:</h4>
          <ul>
            <li><strong>Regular Method:</strong> Mất "this" context → TypeError</li>
            <li><strong>Bound Method:</strong> Giữ "this" (bind trong constructor)</li>
            <li><strong>Arrow Method:</strong> Giữ "this" (tự động bind)</li>
            <li><strong>Functional Components:</strong> Không có vấn đề "this"</li>
            <li><strong>Truyền tham số:</strong> Inline arrow phổ biến nhất, data-attr cho performance</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
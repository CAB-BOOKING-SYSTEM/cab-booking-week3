import React, { useState, useCallback, useContext, createContext } from 'react';

// ====================================
// PATTERN 1: Custom Props & Events
// ====================================

const TodoItem = React.memo(({ todo, onToggle, onDelete, onEdit }) => {
  console.log(`TodoItem "${todo.text}" rendered`);
  
  return (
    <div className="demo-card" style={{
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      marginBottom: '10px'
    }}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        style={{ transform: 'scale(1.3)' }}
      />
      <span style={{
        flex: 1,
        textDecoration: todo.completed ? 'line-through' : 'none',
        color: todo.completed ? '#888' : '#333',
        fontSize: '1.1rem'
      }}>
        {todo.text}
      </span>
      <button 
        className="btn btn-primary"
        onClick={() => onEdit(todo.id, prompt('New text:', todo.text))}
        style={{ padding: '5px 10px', fontSize: '0.9rem' }}
      >
        ✏️ Edit
      </button>
      <button 
        className="btn btn-danger"
        onClick={() => onDelete(todo.id)}
        style={{ padding: '5px 10px', fontSize: '0.9rem' }}
      >
        🗑️ Delete
      </button>
    </div>
  );
});

// ====================================
// PATTERN 2: Compound Components - FIXED
// ====================================

const DropdownContext = createContext();

// Tách thành các component riêng biệt
const DropdownToggle = ({ children }) => {
  const { isOpen, setIsOpen } = useContext(DropdownContext);
  
  return (
    <button 
      className="btn btn-primary"
      onClick={() => setIsOpen(!isOpen)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '10px 20px',
        fontSize: '1rem'
      }}
    >
      {children}
      <span>{isOpen ? '▲' : '▼'}</span>
    </button>
  );
};

const DropdownMenu = ({ children }) => {
  const { isOpen } = useContext(DropdownContext);
  
  if (!isOpen) return null;
  
  return (
    <div style={{
      position: 'absolute',
      top: '100%',
      left: 0,
      background: 'white',
      border: '1px solid #ddd',
      borderRadius: '5px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      minWidth: '200px',
      zIndex: 1000,
      marginTop: '5px'
    }}>
      {children}
    </div>
  );
};

const DropdownItem = ({ value, children, onClick }) => {
  const { setSelected, setIsOpen } = useContext(DropdownContext);
  
  const handleClick = () => {
    setSelected(value);
    setIsOpen(false);
    if (onClick) onClick(value);
  };
  
  return (
    <div
      onClick={handleClick}
      style={{
        padding: '12px 15px',
        cursor: 'pointer',
        borderBottom: '1px solid #f0f0f0',
        transition: 'background 0.2s'
      }}
      onMouseEnter={(e) => e.currentTarget.style.background = '#f5f5f5'}
      onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
    >
      {children}
    </div>
  );
};

const DropdownSelected = () => {
  const { selected } = useContext(DropdownContext);
  return (
    <div style={{ marginTop: '10px', color: '#666' }}>
      Selected: <strong>{selected || 'None'}</strong>
    </div>
  );
};

const Dropdown = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const contextValue = {
    isOpen,
    setIsOpen,
    selected,
    setSelected
  };

  return (
    <DropdownContext.Provider value={contextValue}>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
};

// Gán các component con
Dropdown.Toggle = DropdownToggle;
Dropdown.Menu = DropdownMenu;
Dropdown.Item = DropdownItem;
Dropdown.Selected = DropdownSelected;

// ====================================
// PATTERN 3: Render Props
// ====================================

const MouseTracker = ({ render }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = useCallback((e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  }, []);
  
  return (
    <div 
      style={{
        width: '100%',
        height: '200px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '10px',
        position: 'relative',
        overflow: 'hidden',
        margin: '20px 0'
      }}
      onMouseMove={handleMouseMove}
    >
      {render(position)}
    </div>
  );
};

// ====================================
// PATTERN 4: Higher Order Component (HOC)
// ====================================

const withLogger = (WrappedComponent) => {
  return function WithLoggerComponent(props) {
    console.log(`[LOG] ${WrappedComponent.name} rendered with props:`, props);
    
    return <WrappedComponent {...props} />;
  };
};

const EnhancedButton = withLogger(({ onClick, children }) => (
  <button 
    className="btn btn-warning"
    onClick={onClick}
    style={{ margin: '5px' }}
  >
    {children} (Logged)
  </button>
));

// ====================================
// MAIN DEMO COMPONENT
// ====================================

export default function Demo6_ReusableComponents() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React patterns', completed: true },
    { id: 2, text: 'Build reusable components', completed: false },
    { id: 3, text: 'Test performance', completed: false },
    { id: 4, text: 'Deploy application', completed: false }
  ]);
  
  const [logs, setLogs] = useState([]);
  const [activePattern, setActivePattern] = useState('props');

  const addLog = (message) => {
    console.log(message);
    setLogs(prev => [...prev.slice(-6), message]);
  };

  // Handlers cho TodoList
  const handleToggle = useCallback((id) => {
    addLog(`🔄 Toggled todo ${id}`);
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  }, []);

  const handleDelete = useCallback((id) => {
    addLog(`🗑️ Deleted todo ${id}`);
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);

  const handleEdit = useCallback((id, newText) => {
    if (newText && newText.trim()) {
      addLog(`✏️ Edited todo ${id}: "${newText}"`);
      setTodos(prev => prev.map(todo =>
        todo.id === id ? { ...todo, text: newText } : todo
      ));
    }
  }, []);

  const addTodo = () => {
    const text = prompt('Enter new todo:');
    if (text && text.trim()) {
      const newTodo = {
        id: Date.now(),
        text,
        completed: false
      };
      addLog(`➕ Added new todo: "${text}"`);
      setTodos(prev => [...prev, newTodo]);
    }
  };

  // Dropdown handlers
  const handleSelectLanguage = (lang) => {
    addLog(`🌐 Selected language: ${lang}`);
  };

  const handleSelectTheme = (theme) => {
    addLog(`🎨 Selected theme: ${theme}`);
  };

  // Clear logs
  const clearLogs = () => {
    setLogs([]);
    addLog('🗑️ Logs cleared');
  };

  return (
    <div>
      <div className="explanation-box">
        <h3>🎯 Mục tiêu demo:</h3>
        <p>So sánh các pattern tái sử dụng component trong React</p>
        
        <h4>📋 HƯỚNG DẪN THỰC THI:</h4>
        <ol>
          <li>Tương tác với TodoList (toggle, edit, delete, add)</li>
          <li>Thử các Dropdown khác nhau (language, theme)</li>
          <li>Di chuột trong vùng MouseTracker</li>
          <li>Click các EnhancedButton (có logger)</li>
          <li>Quan sát console và log panel</li>
          <li>Chú ý khi nào component re-render</li>
        </ol>
      </div>

      {/* Pattern Selector */}
      <div style={{ marginBottom: '30px' }}>
        <div className="button-group">
          <button 
            className={`btn ${activePattern === 'props' ? 'btn-success' : 'btn-primary'}`}
            onClick={() => setActivePattern('props')}
          >
            🔧 Custom Props & Events
          </button>
          <button 
            className={`btn ${activePattern === 'compound' ? 'btn-success' : 'btn-primary'}`}
            onClick={() => setActivePattern('compound')}
          >
            🧩 Compound Components
          </button>
          <button 
            className={`btn ${activePattern === 'render' ? 'btn-success' : 'btn-primary'}`}
            onClick={() => setActivePattern('render')}
          >
            🎯 Render Props
          </button>
          <button 
            className={`btn ${activePattern === 'hoc' ? 'btn-success' : 'btn-primary'}`}
            onClick={() => setActivePattern('hoc')}
          >
            🏗️ Higher Order Components
          </button>
        </div>
      </div>

      {/* PATTERN 1: Custom Props & Events */}
      {activePattern === 'props' && (
        <div className="demo-section">
          <h3>🔧 Pattern 1: Custom Props & Events</h3>
          <p>Component nhận props và emit events qua callbacks</p>
          
          <div style={{ display: 'flex', gap: '30px', marginTop: '20px' }}>
            <div style={{ flex: 1 }}>
              <h4>Todo List</h4>
              <div style={{ marginBottom: '20px' }}>
                <button className="btn btn-success" onClick={addTodo}>
                  ➕ Add New Todo
                </button>
              </div>
              
              {todos.map(todo => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={handleToggle}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              ))}
              
              <div style={{ marginTop: '20px', color: '#666' }}>
                <p>Total: {todos.length} | Completed: {todos.filter(t => t.completed).length}</p>
                <p><strong>Chú ý:</strong> Mỗi TodoItem có React.memo → chỉ re-render khi props thay đổi</p>
              </div>
            </div>
            
            <div style={{ flex: 1 }}>
              <h4>Component Structure:</h4>
              <div className="code-block">
{`<TodoItem
  key={todo.id}
  todo={todo}                    // Data
  onToggle={handleToggle}       // Event callback
  onDelete={handleDelete}       // Event callback
  onEdit={handleEdit}           // Event callback
/>`}
              </div>
              
              <h4 style={{ marginTop: '20px' }}>Pros & Cons:</h4>
              <ul>
                <li><strong>✅ Ưu điểm:</strong> Đơn giản, dễ hiểu, type-safe với TypeScript</li>
                <li><strong>✅ Ưu điểm:</strong> Rõ ràng component cần gì và emit gì</li>
                <li><strong>❌ Nhược điểm:</strong> Prop drilling khi component sâu</li>
                <li><strong>❌ Nhược điểm:</strong> API có thể trở nên phức tạp</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* PATTERN 2: Compound Components */}
      {activePattern === 'compound' && (
        <div className="demo-section">
          <h3>🧩 Pattern 2: Compound Components</h3>
          <p>Nhóm các component liên quan, chia sẻ state ngầm qua Context</p>
          
          <div style={{ display: 'flex', gap: '30px', marginTop: '20px' }}>
            <div style={{ flex: 1 }}>
              <h4>Language Selector</h4>
              <Dropdown>
                <Dropdown.Toggle>
                  Select Language 🌐
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item value="Vietnamese" onClick={handleSelectLanguage}>
                    🇻🇳 Vietnamese
                  </Dropdown.Item>
                  <Dropdown.Item value="English" onClick={handleSelectLanguage}>
                    🇺🇸 English
                  </Dropdown.Item>
                  <Dropdown.Item value="Japanese" onClick={handleSelectLanguage}>
                    🇯🇵 Japanese
                  </Dropdown.Item>
                  <Dropdown.Item value="Korean" onClick={handleSelectLanguage}>
                    🇰🇷 Korean
                  </Dropdown.Item>
                </Dropdown.Menu>
                <Dropdown.Selected />
              </Dropdown>
              
              <h4 style={{ marginTop: '30px' }}>Theme Selector</h4>
              <Dropdown>
                <Dropdown.Toggle>
                  Select Theme 🎨
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item value="Light" onClick={handleSelectTheme}>
                    ☀️ Light Mode
                  </Dropdown.Item>
                  <Dropdown.Item value="Dark" onClick={handleSelectTheme}>
                    🌙 Dark Mode
                  </Dropdown.Item>
                  <Dropdown.Item value="Auto" onClick={handleSelectTheme}>
                    🔄 Auto
                  </Dropdown.Item>
                </Dropdown.Menu>
                <Dropdown.Selected />
              </Dropdown>
            </div>
            
            <div style={{ flex: 1 }}>
              <h4>Component Structure:</h4>
              <div className="code-block">
{`<Dropdown>
  <Dropdown.Toggle>
    Select Language
  </Dropdown.Toggle>
  <Dropdown.Menu>
    <Dropdown.Item value="vi">
      Vietnamese
    </Dropdown.Item>
    <Dropdown.Item value="en">
      English
    </Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>`}
              </div>
              
              <h4 style={{ marginTop: '20px' }}>Pros & Cons:</h4>
              <ul>
                <li><strong>✅ Ưu điểm:</strong> API tự nhiên, giống HTML</li>
                <li><strong>✅ Ưu điểm:</strong> Linh hoạt trong cấu trúc</li>
                <li><strong>✅ Ưu điểm:</strong> State được quản lý ngầm</li>
                <li><strong>❌ Nhược điểm:</strong> Phức tạp với Context</li>
                <li><strong>❌ Nhược điểm:</strong> Khó type-safe với TypeScript</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* PATTERN 3: Render Props */}
      {activePattern === 'render' && (
        <div className="demo-section">
          <h3>🎯 Pattern 3: Render Props</h3>
          <p>Component nhận một hàm render làm prop, truyền data cho nó</p>
          
          <div style={{ display: 'flex', gap: '30px', marginTop: '20px' }}>
            <div style={{ flex: 1 }}>
              <h4>Mouse Position Tracker</h4>
              <MouseTracker
                render={({ x, y }) => (
                  <div style={{
                    position: 'absolute',
                    top: y - 30,
                    left: x - 30,
                    width: '60px',
                    height: '60px',
                    background: 'rgba(255,255,255,0.9)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.3)'
                  }}>
                    {x}, {y}
                  </div>
                )}
              />
              
              <h4 style={{ marginTop: '30px' }}>Counter with Render Prop</h4>
              <Counter
                initialValue={0}
                render={(count, increment, decrement) => (
                  <div style={{ textAlign: 'center' }}>
                    <h2>Count: {count}</h2>
                    <div className="button-group">
                      <button className="btn btn-danger" onClick={decrement}>
                        ➖ Decrement
                      </button>
                      <button className="btn btn-success" onClick={increment}>
                        ➕ Increment
                      </button>
                    </div>
                  </div>
                )}
              />
            </div>
            
            <div style={{ flex: 1 }}>
              <h4>Component Structure:</h4>
              <div className="code-block">
{`<MouseTracker
  render={(position) => (
    <div>
      Mouse at: {position.x}, {position.y}
    </div>
  )}
/>

<Counter
  initialValue={0}
  render={(count, increment, decrement) => (
    // JSX using count and handlers
  )}
/>`}
              </div>
              
              <h4 style={{ marginTop: '20px' }}>Pros & Cons:</h4>
              <ul>
                <li><strong>✅ Ưu điểm:</strong> Rất linh hoạt, logic tái sử dụng được</li>
                <li><strong>✅ Ưu điểm:</strong> Không giới hạn số lượng render props</li>
                <li><strong>❌ Nhược điểm:</strong> Syntax phức tạp, nhiều nesting</li>
                <li><strong>❌ Nhược điểm:</strong> Có thể gây "callback hell"</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* PATTERN 4: Higher Order Components */}
      {activePattern === 'hoc' && (
        <div className="demo-section">
          <h3>🏗️ Pattern 4: Higher Order Components</h3>
          <p>Hàm nhận một component, trả về component mới với tính năng bổ sung</p>
          
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <h4>Enhanced Components with Logging</h4>
            <div className="button-group" style={{ justifyContent: 'center' }}>
              <EnhancedButton onClick={() => addLog('Button 1 clicked')}>
                Button 1
              </EnhancedButton>
              <EnhancedButton onClick={() => addLog('Button 2 clicked')}>
                Button 2
              </EnhancedButton>
              <EnhancedButton onClick={() => addLog('Button 3 clicked')}>
                Button 3
              </EnhancedButton>
            </div>
            
            <div style={{ marginTop: '40px' }}>
              <h4>HOC Implementation:</h4>
              <div className="code-block">
{`const withLogger = (WrappedComponent) => {
  return function WithLoggerComponent(props) {
    console.log(\`[\${WrappedComponent.name}] rendered\`);
    return <WrappedComponent {...props} />;
  };
};

const EnhancedButton = withLogger(Button);`}
              </div>
            </div>
          </div>
          
          <div style={{ marginTop: '30px' }}>
            <h4>Pros & Cons:</h4>
            <ul>
              <li><strong>✅ Ưu điểm:</strong> Tái sử dụng logic cross-cutting</li>
              <li><strong>✅ Ưu điểm:</strong> Composability (có thể chain nhiều HOCs)</li>
              <li><strong>❌ Nhược điểm:</strong> "Wrapper hell" - nhiều layers</li>
              <li><strong>❌ Nhược điểm:</strong> Khó debug, props conflict</li>
              <li><strong>⚠️ Lưu ý:</strong> Hooks thay thế nhiều use cases của HOC</li>
            </ul>
          </div>
        </div>
      )}

      {/* Log Panel */}
      <div className="demo-section">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3>📊 Component Interaction Logs</h3>
          <button className="btn btn-primary" onClick={clearLogs}>
            🗑️ Clear Logs
          </button>
        </div>
        
        <div className="log-container">
          {logs.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#888', padding: '20px' }}>
              Chưa có log. Hãy tương tác với các component!
            </div>
          ) : (
            logs.map((log, index) => (
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
          <li><strong>Custom Props:</strong> Tốt cho component đơn giản, rõ ràng</li>
          <li><strong>Compound Components:</strong> Tốt cho component phức tạp, có nhiều phần</li>
          <li><strong>Render Props:</strong> Tốt cho logic tái sử dụng, linh hoạt</li>
          <li><strong>HOCs:</strong> Tốt cho cross-cutting concerns (logging, auth)</li>
          <li><strong>Custom Hooks:</strong> (Không demo) - Modern alternative to HOCs/Render Props</li>
          <li><strong>Chọn pattern:</strong> Phụ thuộc vào use case và team preference</li>
        </ul>
      </div>
    </div>
  );
}

// Helper component for Render Props demo
function Counter({ initialValue, render }) {
  const [count, setCount] = useState(initialValue);
  
  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev - 1);
  
  return render(count, increment, decrement);
}
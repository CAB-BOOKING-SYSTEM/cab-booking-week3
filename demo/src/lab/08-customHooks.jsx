import React, { useState, useCallback } from 'react';

// Custom hook với nhiều tính năng hơn
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);
  
  // Sử dụng useCallback để tránh re-create function mỗi lần render
  const toggle = useCallback(() => {
    setValue(prev => !prev);
  }, []);
  
  const setTrue = useCallback(() => {
    setValue(true);
  }, []);
  
  const setFalse = useCallback(() => {
    setValue(false);
  }, []);
  
  const reset = useCallback(() => {
    setValue(initialValue);
  }, [initialValue]);
  
  // Return as object để dễ extend và clear hơn
  return {
    value,
    toggle,
    setTrue,
    setFalse,
    reset,
    setValue,
  };
}

// Component demo với nhiều use cases
export function ToggleExample() {
  const lightSwitch = useToggle(false);
  const notifications = useToggle(true);
  const darkMode = useToggle(false);
  
  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'Arial, sans-serif',
      backgroundColor: darkMode.value ? '#1a1a1a' : '#ffffff',
      color: darkMode.value ? '#ffffff' : '#000000',
      minHeight: '100vh',
      transition: 'all 0.3s ease'
    }}>
      <h2>Custom Hook - Advanced useToggle</h2>
      
      {/* Example 1: Simple toggle */}
      <div style={{ 
        margin: '20px 0', 
        padding: '15px', 
        border: '1px solid #ccc',
        borderRadius: '8px'
      }}>
        <h3>💡 Light Switch</h3>
        <p>
          Trạng thái: <strong>{lightSwitch.value ? '🟢 BẬT' : '🔴 TẮT'}</strong>
        </p>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={lightSwitch.toggle}>
            Toggle
          </button>
          <button onClick={lightSwitch.setTrue}>
            Bật
          </button>
          <button onClick={lightSwitch.setFalse}>
            Tắt
          </button>
        </div>
      </div>
      
      {/* Example 2: Notifications */}
      <div style={{ 
        margin: '20px 0', 
        padding: '15px', 
        border: '1px solid #ccc',
        borderRadius: '8px'
      }}>
        <h3>🔔 Notifications</h3>
        <p>
          Thông báo: <strong>{notifications.value ? '✅ Enabled' : '❌ Disabled'}</strong>
        </p>
        <button onClick={notifications.toggle}>
          {notifications.value ? 'Tắt thông báo' : 'Bật thông báo'}
        </button>
      </div>
      
      {/* Example 3: Dark Mode */}
      <div style={{ 
        margin: '20px 0', 
        padding: '15px', 
        border: '1px solid #ccc',
        borderRadius: '8px'
      }}>
        <h3>🌙 Dark Mode</h3>
        <p>
          Theme: <strong>{darkMode.value ? 'Dark' : 'Light'}</strong>
        </p>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={darkMode.toggle}>
            Toggle Theme
          </button>
          <button onClick={darkMode.reset}>
            Reset to Default
          </button>
        </div>
      </div>
      
      {/* Summary */}
      <div style={{ 
        marginTop: '30px', 
        padding: '15px', 
        backgroundColor: darkMode.value ? '#2a2a2a' : '#f0f0f0',
        borderRadius: '8px'
      }}>
        <h3>📊 Summary</h3>
        <ul>
          <li>Light: {lightSwitch.value ? 'ON' : 'OFF'}</li>
          <li>Notifications: {notifications.value ? 'ON' : 'OFF'}</li>
          <li>Dark Mode: {darkMode.value ? 'ON' : 'OFF'}</li>
        </ul>
      </div>
    </div>
  );
}
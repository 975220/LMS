import React from 'react';

const Loading = () => {
  const spinnerStyle = {
    width: '48px',
    height: '48px',
    border: '5px solid #e5e7eb',
    borderTop: '5px solid #3b82f6',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  };

  const keyframes = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <style>{keyframes}</style>
      <div style={spinnerStyle}></div>
    </div>
  );
};

export default Loading; 

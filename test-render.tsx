import React from 'react';

// Simple test to see if the page renders at all
const TestRender = () => {
  console.log('TestRender component mounted');

  return (
    <div style={{ padding: '20px' }}>
      <h1>Test Render</h1>
      <p>If you can see this, React is rendering.</p>
    </div>
  );
};

export default TestRender;

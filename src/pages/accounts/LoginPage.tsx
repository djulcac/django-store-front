import React from 'react';
import LoginComponent from '@/modules/accounts/components/LoginComponent'

const App: React.FC = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      margin: '40px',
    }}>
      <LoginComponent />
    </div>
  )
}

export default App;

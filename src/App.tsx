import './App.css';
import { useState } from 'react';
import Form from './components/Form';
import Title from './components/Title';

function App() {
  const [showForm, setShowForm] = useState(false);

  const handleRegisterNewPasswordClick = () => {
    setShowForm(true);
  };

  const handleCancelClick = () => {
    setShowForm(false);
  };

  return (
    <>
      <header>
        <Title />
      </header>
      <main>
        {!showForm && (
          <button onClick={ handleRegisterNewPasswordClick }>Cadastrar nova senha</button>
        )}
        {
        showForm && <Form cancelClick={ handleCancelClick } />
      }
      </main>
    </>
  );
}

export default App;

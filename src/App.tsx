import './App.css';
import { useState } from 'react';
import Form, { FormDataProps } from './components/Form';
import Title from './components/Title';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [passwords, setPasswords] = useState<FormDataProps[]>([]);

  const handleRegisterNewPasswordClick = () => {
    setShowForm(true);
  };

  const handleSetPassword = (formData: FormDataProps) => {
    setShowForm(false);
    setPasswords([...passwords, formData]);
  };

  return (
    <>
      <header>
        <Title />
      </header>
      <main>
        {!showForm ? (
          <button
            onClick={ handleRegisterNewPasswordClick }
          >
            Cadastrar nova senha

          </button>
        )
          : (<Form
              cancelClick={ () => setShowForm(false) }
              registerButton={ handleSetPassword }
          />)}
        <section>
          {passwords.length > 0 ? (
            <ul>
              {passwords.map((password) => (
                <li key={ Date.now() }>
                  <a href={ password.URL } target="blank">{password.name}</a>
                  <div>
                    Login:
                    {' '}
                    {password.login}
                  </div>
                  <div>
                    Senha:
                    {' '}
                    {password.password}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>Nenhuma senha cadastrada</p>
          )}
        </section>
      </main>

    </>
  );
}

export default App;

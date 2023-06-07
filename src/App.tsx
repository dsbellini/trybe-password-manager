import './App.css';
import { FormEvent, useState } from 'react';
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

  const handleDelete = () => {

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
                <li key={ password.name }>
                  <a href={ password.URL } target="blank">{password.name}</a>
                  <div>
                    Login:
                    {' '}
                    <span>
                      {password.login}
                    </span>
                  </div>
                  <div>
                    Senha:
                    {' '}
                    <span>
                      {password.password}
                    </span>
                  </div>
                  <button
                    data-testid="remove-btn"
                    onClick={ () => {
                      const filteredPasswords = passwords
                        .filter((filteredPassword) => filteredPassword.name
                        !== password.name);
                      setPasswords(filteredPasswords);
                    } }
                  >
                    Apagar

                  </button>
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

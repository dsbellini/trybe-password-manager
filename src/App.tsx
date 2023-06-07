import './App.css';
import { useState } from 'react';
import Form, { FormDataProps } from './components/Form';
import Title from './components/Title';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [passwords, setPasswords] = useState<FormDataProps[]>([]);
  const [hidePasswords, setHidePasswords] = useState(false);

  const handleRegisterNewPasswordClick = () => {
    setShowForm(true);
  };

  const handleSetPassword = (formData: FormDataProps) => {
    setShowForm(false);
    setPasswords([...passwords, formData]);
  };

  const handleDelete = (password: string) => {
    const filteredPasswords = passwords.filter((filteredPassword) => filteredPassword.name
    !== password);
    setPasswords(filteredPasswords);
  };

  const handleCheckboxChange = () => {
    setHidePasswords(!hidePasswords);
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
            <>
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
                        {hidePasswords ? '******' : password.password}
                      </span>
                    </div>
                    <button
                      data-testid="remove-btn"
                      onClick={ () => handleDelete(password.name) }
                    >
                      Apagar
                    </button>
                  </li>
                ))}
              </ul>
              <div>
                <label htmlFor="password-hidden">Esconder senhas</label>
                <input
                  type="checkbox"
                  id="password-hidden"
                  checked={ hidePasswords }
                  onChange={ handleCheckboxChange }
                />
              </div>
            </>
          ) : (
            <p>Nenhuma senha cadastrada</p>
          )}
        </section>
      </main>

    </>
  );
}

export default App;

/* eslint-disable react/jsx-max-depth */
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
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
          <Button
            variant="dark"
            onClick={ handleRegisterNewPasswordClick }
          >
            Cadastrar nova senha

          </Button>
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
                    <Card style={ { width: '18rem' } }>
                      <Card.Body>
                        <Card.Title>
                          <a
                            href={ password.URL }
                            target="blank"
                          >
                            {password.name}

                          </a>
                        </Card.Title>
                        <Card.Text>
                          <div>
                            Login:
                            {' '}
                            <span>
                              {password.login}
                            </span>
                          </div>
                          Senha:
                          {' '}
                          <span>
                            {hidePasswords ? '******' : password.password}
                          </span>
                        </Card.Text>
                      </Card.Body>
                      <Button
                        variant="danger"
                        data-testid="remove-btn"
                        onClick={ () => handleDelete(password.name) }
                      >
                        Apagar
                      </Button>
                    </Card>

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

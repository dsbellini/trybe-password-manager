/* eslint-disable react/jsx-max-depth */
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Formboot from 'react-bootstrap/Form';
import './App.css';
import { useState } from 'react';
import Form, { FormDataProps } from './components/Form';
import linkImage from './images/link-img.svg';
import deleteImage from './images/trash-img.svg';

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
        <h1>Gerenciador de Senhas</h1>
        <h3>Cofre Digital ® </h3>
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
          : (
            <Form
              cancelClick={ () => setShowForm(false) }
              registerButton={ handleSetPassword }
            />
          )}
      </main>
      <section>
        {passwords.length > 0 ? (
          <ul>
            {passwords.map((password) => (
              <li key={ password.name }>
                <Card
                  style={ { width: '18rem' } }
                  bg="dark"
                  border="success"
                >
                  <Card.Body>
                    <Card.Title className="card-title">
                      <a
                        href={ password.URL }
                        target="blank"
                      >
                        {password.name}

                      </a>
                      <img src={ linkImage } alt="linkimg" id="link" />
                    </Card.Title>
                    <Card.Text>
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
                    </Card.Text>
                  </Card.Body>
                  <Button
                    variant="outline-dark"
                    data-testid="remove-btn"
                    onClick={ () => handleDelete(password.name) }
                  >
                    <img src={ deleteImage } alt="deleteImage" />
                  </Button>
                </Card>

                <div className="hidden-password-button">
                  <label htmlFor="password-hidden">Esconder senhas</label>
                  <Formboot.Check
                    type="switch"
                    id="password-hidden"
                    checked={ hidePasswords }
                    onChange={ handleCheckboxChange }
                  />
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>Nenhuma senha cadastrada</p>
        )}
      </section>
    </>
  );
}

export default App;

import React, { FormEvent, useState } from 'react';
import Swal from 'sweetalert2';
import Button from 'react-bootstrap/Button';
import { FormLabel } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Formboot from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import eyeOpen from '../images/eye-open.svg';
import eyeClosed from '../images/eye-closed.svg';

const INITIAL_STATE = {
  name: '',
  login: '',
  password: '',
  URL: '',
};

export type FormDataProps = {
  name: string;
  login: string;
  password: string;
  URL: string;
};

type FormProps = {
  cancelClick: () => void;
  registerButton: (params: FormDataProps) => void;
};

export default function Form({ cancelClick, registerButton }: FormProps) {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [showPasswordButton, setShowPasswordButton] = useState('password');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const isFormValid = () => {
    const { name, login, password } = formData;

    return (
      name.trim() !== ''
        && login.trim() !== ''
        && password.trim() !== ''
        && password.length >= 8
        && password.length <= 16
        && /\d/.test(password)
        && /[a-zA-Z]/.test(password)
        && /[!@#$%^&*]/.test(password)
    );
  };

  const renderPasswordValidation = () => {
    const { password } = formData;

    const validPassword = 'valid-password-check';
    const invalidPassword = 'invalid-password-check';

    return (
      <ul id="ul-render-password">
        <p>A senha deve:</p>
        <li className={ password.length >= 8 ? validPassword : invalidPassword }>
          Possuir 8 ou mais caracteres
        </li>
        <li className={ /\d/.test(password) ? validPassword : invalidPassword }>
          Possuir letras e números
        </li>
        <li className={ /[!@#$%^&*]/.test(password) ? validPassword : invalidPassword }>
          Possuir algum caractere especial
        </li>
        <li className={ password.length <= 16 ? validPassword : invalidPassword }>
          Possuir até 16 caracteres
        </li>
      </ul>
    );
  };

  const handleRegisterButton = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    registerButton(formData);

    Swal.fire({
      title: 'Serviço cadastrado com sucesso',
      timer: 1500,
      timerProgressBar: true,
    });
  };

  const handleButtonHidePassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    setShowPasswordButton(showPasswordButton === 'password' ? 'text' : 'password');
  };

  return (
    <Formboot onSubmit={ handleRegisterButton }>
      <Row className="mb-3">
        <Formboot.Group as={ Col } controlId="formGridService">
          <FormLabel htmlFor="service-name">
            Nome do Serviço

          </FormLabel>
          {' '}
          <Formboot.Control
            className="input"
            type="text"
            id="service-name"
            name="name"
            onChange={ handleInputChange }
            required
            placeholder="Exemplo: Google, Netflix, Facebook"
          />
        </Formboot.Group>

        <Formboot.Group as={ Col } controlId="formGridLogin">
          <FormLabel htmlFor="login">
            Login

          </FormLabel>
          {' '}
          <Formboot.Control
            className="input"
            type="text"
            id="login"
            name="login"
            onChange={ handleInputChange }
            required
          />
        </Formboot.Group>
      </Row>

      <Row className="mb-3">
        <Formboot.Group as={ Col } controlId="formGridPassword">
          <FormLabel htmlFor="password">
            Senha
          </FormLabel>
          {' '}
          <Formboot.Control
            className="input"
            type={ showPasswordButton }
            id="password"
            name="password"
            onChange={ handleInputChange }
            required
          />
        </Formboot.Group>

        <Button
          variant="outline-dark"
          data-testid="show-hide-form-password"
          onClick={ handleButtonHidePassword }
        >
          {showPasswordButton === 'text'
            ? <img src={ eyeClosed } alt="eyeclosed" />
            : <img src={ eyeOpen } alt="eyeopen" /> }
        </Button>
      </Row>

      <Row className="mb-3">
        <Formboot.Group as={ Col } controlId="formGridURL">
          <FormLabel htmlFor="URL">
            URL
          </FormLabel>
          {' '}
          <Formboot.Control
            className="input"
            type="text"
            id="URL"
            name="URL"
            onChange={ handleInputChange }
          />
        </Formboot.Group>
      </Row>
      <span className="renderPasswordSpan">
        {renderPasswordValidation()}
      </span>
      <div className="btn-register-cancel">
        <Button
          variant="primary"
          size="sm"
          type="submit"
          disabled={ !isFormValid() }
        >
          Cadastrar

        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={ cancelClick }
        >
          Cancelar

        </Button>
      </div>
    </Formboot>
  );
}

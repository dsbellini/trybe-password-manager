import React, { FormEvent, useState } from 'react';
import Swal from 'sweetalert2';
import eyeClosed from '../images/eye-closed.svg';
import eyeOpen from '../images/eye-open.svg';

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
      <ul>
        <p>A senha deve:</p>
        <li className={ password.length >= 8 ? validPassword : invalidPassword }>
          Possuir 8 ou mais caracteres
        </li>
        <li className={ password.length <= 16 ? validPassword : invalidPassword }>
          Possuir até 16 caracteres
        </li>
        <li className={ /\d/.test(password) ? validPassword : invalidPassword }>
          Possuir letras e números
        </li>
        <li className={ /[!@#$%^&*]/.test(password) ? validPassword : invalidPassword }>
          Possuir algum caractere especial
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
    <form onSubmit={ handleRegisterButton }>
      <label htmlFor="service-name">
        Nome do Serviço
        <input
          type="text"
          id="service-name"
          name="name"
          onChange={ handleInputChange }
          required
        />
      </label>
      <label htmlFor="login">
        Login
        <input
          type="text"
          id="login"
          name="login"
          onChange={ handleInputChange }
          required
        />
      </label>
      <label htmlFor="password">
        Senha
        <input
          type={ showPasswordButton }
          id="password"
          name="password"
          onChange={ handleInputChange }
          required
        />
      </label>

      <button
        data-testid="show-hide-form-password"
        onClick={ handleButtonHidePassword }
      >
        {showPasswordButton === 'text' ? <img
          src={ eyeClosed }
          alt="eye closed"
        /> : <img src={ eyeOpen } alt="eye open" /> }
      </button>

      <label htmlFor="URL">
        URL
        <input
          type="text"
          id="URL"
          name="URL"
          onChange={ handleInputChange }
        />

      </label>
      {renderPasswordValidation()}
      <button
        type="submit"
        disabled={ !isFormValid() }
      >
        Cadastrar

      </button>
      <button
        onClick={ cancelClick }
      >
        Cancelar

      </button>
    </form>
  );
}

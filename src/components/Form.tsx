import React, { FormEvent, useState } from 'react';

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
          type="password"
          id="password"
          name="password"
          onChange={ handleInputChange }
          required
        />
      </label>
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

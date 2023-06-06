type FormProps = {
  cancelFunction: () => void;
};

export default function Form({ cancelFunction }: FormProps) {
  return (
    <form action="">
      <label htmlFor="service-name">
        Nome do serviço
        <input type="text" id="service-name" />
      </label>
      <label htmlFor="login">
        Login
        <input type="text" id="login" />
      </label>
      <label htmlFor="password">
        Senha
        <input type="password" id="password" />
      </label>
      <label htmlFor="url">
        URL
        <input type="text" id="url" />
      </label>
      <button>Cadastrar</button>
      <button onClick={ cancelFunction }>Cancelar</button>
    </form>
  );
}

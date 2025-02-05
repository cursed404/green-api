import { useState } from "react";

// ввод учетных данных и телефона

const Login = ({ onLogin }) => {
  const [idInstance, setIdInstance] = useState("");
  const [apiTokenInstance, setApiTokenInstance] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ idInstance, apiTokenInstance, phone });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="IdInstance"
        value={idInstance}
        onChange={(e) => setIdInstance(e.target.value)}
      />
      <input
        type="text"
        placeholder="ApiTokenInstance"
        value={apiTokenInstance}
        onChange={(e) => setApiTokenInstance(e.target.value)}
      />
      <input
        type="text"
        placeholder="Номер"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <button type="submit">Войти</button>
    </form>
  );
};

export default Login;
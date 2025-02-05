import { useState } from "react";
import Chat from "./Chat";
import Login from "./Login";
import "./App.css";

const App = () => {
  const [credentials, setCredentials] = useState(null);

  const handleLogin = (data) => {
    setCredentials(data);
  };

  return (
    <div>
      {!credentials ? (
        <Login onLogin={handleLogin} />
      ) : (
        <Chat
          idInstance={credentials.idInstance}
          apiTokenInstance={credentials.apiTokenInstance}
          phone={credentials.phone}
        />
      )}
    </div>
  );
};

export default App;
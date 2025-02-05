import { useState, useEffect } from "react";
import axios from "axios";

const Chat = ({ idInstance, apiTokenInstance, phone }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = async () => {
    try {
      const response = await axios.post(
        `https://api.green-api.com/waInstance${idInstance}/SendMessage/${apiTokenInstance}`,
        {
          chatId: `${phone}@c.us`,
          message: newMessage,
        }
      );
      setMessages([...messages, { text: newMessage, type: "outgoing" }]);
      setNewMessage("");
    } catch (error) {
      console.error("Ошибка при отправке сообщения:", error);
    }
  };

  const receiveMessage = async () => {
    try {
      const response = await axios.get(
        `https://api.green-api.com/waInstance${idInstance}/ReceiveNotification/${apiTokenInstance}`
      );
      if (response.data) {
        const messageData = response.data.body.messageData;
        setMessages([
          ...messages,
          { text: messageData.textMessage, type: "incoming" },
        ]);
        // удаляем уведомление после обработки
        await axios.delete(
          `https://api.green-api.com/waInstance${idInstance}/DeleteNotification/${apiTokenInstance}/${response.data.receiptId}`
        );
      }
    } catch (error) {
      console.error("Ошибка при получении сообщения:", error);
    }
  };

  useEffect(() => {
    const interval = setInterval(receiveMessage, 5000); // проверка новых сообщений каждые 5 секунд
    return () => clearInterval(interval);
  }, [messages]);

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <div key={index} className={msg.type}>
            {msg.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Отправить</button>
    </div>
  );
};

export default Chat;
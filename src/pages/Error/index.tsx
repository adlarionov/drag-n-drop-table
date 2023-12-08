import styles from "./Error.module.css";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/load");
  };

  return (
    <div className={styles.error_container}>
      <h3>Упс... Похоже вы ошиблись страницей.</h3>
      <p>
        Возможно вы неправильно ввели ссылку на свою страницу, либо такой
        страницы еще нет :(
      </p>
      <button onClick={handleHomeClick}>На главную</button>
    </div>
  );
};

export default Error;

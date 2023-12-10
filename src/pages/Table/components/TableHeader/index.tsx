import styles from "./TableHeader.module.css";

const TableHeader = () => {
  return (
    <thead style={{ fontSize: "14px" }}>
      <tr
        key={new Date().getTime() - 1}
        style={{
          borderBottom: "2px solid #C0C0C0",
        }}
      >
        <td
          style={{
            padding: "18px 0px 18px 36px",
            borderRight: "1px solid #C0C0C0",
            maxWidth: "150px",
          }}
        >
          Имя
        </td>
        <td className={styles.header_tablecell}>Номер телефона</td>
        <td className={styles.header_tablecell}>email</td>
        <td
          className={styles.header_tablecell}
          style={{
            maxWidth: "100px",
          }}
        >
          День рождения
        </td>
        <td className={styles.header_tablecell}>Адрес</td>
      </tr>
    </thead>
  );
};

export default TableHeader;

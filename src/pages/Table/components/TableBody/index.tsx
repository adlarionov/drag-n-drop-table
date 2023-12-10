import parsePhone from "../../../../hooks/parsePhone";
import IUser from "../../../../types/IUser";
import styles from "./TableBody.module.css";

const TableBody = ({ userData }: { userData: IUser[] }) => {
  return (
    <tbody style={{ fontSize: "12px" }}>
      {userData.map((user, id) => (
        <tr className={styles.body_tablerow} key={new Date().getTime() + id}>
          <td style={{ padding: "18px 0px 18px 36px", maxWidth: "175px" }}>
            <p
              className={styles.text_ellipsis}
              style={{
                maxWidth: "300px",
              }}
            >
              {user.name}
            </p>
          </td>
          <td className={styles.body_tablecell}>
            <p
              className={styles.text_ellipsis}
              style={{
                maxWidth: "100px",
              }}
            >
              {parsePhone(user.phone)}
            </p>
          </td>
          <td
            className={styles.body_tablecell}
            style={{
              maxWidth: "100px",
            }}
          >
            <p
              className={styles.text_ellipsis}
              style={{
                textDecoration: "underline",
                maxWidth: "175px",
              }}
            >
              {user.email}
            </p>
          </td>
          <td className={styles.body_tablecell} style={{ maxWidth: "100px" }}>
            {user.bday}
          </td>
          <td className={styles.body_tablecell}>{user.address}</td>
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;

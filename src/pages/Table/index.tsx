import { useState } from "react";
import useData from "../../hooks/useData";
import IUser from "../../types/IUser";
import { Navigate, useNavigate } from "react-router-dom";
import TableHeader from "./components/TableHeader";
import TableBody from "./components/TableBody";

const Table = () => {
  const navigate = useNavigate();
  const { getData, deleteData } = useData;
  const [userData, setUserData] = useState<IUser[]>(getData());

  const handleUploadNewFile = () => {
    deleteData();
    setUserData([]);
    navigate("/load");
  };

  console.log(userData);

  return userData.length > 0 ? (
    <section>
      <div
        style={{
          margin: "18px 14px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
        }}
      >
        <button onClick={handleUploadNewFile}>Загрузить новый файл</button>
      </div>
      <table
        align="right"
        style={{
          width: "97.5%",
          background: "white",
          marginLeft: "32px",
          borderTopLeftRadius: "10px",
          borderCollapse: "collapse",
        }}
      >
        <TableHeader />
        <TableBody userData={userData} />
      </table>
    </section>
  ) : (
    <Navigate to="/load" />
  );
};

export default Table;

import { ChangeEvent, useEffect, useRef, useState } from "react";
import UploadModal from "./components/UploadModal";
import CSVToArray from "../../hooks/parseData";
import IUser from "../../types/IUser";
import useData from "../../hooks/useData";
import styles from "./LoadFile.module.css";
import { useNavigate } from "react-router-dom";

const LoadFile = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isErrorVisible, setIsErrorVisible] = useState<boolean>(false);
  const [userData, setUserData] = useState<IUser[]>([]);
  const [isDragged, setIsDragged] = useState<boolean>(false);
  const { setData, getData } = useData;

  const uploadFile = () => {
    inputRef.current?.click();
  };

  const readFile = (file: File) => {
    const reader = new FileReader();

    reader.readAsText(file, "windows-1251");

    if (reader) {
      reader.onload = () => {
        if (reader.result) {
          const result = CSVToArray(reader.result.toString());
          for (let i = 0; i < result.length; i += 5) {
            setUserData((prevUser) => {
              return [
                ...prevUser,
                {
                  name: result[i],
                  phone: result[i + 1],
                  email: result[i + 2],
                  bday: result[i + 3],
                  address: result[i + 4],
                },
              ];
            });
          }
        }
      };

      reader.onerror = () => {
        setIsErrorVisible(true);
        setTimeout(() => setIsErrorVisible(false), 3000);
        console.error("Error reading file");
      };
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      setIsErrorVisible(true);
      setTimeout(() => setIsErrorVisible(false), 3000);
      return;
    }
    if (!e.target.files[0].name.includes(".csv")) {
      setIsErrorVisible(true);
      setTimeout(() => setIsErrorVisible(false), 3000);
      return;
    }

    readFile(e.target.files[0]);
  };

  useEffect(() => {
    const temp = getData();
    if (temp.length > 0 || userData.length > 0) navigate("/table");
  }, [getData, navigate, userData]);

  useEffect(() => {
    if (userData.length > 0) {
      setData(JSON.stringify(userData));
    }
  }, [userData, setData]);

  return (
    <div
      className={styles.load_file_container}
      style={{ border: isDragged ? "2px #6346b4 dashed" : "none" }}
      onDragEnter={(event) => {
        setIsDragged(true);
        event.preventDefault();
        console.log("enter", event);
      }}
      onDragLeave={(event) => {
        setIsDragged(false);
        console.log("leave", event);
      }}
      onDragEnd={(event) => {
        setIsDragged(false);
        console.log("end", event);
      }}
      onDragOver={(event) => event.preventDefault()}
      onDrop={(event) => {
        setIsDragged(false);
        if (event.dataTransfer.items) {
          [...event.dataTransfer.items].forEach((item, i) => {
            if (item.kind === "file") {
              const file = item.getAsFile();
              if (file) readFile(file);
              console.log(`… file[${i}].name = ${file?.name}`);
            }
          });
        } else {
          [...event.dataTransfer.files].forEach((file, i) => {
            console.log(`… file[${i}].name = ${file.name}`);
          });
        }
        event.preventDefault();
        console.log("drop", event);
      }}
    >
      <p>Выберите файл в формате CSV</p>

      <button onClick={uploadFile}>Выберите файл</button>
      <input
        type="file"
        onChange={onChange}
        ref={inputRef}
        style={{ display: "none" }}
      />

      {isErrorVisible && <UploadModal />}
    </div>
  );
};

export default LoadFile;

import { ChangeEvent, useRef, useState } from "react";
import UploadModal from "./components/UploadModal";
import Papa from 'papaparse';

const LoadFile = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  const uploadFile = () => {
    inputRef.current?.click();
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    if (!e.target.files[0].name.includes(".csv")) {
      setShowModal(true);
      return;
    }

    Papa.parse(e.target.files[0], {
      header: true,
      skipEmptyLines: true,
      encoding: 'windows-1251',
      complete: (result) => {
        console.log(result);
      }
    })
  };

  return (
    <div
      style={{
        margin: "0 auto",
        marginTop: "25vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "75px",
        background: "white",
        borderRadius: "10px",
        boxShadow: "2px 4px 9.9px 0px rgba(0, 0, 0, 0.25)",
        textAlign: "center",
        maxWidth: "823px",
        height: "367px",
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

      {showModal && <UploadModal />}
    </div>
  );
};

export default LoadFile;

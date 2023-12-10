import { createPortal } from "react-dom";

const UploadModal = () => {
  return createPortal(
    <div
      style={{
        width: "fit-content",
        margin: "0 auto",
        position: "absolute",
        top: 10,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: "#FF6565",
        color: "white",
        padding: "30px 50px",
        borderRadius: "10px",
        boxShadow: "2px 4px 9.9px 0px rgba(0, 0, 0, 0.25)",
      }}
    >
      <p>Неправильный формат файла, разрешены только файлы .CSV</p>
    </div>,
    document.getElementById("modal") as HTMLElement
  );
};

export default UploadModal;

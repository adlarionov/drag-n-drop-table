import { ChangeEvent, useRef, useState } from "react";
import UploadModal from "./components/UploadModal";
import IUser from "../../types/IUser";

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

    const reader = new FileReader();

    reader.readAsText(e.target.files[0], "windows-1251");

    if (reader) {
      reader.onload = () => {
        function CSVToArray(strData: string): IUser {
          // Create a regular expression to parse the CSV values.
          const objPattern = new RegExp(
            // Delimiters.
            "(\\" +
              "," +
              "|\\r?\\n|\\r|^)" +
              // Quoted fields.
              '(?:"([^"]*(?:""[^"]*)*)"|' +
              // Standard fields.
              '([^"\\' +
              "," +
              "\\r\\n]*))",
            "gi"
          );

          // Create an array to hold our data. Give the array
          // a default empty first row.
          const arrData: IUser[] = [];

          // Create an array to hold our individual pattern
          // matching groups.
          let arrMatches = null;

          // Keep looping over the regular expression matches
          // until we can no longer find a match.
          while ((arrMatches = objPattern.exec(strData))) {
            // Get the delimiter that was found.
            const strMatchedDelimiter = arrMatches[1];

            // Check to see if the given delimiter has a length
            // (is not the start of string) and if it matches
            // field delimiter. If id does not, then we know
            // that this delimiter is a row delimiter.
            if (strMatchedDelimiter.length && strMatchedDelimiter != ",") {
              // Since we have reached a new row of data,
              // add an empty row to our data array.
              arrData.push();
              // continue;
            }

            let strMatchedValue: IUser;

            // Now that we have our delimiter out of the way,
            // let's check to see which kind of value we
            // captured (quoted or unquoted).
            if (arrMatches[2]) {
              // We found a quoted value. When we capture
              // this value, unescape any double quotes.
              const temp = arrMatches[2].replace(new RegExp('""', "g"), '"');
              console.log(temp, "here1");
            } else {
              // We found a non-quoted value.
              const temp = arrMatches[3];
              console.log(temp, "here2");
            }

            // Now that we have our value string, let's add
            // it to the data array.
            // arrData[arrData.length - 1].push(strMatchedValue);
          }

          // Return the parsed data.
          // return arrData.slice(0, -1);
          return;
        }
        if (reader.result) console.log(CSVToArray(reader.result.toString()));

        // if (reader.result) {
        //   const readerDataString = reader.result.toString();
        //   const addressFixes = readerDataString.replace('"', "");
        //   const withoutRN = addressFixes.replace("\r\n", ",");
        //   const value = withoutRN.split(",");
        //   console.log(value);
        // }
      };

      reader.onerror = () => {
        setShowModal(true);
        console.error("Error reading file");
      };
    }
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

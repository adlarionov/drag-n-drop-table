/**
 * Преобразует данные из CSV файла в текстовый массив
 *
 * @param {string} strData - CSV-строка, которую нужно преобразовать.
 * @return {string[]} - итоговый массив со всеми элементами таблицы.
 */
export default function CSVToArray(strData: string): string[] {
  // Регулярное выражение, с которым сравнивается CSV данные.
  const objPattern = new RegExp(
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
  const arrData: string[] = [];

  let arrMatches = null;

  // В цикле проверка данных на соответствие паттерну выше
  while ((arrMatches = objPattern.exec(strData))) {
    // сравнение с паттерном кладется в массив arrMatches, из которого уже далее берутся данные
    const strMatchedDelimiter = arrMatches[1];

    // точка выхода из цикла
    if (strMatchedDelimiter.length && strMatchedDelimiter != ",") {
      arrData.push();
    }

    let strMatchedValue: string = "";

    if (arrMatches[2]) {
      strMatchedValue = arrMatches[2].replace(new RegExp('""', "g"), '"');
    } else {
      strMatchedValue = arrMatches[3];
    }

    arrData.push(strMatchedValue);
  }

  return arrData.slice(0, -1);
}

const getData = () => {
  const data = localStorage.getItem("data");
  if (data) return JSON.parse(data);
  else return;
};
const setData = (data: string) => {
  localStorage.setItem("data", JSON.stringify(data));
};
const deleteData = () => {
  localStorage.removeItem("data");
};

const useData = {
  getData,
  setData,
  deleteData,
};

export default useData;

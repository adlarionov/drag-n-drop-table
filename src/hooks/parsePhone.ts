export default function parsePhone(phone: string): string {
  if (phone.length === 12) {
    const resultPhone =
      phone.slice(0, 2) +
      " " +
      phone.slice(2, 5) +
      " " +
      phone.slice(5, 8) +
      " " +
      phone.slice(8, 10) +
      " " +
      phone.slice(10);
    return resultPhone;
  } else {
    const resultPhone =
      phone.slice(0, 1) +
      " " +
      phone.slice(1, 4) +
      " " +
      phone.slice(4, 7) +
      " " +
      phone.slice(7, 9) +
      " " +
      phone.slice(9);
    return resultPhone;
  }
}

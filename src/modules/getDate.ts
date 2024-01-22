export const getDateFormated = () => {
    const today = new Date();
    const month = today.toLocaleString("en", { month: "long" });
    const year = today.getFullYear();
    const date = today.getDate();
    return `${date} ${month} ${year}`;
  };

export const getDate= () => {
    return new Date()
}
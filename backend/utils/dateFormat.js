export const formatTime = (date) => {
  return new Date(date).toLocaleTimeString("en-IN");
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-IN");
};

// export { formatDate, formatTime };
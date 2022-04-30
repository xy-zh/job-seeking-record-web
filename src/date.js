const month = new Date().getMonth() + 1;
const day = new Date().getDate();
const year = new Date().getFullYear();

export const today = month + '/' + day + '/' + year;
export const dateRegex = /^(0?[1-9]|1[012])[\/](0?[1-9]|[12][0-9]|3[01])[\/]\d{4}$/;
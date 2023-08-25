const options = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  timezone: 'UTC'
};
console.log(new Date("2023-08-25").toLocaleString("ru", options).replace('.', '').replace('г.', ''));

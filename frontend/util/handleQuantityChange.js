export const handleQuantityChange = (e) => {
  const {value} = e.target;
  let cleanedValue = value.replace(/[^0-9]/g, '');

  let newValue = cleanedValue === '' ? '' : parseInt(cleanedValue, 10);

  if (!newValue.length && newValue === 0) {
    newValue = '';
  }

  if (!isNaN(newValue)) {
    return newValue;
  }
};

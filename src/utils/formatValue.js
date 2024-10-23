const formatValue = (num) => {
  const arr = num.toString().split('');
  const length = arr.length;
  const hundreds = arr[length - 3];
  const thousands = arr.filter((_num, index) => index < length - 3).join('');

  const value = hundreds <= 0 ? `${thousands}k` : `${thousands}.${hundreds}k`;

  if (num > 999) {
    return value;
  }
  return num;
};

export default formatValue;

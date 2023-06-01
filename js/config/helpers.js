const currencyConverter = function (amount) {
  return amount * 138.65;
};

export const currencyFormatter = function (currency) {
  // Convert currency to KSH
  const ksh = currencyConverter(currency);

  // Format the currency
  return new Intl.NumberFormat(navigator.language, {
    style: 'currency',
    currency: 'KSH',
  }).format(ksh);
};

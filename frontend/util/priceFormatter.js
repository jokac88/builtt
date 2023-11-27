export const priceFormatter = price => new Intl.NumberFormat('sr-RS', {minimumFractionDigits: 0})
    .format(price);

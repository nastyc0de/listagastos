const formatQuantity = (quantity) => {
    return new Intl.NumberFormat(
        'en-us',
        {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits:2
        }
    ).format(quantity);
}
 
export default formatQuantity;
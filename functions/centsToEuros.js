export const centsToEuros = (priceBigMacInCents) => {
    let price = `€ ${priceBigMacInCents / 100}`
    if (price.length < 4) {
        price = `${price},-`
    } else if (price.length < 6) {
        price = `${price}0`
    }
    return price
};
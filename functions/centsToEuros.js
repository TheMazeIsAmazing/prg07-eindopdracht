export const centsToEuros = (priceBigMacInCents) => {
    let price = `€ ${priceBigMacInCents / 100}`; // Convert cents to euros by dividing by 100
    if (price.length < 4) {
        price = `${price},-`; // Add comma and dash if price has only one or two digits
    } else if (price.length < 6) {
        price = `${price}0`; // Add trailing zero if price has three or four digits
    }
    return price; // Return the formatted price as a string
};
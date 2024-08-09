/**
 * @typedef {{id: string, name: string, stamps: number, freeCoffee: number}} CustomerData
 */

/**
 *
 * @param {CustomerData[]} customers
 * @returns {number} next id to use
 */
export function findHighestCustomerId(customers) {
    const allIds = customers.map((n) => Number(n.id));
    return Math.max(...allIds);
}

/**
 *
 * @param {CustomerData[]} customers
 * @param {string} id
 * @returns {CustomerData}
 */
export function findCustomerById(customers, id) {
    return customers.find((oneCustomer) => oneCustomer.id === id);
}

/**
 *
 * @param {CustomerData} customer
 * @param {number} newNumOfStamps
 */
export function setCustomerStampsAndFreeCoffees(customer, newNumOfStamps) {
    customer.stamps = newNumOfStamps;

    let stamps = newNumOfStamps;
    let freeCoffee = customer.freeCoffee || 0;

    if (stamps >= 6) {
        freeCoffee += Math.floor(stamps / 6);
        stamps = stamps % 6;
    }

    customer.stamps = stamps;
    customer.freeCoffee = freeCoffee;
}
/**
 *
 * @param {CustomerData} customer
 * @returns {boolean}
 */
export function tryToRedeemOneFreeCoffee(customer) {
    if (customer.freeCoffee > 0) {
        customer.freeCoffee--;
        return true;
    }
    return false;
}

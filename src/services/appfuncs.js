export function getCartInLocalStorage() {
  const cartItems = JSON.parse(localStorage.getItem('cartItems'));
  if (cartItems) return cartItems;
  return { items: [], cartTotalPrice: 0, cartTotalItems: 0 };
}

export function saveCartInLocalStorage() {
  const { cartItems } = this.state;
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

export function sum(numA, numB, digits) {
  const total = (numA + numB).toFixed(digits);
  return Number(total);
}

export function subtract(numA, numB, digits) {
  const difference = (numA - numB).toFixed(digits);
  return Number(difference);
}

export async function getCategories() {
  const url = 'https://api.mercadolibre.com/sites/MLB/categories';
  const resposta = await fetch(url);

  return resposta.json();
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const url = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;

  const resposta = await fetch(url);

  return resposta.json();
}

export async function getProductsFromQuery(query) {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
  const response = await fetch(url);

  return response.json();
}

export async function getProductDetais(productId) {
  const url = `https://api.mercadolibre.com/items/${productId}`;
  const response = await fetch(url);

  return response.json();
}

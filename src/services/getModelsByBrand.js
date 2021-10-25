export async function getModelsByBrand(brand) {
  const resp = await fetch('http://127.0.0.1:3001/api/phones/brands/' + brand)
    .then(data => data.json())
  return resp;
}
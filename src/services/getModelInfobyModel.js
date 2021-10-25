export async function getModelInfoByModel(id) {
    const resp = await fetch('http://127.0.0.1:3001/api/phones/phones1/' + id)
      .then(data => data.json())
    return resp;
}
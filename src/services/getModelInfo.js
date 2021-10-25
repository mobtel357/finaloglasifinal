export async function getModelInfo(id) {
    const resp = await fetch('http://127.0.0.1:3001/api/phones/phones/' + id)
      .then(data => data.json())
    return resp;
}
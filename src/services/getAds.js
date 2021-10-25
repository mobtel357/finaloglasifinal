export async function getAds() {
    const resp = await fetch('http://127.0.0.1:3001/api/advertises/')
      .then(data => data.json())
    return resp;
}
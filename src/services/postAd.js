


export async function postAd(data) {
    console.log(JSON.stringify(data));

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
	
            "advertisment":{
            "phoneid": data.phoneid,
            "description": data.description,
            "user": "192913000",
            "date_created" : 20211018,
            "old": 1,
            "price": data.price
            }
        })
    };
    const resp = await fetch('http://127.0.0.1:3001/api/advertises/', requestOptions)
    .then(response => response.json())
    return resp;
}
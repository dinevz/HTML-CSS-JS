



async function getData(url) {
    try {
        const response = await fetch(`${url}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false`);
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`)
        }
        const data = await response.json()
        return data;
    } catch (e) {
        console.log('getData: ', e);
    }

}

// let myPromise = await getData(url);
// myPromise.forEach(element => {
//     console.log(element.image);
// });

export {getData};
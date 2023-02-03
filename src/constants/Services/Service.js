const getData = async (API) => {
    const response = await fetch(API);
    return data = await response.json();
};


const getDictionaryData = async (text) =>{
    const URL = `https://api.dictionaryapi.dev/api/v2/entries/en/${text}`
    const response = await fetch(URL); 
    return data = await response.json();
}


export {getData, getDictionaryData};

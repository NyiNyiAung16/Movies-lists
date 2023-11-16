export default (value,setName) => {
    let dataArray;
    let localStorageContent = localStorage.getItem(setName);
    if(localStorageContent === null) {
        dataArray = []
    }else{
       dataArray = JSON.parse(localStorageContent)
    }
    const data = {
        id:dataArray.length,
        data:value
    };
    dataArray.push(data);
    localStorage.setItem(setName,JSON.stringify(dataArray));
    return dataArray;
}

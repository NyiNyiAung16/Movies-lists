export default (id,propsId) => {
    let giveStars;
    let localStorageContent = JSON.parse(localStorage.getItem(`stars${propsId}`));
    if(localStorageContent === null){
        giveStars = [];
    }else{
       giveStars = localStorageContent;
    }
    if(!giveStars.includes(id)){
        giveStars.push(id);
    }else{
        giveStars = giveStars.filter((star) => {
            return star !== id;
        })
    }
    localStorage.setItem(`stars${propsId}`,JSON.stringify(giveStars));
    return giveStars;
}
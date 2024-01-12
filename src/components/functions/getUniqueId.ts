/**
 * Функция для генерации нового уникального Id
 */

const getUniqueId:Function = (arrId:[string]) => {
    let newId = parseInt((Math.random()*100000).toString()).toString();
    while (arrId.includes(newId.toString())) newId = parseInt((Math.random()*100000).toString()).toString();
    return newId;
}

export {getUniqueId}
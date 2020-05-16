const url = `https://covid19.mathdro.id/api`;

export const fetchCountryData = async country => {
    try {
        const data = await (await (fetch(`${url}/countries/${country}`))).json()
        return data;
    }
    catch(error) {
        return 'error';
    }
}

export const fetchWorldData = async () => {
    try {
        const worldData = await (await (fetch(url))).json();
        return worldData;
    }
    catch(error) {
        return 'error';
    }
}

export const commands = [
    '-świat',
    '-kraj <kraj który chcesz wyszukać>'
];

export const capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

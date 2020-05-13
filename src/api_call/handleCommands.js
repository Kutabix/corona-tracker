import { fetchCountryData, fetchWorldData } from './data';

export const handleSingleCountryQuery = async (country, annyang, setData) => {
    try {
        const data = await fetchCountryData(country);
        if(data === 'error') throw new Error('error');
        const result = [
            { value: data.confirmed.value, type: 'confirmed' },
            { value: data.recovered.value, type: 'recovered' },
            { value: data.deaths.value, type: 'deaths' }
        ]
        setData({ result, country });
    } catch(error) {
        setData([`Cannot find country named ${country}`]);
    }
    annyang.abort()
}

export const handleWorldQuery = async (annyang, setData) => {
    try {
        const data = await fetchWorldData();
        const result = [
            { value: data.confirmed.value, type: 'confirmed' },
            { value: data.recovered.value, type: 'recovered' },
            { value: data.deaths.value, type: 'deaths' }
        ];
        setData(result);
    } catch(error) {
        console.log(error);
    }
    annyang.abort();
}

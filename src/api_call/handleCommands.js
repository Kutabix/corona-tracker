import { fetchCountryData, fetchWorldData } from './data';

export const handleSingleCountryQuery = async (country, annyang, setData, real) => {
    try {
        const data = await fetchCountryData(country);
        if(data === 'error') throw new Error('error');
        const result = [
            { value: data.confirmed.value, type: 'potwierdzono' },
            { value: data.recovered.value, type: 'wyzdrowiało' },
            { value: data.deaths.value, type: 'zmarło' }
        ]
        setData({ result, country });
    } catch(error) {
        setData([`Nie odnaleziono kraju: ${real}`]);
    }
    annyang.abort()
}

export const handleWorldQuery = async (annyang, setData) => {
    try {
        const data = await fetchWorldData();
        const result = [
            { value: data.confirmed.value, type: 'potwierdzono' },
            { value: data.recovered.value, type: 'wyzdrowiało' },
            { value: data.deaths.value, type: 'zmarło' }
        ];
        setData(result);
    } catch(error) {
        console.log(error);
    }
    annyang.abort();
}

export const handleUnknownCommand = (unknown, annyang, setErrorMessage) => {
    setErrorMessage(unknown);
    annyang.abort();
}

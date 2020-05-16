import React from 'react';
import Chart from './Chart';

export const CountryChart = ({ data: { singleCountryData: [conf, rec, deaths], country } }) => {
    const props = {
        confirmed: conf.value,
        recovered: rec.value,
        deaths: deaths.value,
        country
    }
    return <Chart data={props} />
}

export const WorldChart = ({ data: { worldData } }) => {
    const props = {
        confirmed: worldData[0].value,
        recovered: worldData[1].value, 
        deaths: worldData[2].value,
        country: "świat"
    }
    return <Chart data={props} />
}

import React from 'react';
import { Bar } from 'react-chartjs-2';

const Chart = ({ data: { confirmed, recovered, deaths, country } }) => {
    const data = {
        labels: ['Potwierdzono', 'Wyzdrowiało', 'Zmarło'],
        datasets: [{     
            backgroundColor: ['rgb(45, 25, 185)', 'rgb(15, 230, 32)', 'rgb(210, 21, 56)'],
            borderColor: ['#0275d8', '#5cb85c', '#d9534f'],
            borderWidth: 1,
            hoverBackgroundColor: ['rgb(43, 23, 182)', 'rgb(12, 227, 29)', 'rgb(207, 18, 53)'],
            hoverBorderColor: 'black',
            data: [confirmed, recovered, deaths],
          }]
      }
      const options = {
        maintainAspectRatio: true,
        title: {
            display: true,
            text: `Wyświetlam dane dla: ${country}`
        },
        legend: {
            display: false
        }
      }
      
    return ( 
        <Bar data={data} options={options} />
    )
}

export default Chart;
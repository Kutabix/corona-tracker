import React, { useState } from 'react';
import annyang from 'annyang';
import CountUp from 'react-countup';  
import styled, { createGlobalStyle } from 'styled-components';
import { commands, capitalizeFirstLetter } from './api_call/data';
import { handleSingleCountryQuery, handleWorldQuery, handleUnknownCommand } from './api_call/handleCommands';
import { CountryChart, WorldChart } from './components/RenderChart';
import dictionary, { names, enToPol } from './dictionaries/dictionary';
import Logo from './components/Logo';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: #effffe;
    font-family: 'Montserrat', sans-serif;
  }
  *::before, *::after {
    box-sizing: border-box;
  }
`

const Button = styled.button`
  display: block;
  padding: 20px; 
  outline: none;
  margin: 10px;
  border: none;
  color: white;
  font-size: 16px;
  background-color: #5ac2fe;
  margin-left: auto;
  margin-right: auto;
  width: 240px;
  transition: all .3s ease;
  &:hover {
    transform: scale(1.1);
    background-color: #49b1ed;
    cursor: pointer;
  }
`;

const Typography = styled.p`
  @media(max-width: 768px) {
    font-size: 14px;
  }
  text-align: center;
  font-size: ${({ type }) => !type ? '16px' : '22px'};
  color: ${({ type }) => type === 'confirmed' ? 'rgb(45, 25, 185)' : type === 'recovered' ? 'rgb(15, 230, 32)' : (type === 'deaths' || type === 'error') ? 'rgb(210, 21, 56)' : 'black'};
`; 

const ChartContainer = styled.div`
  @media(max-width: 768px) {
    max-width: 100%;
    max-height: 100%;
    margin: 10px;
  }
  @media(min-width: 1000px) {
    max-width: 60%;
    max-height: 35%;  
  }
  max-width: 50%;
  max-height: 50%;
  margin-left: auto;
  margin-right: auto;
`;

function App() {
  const [showListCommands, setShowListCommands] = useState(false);
  const [singleCountryData, setSingleCountryData] = useState(null);
  const [worldData, setWorldData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const setStates = () => {
    setSingleCountryData(null);
    setWorldData(null);
    setErrorMessage('');
  }

  const voiceCommands = () => {
    setStates();
    if(annyang) {
      annyang.setLanguage('pl');
      annyang.addCommands({
        'świat': async () => handleWorldQuery(annyang, setWorldData),
        'kraj *country': async country => handleSingleCountryQuery(dictionary[country], annyang, setSingleCountryData, country),
        '*unknown': unknown => handleUnknownCommand(unknown, annyang, setErrorMessage),
      }); 
      annyang.start();
    }
  }

  return (
    <div className="App">
      <GlobalStyle />
      <p style={{margin: 0, padding: 0, textAlign: 'center'}}>
        <p style={{fontSize: '34px', display:'inline-block'}}>C</p><Logo /><p style={{fontSize: '34px', display:'inline-block'}}>VID-19</p>
      </p>
      <Button onClick={() => setShowListCommands(!showListCommands)}>Pokaż / Schowaj komendy</Button>
      { showListCommands && ( 
        commands.map((command, i) => (
          <Typography key={i}>{command}</Typography>
        ))
      ) }
      <Button onClick={() => voiceCommands()}>Zacznij mówić</Button>
      { worldData && (
          worldData.map(({ value, type }, i) => (
            <Typography key={i} type={names[type]}>{capitalizeFirstLetter(type)} na świecie: {<CountUp end={value} duration={3} separator={' '} />}</Typography> 
          ))
      ) }
      {
        (singleCountryData && singleCountryData.length !== 1) && (
          singleCountryData.result.map(({ value, type }, i) => (
            <Typography key={i} type={names[type]}>{capitalizeFirstLetter(type)} w {enToPol[capitalizeFirstLetter(singleCountryData.country)]}: {<CountUp end={value} duration={3} separator={' '} />}</Typography>
          ))
        )
      } 
      {
        (singleCountryData !== null && singleCountryData.length === 1) && (
          <Typography type="error">{singleCountryData[0]}</Typography>
        )
      }
      {
        errorMessage && (
          <Typography type="error">Nieznana komenda: {errorMessage}</Typography>
        )
      }
      <ChartContainer>
        { (singleCountryData && singleCountryData.result && singleCountryData.result.length === 3 ) ?
            <CountryChart data={{ singleCountryData: singleCountryData.result, country: enToPol[singleCountryData.country] }} /> 
            : (worldData && worldData.length === 3) ?  
            <WorldChart data={{worldData}} /> : <div></div>
        }
      </ChartContainer>
    </div>
  );
}

export default App;
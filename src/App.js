import React, { useState } from 'react';
import annyang from 'annyang';
import CountUp from 'react-countup';    
import styled, { createGlobalStyle } from 'styled-components';
import { commands, capitalizeFirstLetter } from './api_call/data';
import { handleSingleCountryQuery, handleWorldQuery } from './api_call/handleCommands';

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
  margin: 20px;
  border: none;
  color: white;
  font-size: 18px;
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
  text-align: center;
  font-size: ${({ type }) => !type ? '16px' : '22px'};
  color: ${({ type }) => type === 'confirmed' ? 'rgb(45, 25, 185)' : type === 'recovered' ? 'rgb(15, 230, 32)' : (type === 'deaths' || type === 'error') ? 'rgb(210, 21, 56)' : 'black'};
`; 

function App() {
  const [showListCommands, setShowListCommands] = useState(false);
  const [singleCountryData, setSingleCountryData] = useState(null);
  const [worldData, setWorldData] = useState(null);
  
  const voiceCommands = () => {
    setSingleCountryData(null);
    setWorldData(null);
    if(annyang) {
      annyang.setLanguage('pl', 'en-us');
      annyang.addCommands({
        'how many covid cases in the world': async () => handleWorldQuery(annyang, setWorldData),
        'how many covid cases in *country': async country => handleSingleCountryQuery(country, annyang, setSingleCountryData),
      }); 
      annyang.start();
    }
  }

  return (
    <div className="App">
      <GlobalStyle />
      <Button onClick={() => setShowListCommands(!showListCommands)}>list / unlist commands</Button>
      { showListCommands && (
        commands.map((command, i) => (
          <Typography key={i}>{command}</Typography>
        ))
      ) }
      <Button onClick={() => voiceCommands()}>Start talking</Button>
      { worldData && (
          worldData.map(({ value, type }, i) => (
            <Typography key={i} type={type}>{capitalizeFirstLetter(type)} in the world: {<CountUp end={value} duration={3} separator={' '} />}</Typography> 
          ))
      ) }
      {
        (singleCountryData && singleCountryData.length !== 1) && (
          singleCountryData.result.map(({ value, type }, i) => (
            <Typography key={i} type={type}>{capitalizeFirstLetter(type)} cases in {singleCountryData.country}: {<CountUp end={value} duration={3} separator={' '} />}</Typography>
          ))
        )
      } 
      {
        (singleCountryData !== null && singleCountryData.length === 1) && (
          <Typography type="error">{singleCountryData[0]}</Typography>
        )
      }
    </div>
  );
}

export default App;
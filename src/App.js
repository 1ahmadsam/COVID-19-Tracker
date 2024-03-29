import React, { useState, useEffect } from 'react';
import './App.css';
import {
  MenuItem,
  FormControl,
  Card,
  CardContent,
  Select,
} from '@material-ui/core';
import InfoBox from './InfoBox';
import LineGraph from './LineGraph';
import Table from './Table';
import { sortData, prettyPrintStat } from './util';
import numeral from 'numeral';
import Map from './Map';
import 'leaflet/dist/leaflet.css';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './theme';
import { GlobalStyles } from './global';
import { useDarkMode } from './useDarkMode';
import Toggle from './Toggle';

const App = () => {
  const [theme, toggleTheme, componentMounted] = useDarkMode();

  const [country, setInputCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [countries, setCountries] = useState([]);
  const [mapCountries, setMapCountries] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [casesType, setCasesType] = useState('cases');
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);

  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/all')
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      fetch('https://disease.sh/v3/covid-19/countries')
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          let sortedData = sortData(data);
          setCountries(countries);
          setMapCountries(data);
          setTableData(sortedData);
        });
    };

    getCountriesData();
  }, []);

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;

    const url =
      countryCode === 'worldwide'
        ? 'https://disease.sh/v3/covid-19/all'
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setInputCountry(countryCode);
        setCountryInfo(data);
        if (countryCode === 'worldwide') {
          setMapCenter({ lat: 34.80746, lng: -40.4796 });
        } else {
          setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        }
        setMapZoom(4);
      });
  };
  const themeMode = theme === 'light' ? lightTheme : darkTheme;
  if (!componentMounted) {
    return <div />;
  }

  // const countryOptions = countries.map((country) => ({
  //   key: country.name,
  //   value: country.value,
  //   text: country.name,
  // }));
  // console.log(countryOptions);
  return (
    <ThemeProvider theme={themeMode}>
      <GlobalStyles />
      <div className='app'>
        <div className='app__left'>
          <div className='app__header'>
            <h1>COVID-19 Tracker</h1>
            <div className='app__headerRight'>
              <FormControl className='app__dropdown'>
                <Select
                  variant='outlined'
                  value={country}
                  onChange={onCountryChange}
                >
                  <MenuItem value='worldwide'>Worldwide</MenuItem>
                  {countries.map((country) => (
                    <MenuItem key={country.name} value={country.value}>
                      {country.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Toggle theme={theme} toggleTheme={toggleTheme} />
            </div>
          </div>
          <div className='app__stats'>
            <InfoBox
              onClick={(e) => setCasesType('cases')}
              title='Coronavirus Cases'
              isRed
              active={casesType === 'cases'}
              cases={prettyPrintStat(countryInfo.todayCases)}
              total={numeral(countryInfo.cases).format('0.0a')}
            />
            <InfoBox
              onClick={(e) => setCasesType('recovered')}
              title='Recovered'
              active={casesType === 'recovered'}
              cases={prettyPrintStat(countryInfo.todayRecovered)}
              total={numeral(countryInfo.recovered).format('0.0a')}
            />
            <InfoBox
              onClick={(e) => setCasesType('deaths')}
              title='Deaths'
              isRed
              active={casesType === 'deaths'}
              cases={prettyPrintStat(countryInfo.todayDeaths)}
              total={numeral(countryInfo.deaths).format('0.0a')}
            />
          </div>
          <Map
            countries={mapCountries}
            casesType={casesType}
            center={mapCenter}
            zoom={mapZoom}
          />
        </div>
        <Card className='app__right'>
          <CardContent>
            <div className='app__information'>
              <h3>Live Cases by Country</h3>
              <Table countries={tableData} />
              <h3 className='app__informationHeader'>
                {countryInfo?.countryInfo && (
                  <img
                    src={countryInfo?.countryInfo?.flag}
                    alt=''
                    className='app__flag'
                  />
                )}
                {countryInfo?.country || 'Worldwide'} new {casesType}
              </h3>
              <LineGraph casesType={casesType} countryCode={country} />
            </div>
          </CardContent>
        </Card>
      </div>
    </ThemeProvider>
  );
};

export default App;

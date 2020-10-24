import React, { useState, useEffect, useContext } from 'react';
import { Line } from 'react-chartjs-2';
import numeral from 'numeral';
import { ThemeContext } from 'styled-components';

const options = (theme) => {
  return {
    legend: {
      display: false,
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    maintainAspectRatio: false,
    tooltips: {
      mode: 'index',
      intersect: false,
      callbacks: {
        label: function (tooltipItem, data) {
          return numeral(tooltipItem.value).format('+0,0');
        },
      },
    },
    scales: {
      xAxes: [
        {
          type: 'time',
          time: {
            format: 'MM/DD/YY',
            tooltipFormat: 'll',
          },
          ticks: {
            fontColor: `${theme?.text}`,
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            // Include a dollar sign in the ticks
            callback: function (value, index, values) {
              return numeral(value).format('0a');
            },
            fontColor: `${theme?.text}`,
          },
        },
      ],
    },
  };
};

const buildChartData = (data, casesType) => {
  let chartData = [];
  let lastDataPoint;
  for (let date in data.cases) {
    if (lastDataPoint) {
      let newDataPoint = {
        x: date,
        y: data[casesType][date] - lastDataPoint,
      };
      chartData.push(newDataPoint);
    }
    lastDataPoint = data[casesType][date];
  }
  return chartData;
};

function LineGraph({ casesType, countryCode }) {
  const [data, setData] = useState({});

  const themeContext = useContext(ThemeContext);
  useEffect(() => {
    const url =
      countryCode === 'worldwide'
        ? 'https://disease.sh/v3/covid-19/historical/all?lastdays=120'
        : `https://disease.sh/v3/covid-19/historical/${countryCode}?lastdays=120`;
    const fetchData = async () => {
      await fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          let chartData;
          if (countryCode === 'worldwide') {
            chartData = buildChartData(data, casesType);
          } else {
            chartData = buildChartData(data?.timeline, casesType);
          }
          setData(chartData);
        });
    };

    fetchData();
  }, [casesType, countryCode]);

  return (
    <div>
      {data?.length > 0 && (
        <Line
          data={{
            datasets: [
              {
                backgroundColor: 'rgba(204, 16, 52, 0.5)',
                borderColor: '#CC1034',
                data: data,
              },
            ],
          }}
          options={options(themeContext)}
        />
      )}
    </div>
  );
}

export default LineGraph;

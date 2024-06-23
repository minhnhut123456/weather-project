import { useEffect, useState } from 'react';
import { Spin } from 'antd';
import { getForecast5DayByLocation } from '@/apis/openWeather';
import Block from '@/components/Block';
import { Weather } from '@/types/openWeather';
import { getLocation } from '@/utils/storage';
import styled from 'styled-components';
import { format } from 'date-fns';
import { weatherIconMapping } from '@/constants/weatherIconMapping';

const Title = styled.div`
  font-weight: 600;
  margin-bottom: 0.5rem;
`;
const DateTitle = styled.div`
  color: ${({ theme }) => theme.color.colorGrey};
  margin-bottom: 0.5rem 0;
`;
const TimeTitle = styled.div`
  font-weight: 600;
  font-size: 14px;
`;
const Temp = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.color.colorGrey};
`;
const Description = styled.div`
  font-weight: 600;
  font-size: 13px;
`;
const WeatherWrapper = styled.div`
  align-items: center;
  justify-content: space-between;
  display: flex;
  margin: 1rem 0;

  img {
    height: 35px;
    margin: 0 0.5rem;
  }
`;

const WeatherLeft = styled.div`
  align-items: center;
  display: flex;
`;

function formatDate(str: string) {
  const [dateGroup, time] = str.split(' ');
  const [year, month, date] = dateGroup.split('-');
  const [hour, minute, second] = time.split(':');

  return [year, month, date, hour, minute, second];
}

function groupData(weatherData: Weather[]) {
  const group: Weather[][] = [];

  let prev: Weather | null = null;
  let idx = 0;
  weatherData.forEach((item) => {
    if (prev) {
      const [yearCur, monthCur, dateCur] = formatDate(item.dt_txt);
      const [yearPrev, monthPrev, datePrev] = formatDate(prev.dt_txt);

      if (yearCur !== yearPrev || monthCur !== monthPrev || dateCur !== datePrev) {
        idx++;
      }
    }

    if (!group[idx]) {
      group[idx] = [item];
    } else {
      group[idx].push(item);
    }

    prev = item;
  });

  return group;
}

function renderUI(forecastData: Weather[][]) {
  return (
    <div>
      <Title>5-day Forecast(3 Hours)</Title>
      <Block>
        {forecastData.map((forecastDay, idx) => {
          return (
            <div key={idx}>
              <DateTitle>{format(new Date(forecastDay[0].dt_txt), 'dd MMMM')}</DateTitle>
              {forecastDay.map(
                ({ id, main: { temp_min, temp_max }, dt_txt, weather }) => {
                  const { description, icon } = weather[0];

                  return (
                    <WeatherWrapper key={id}>
                      <WeatherLeft>
                        <TimeTitle>{format(new Date(dt_txt), 'HH:mm')}</TimeTitle>
                        <img src={weatherIconMapping[icon]} alt='' />
                        <Temp>
                          {temp_min}/{temp_max}&deg;C
                        </Temp>
                      </WeatherLeft>
                      <Description>{description}</Description>
                    </WeatherWrapper>
                  );
                },
              )}
            </div>
          );
        })}
      </Block>
    </div>
  );
}

function Forecast() {
  const [loading, setLoading] = useState(true);
  const [forecastData, setForecastData] = useState<Weather[][] | null>(null);

  useEffect(() => {
    async function getData(lat: number, lon: number) {
      try {
        const res = await getForecast5DayByLocation(lat, lon);
        setForecastData(groupData(res));
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }
    const location = getLocation();
    if (location) {
      getData(location.lat, location.lon);
    }
  }, []);

  if (loading) {
    return (
      <Block>
        <Spin />
      </Block>
    );
  }

  if (!forecastData) {
    return <Block />;
  }

  return renderUI(forecastData);
}

export default Forecast;

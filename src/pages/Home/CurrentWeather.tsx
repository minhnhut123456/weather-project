import { useEffect, useState } from 'react';
import { Spin } from 'antd';
import { getCurrentWeatherData } from '@/apis/openWeather';
import Block from '@/components/Block';
import { Weather } from '@/types/openWeather';
import { getLocation } from '@/utils/storage';
import styled from 'styled-components';
import { format } from 'date-fns';
import { FORMAT_DATE_FULL } from '@/constants/common';
import { weatherIconMapping } from '@/constants/weatherIconMapping';

const Wrapper = styled.div`
  margin: 1rem 0;
`;

const Temp = styled.div`
  font-size: 28px;
  font-weight: 700;
`;

const WeatherWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0.75rem 0;
`;

const Detail = styled.div`
  display: flex;
  justify-content: space-around;
`;

const InfoTitle = styled.div`
  color: ${({ theme }) => theme.color.colorGrey};
  font-size: 14px;
  text-align: center;
`;

const InfoNumber = styled.div`
  font-weight: 600;
  text-align: center;
`;

const InfoNumberSuf = styled.span`
  margin-left: 0.3rem;
  font-size: 13px;
`;

function renderUI(weatherData: Weather) {
  const {
    dt,
    main: { temp, humidity },
    weather,
    visibility,
    wind: { speed },
  } = weatherData;
  const dateStr = format(new Date(dt * 1000), FORMAT_DATE_FULL);
  const { description, icon } = weather[0];

  return (
    <Wrapper>
      <Block>
        <div>{dateStr}</div>
        <WeatherWrapper>
          <img src={weatherIconMapping[icon]} alt='' />
          <div>
            <Temp>{temp}&deg;C</Temp>
            <div>{description}</div>
          </div>
        </WeatherWrapper>

        <Detail>
          <div>
            <InfoTitle>Humidity</InfoTitle>
            <InfoNumber>
              {humidity}
              <InfoNumberSuf>%</InfoNumberSuf>
            </InfoNumber>
          </div>

          <div>
            <InfoTitle>Winds</InfoTitle>
            <InfoNumber>
              {speed}
              <InfoNumberSuf>m/s</InfoNumberSuf>
            </InfoNumber>
          </div>

          <div>
            <InfoTitle>Visibility</InfoTitle>
            <InfoNumber>
              {visibility / 1000}
              <InfoNumberSuf>km</InfoNumberSuf>
            </InfoNumber>
          </div>
        </Detail>
      </Block>
    </Wrapper>
  );
}

function CurrentWeather() {
  const [loading, setLoading] = useState(true);
  const [weatherData, setWeatherData] = useState<Weather | null>(null);

  useEffect(() => {
    async function getData(lat: number, lon: number) {
      try {
        const res = await getCurrentWeatherData(lat, lon);
        setWeatherData(res);
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
      <Wrapper>
        <Block>
          <Spin />
        </Block>
      </Wrapper>
    );
  }

  if (!weatherData) {
    return (
      <Wrapper>
        <Block />
      </Wrapper>
    );
  }

  return renderUI(weatherData);
}

export default CurrentWeather;

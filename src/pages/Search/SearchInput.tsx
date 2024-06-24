import { getGeocoding } from '@/apis/openWeather';
import { Geocoding } from '@/types/openWeather';
import Block from '@/components/Block';
import { Input } from 'antd';
import debounce from 'lodash/debounce';
import { useCallback, useState } from 'react';
import styled from 'styled-components';
import Loading from '@/components/Loading';
import { getHistorySearch, storeHistorySearch, storeLocation } from '@/utils/storage';
import { useNavigate } from 'react-router-dom';

import trashIcon from './trash.svg';

const HistoryItemLeft = styled.div`
  width: 100%;
`;

const HistoryItem = styled.div`
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    color: #2f54eb;
  }

  &:not(:last-child) {
    margin-bottom: 1rem;
  }

  img {
    height: 18px;
  }
`;

const Title = styled.div`
  font-weight: 600;
  margin: 1rem 0;
`;

const StyledInput = styled(Input)`
  margin: 1.5rem 0 0 0;
`;

const Item = styled.div`
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    color: #2f54eb;
  }

  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

function SearchInput() {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [locations, setLocations] = useState<Geocoding[]>([]);
  const [searchHistory, setSearchHistory] = useState<Geocoding[]>(
    getHistorySearch() || [],
  );

  function handleClick(item: Geocoding) {
    const listFiltered = searchHistory.filter((subItem) => item.name !== subItem.name);

    const curHistory =
      listFiltered.length >= 5
        ? [item, ...listFiltered.slice(0, 4)]
        : [item, ...listFiltered];

    storeLocation(item);
    storeHistorySearch(curHistory);
    setSearchHistory(curHistory);
    navigate('/');
  }

  function handleDelete(item: Geocoding) {
    const curHistory = searchHistory.filter((subItem) => item.name !== subItem.name);
    storeHistorySearch(curHistory);
    setSearchHistory(curHistory);
  }

  const fetchLocations = useCallback(async (curVal: string) => {
    try {
      setLoading(true);
      const res = await getGeocoding(curVal);
      setLocations(res);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      setLocations([]);
    }
  }, []);

  const debounceFn = useCallback(
    debounce((curVal: string) => {
      const formatedCurVal = curVal.trim();

      if (!formatedCurVal) {
        setLocations([]);
        return;
      }

      fetchLocations(formatedCurVal);
    }, 500),
    [fetchLocations],
  );

  return (
    <div>
      <StyledInput
        value={value}
        onChange={(e) => {
          const curVal = e.target.value;
          setValue(curVal);
          debounceFn(curVal);
        }}
        placeholder='Search country or city heare...'
      ></StyledInput>

      {loading ? (
        <Block>
          <Loading />
        </Block>
      ) : (
        <>
          {locations.length ? (
            <Block>
              {locations.map((item, idx) => (
                <Item
                  key={idx}
                  onClick={() => {
                    handleClick(item);
                  }}
                >
                  {item.name}, {item.country}
                </Item>
              ))}
            </Block>
          ) : null}
        </>
      )}

      {searchHistory.length ? (
        <>
          <Title>Search history</Title>
          <Block>
            {searchHistory.map((item, idx) => (
              <HistoryItem key={idx}>
                <HistoryItemLeft
                  onClick={() => {
                    handleClick(item);
                  }}
                >
                  {item.name}, {item.country}
                </HistoryItemLeft>
                <img
                  src={trashIcon}
                  alt=''
                  onClick={() => {
                    handleDelete(item);
                  }}
                />
              </HistoryItem>
            ))}
          </Block>
        </>
      ) : null}
    </div>
  );
}

export default SearchInput;

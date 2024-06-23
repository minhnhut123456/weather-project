import Block from '@/components/Block';
import searchIcon from './search.svg';
import locationIcon from './location.svg';
import styled from 'styled-components';
import { getLocation } from '@/utils/storage';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  img {
    height: 18px;
  }
`;

const LeftWrapper = styled.div`
  display: flex;
  font-weight: 700;
`;

function Header() {
  const location = getLocation();

  return (
    <Block>
      <Wrapper>
        <LeftWrapper>
          <img src={locationIcon} alt='' style={{ marginRight: '0.5rem' }} />
          {location && `${location.name}, ${location.country}`}
        </LeftWrapper>
        <img src={searchIcon} alt='' />
      </Wrapper>
    </Block>
  );
}

export default Header;

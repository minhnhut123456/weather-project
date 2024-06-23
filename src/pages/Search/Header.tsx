import Block from '@/components/Block';
import locationIcon from '@/assets/images/common/location.svg';
import styled from 'styled-components';
import { getLocation } from '@/utils/storage';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;

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
  const navigate = useNavigate();

  return (
    <Block>
      <Wrapper
        onClick={() => {
          navigate('/');
        }}
      >
        <LeftWrapper>
          <img src={locationIcon} alt='' style={{ marginRight: '0.5rem' }} />
          {location && `${location.name}, ${location.country}`}
        </LeftWrapper>
      </Wrapper>
    </Block>
  );
}

export default Header;

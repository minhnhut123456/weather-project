import { Spin } from 'antd';
import styled from 'styled-components';

const Wrapper = styled.div`
  text-align: center;
`;

function Loading() {
  return (
    <Wrapper>
      <Spin />
    </Wrapper>
  );
}

export default Loading;

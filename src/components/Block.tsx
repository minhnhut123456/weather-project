import { ReactNode } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  background: #fff;
  padding: 1rem;
  border-radius: 10px;
`;

function Block({ children }: { children?: ReactNode }) {
  return <Wrapper>{children}</Wrapper>;
}

export default Block;

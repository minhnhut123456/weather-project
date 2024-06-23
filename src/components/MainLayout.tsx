import { ReactNode } from 'react';
import styled from 'styled-components';

const Layout = styled.div`
  background: #a8d1fa4d;
  min-height: var(--window-height);
  padding: 1rem;

  @media (min-width: 461px) {
    padding: 50px 0;
  }
`;

const Wrapper = styled.div`
  max-width: 411px;
  margin: 0 auto;
  width: 100%;
`;

function MainLayout({ children }: { children: ReactNode }) {
  return (
    <Layout>
      <Wrapper>{children}</Wrapper>
    </Layout>
  );
}

export default MainLayout;

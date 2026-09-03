'use client';

import Link from 'next/link';
import styled from 'styled-components';

export function Header() {
  return (
    <HeaderContainer>
      <HeaderInner>
        <Logo href="/">
          EVENT<span>SHOP</span>
        </Logo>

        <Navigation>
          <NavLink href="/">
            Eventos
          </NavLink>
        </Navigation>
      </HeaderInner>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;

  border-bottom: 1px solid #292929;

  background: rgba(10, 10, 10, 0.9);

  backdrop-filter: blur(12px);
`;

const HeaderInner = styled.div`
  width: min(1200px, calc(100% - 40px));

  min-height: 72px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  margin: 0 auto;
`;

const Logo = styled(Link)`
  color: #ffffff;

  font-size: 1.2rem;
  font-weight: 800;
  letter-spacing: 0.08rem;

  span {
    color: #d4af37;
  }
`;

const Navigation = styled.nav`
  display: flex;
  align-items: center;
  gap: 24px;
`;

const NavLink = styled(Link)`
  color: #a0a0a0;

  font-size: 0.9rem;

  transition: color 0.2s ease;

  &:hover {
    color: #ffffff;
  }
`;
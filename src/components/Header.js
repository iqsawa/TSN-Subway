import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 24px 0;
  margin-bottom: 32px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  text-align: center;
`;

const Title = styled.h1`
  margin: 0 0 8px 0;
  font-size: 36px;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const Subtitle = styled.p`
  margin: 0;
  font-size: 18px;
  opacity: 0.9;
  font-weight: 300;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <HeaderContent>
        <Title>🚇 星轨通</Title>
        <Subtitle>城市地铁出行助手 - 智能路线查询与规划</Subtitle>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;

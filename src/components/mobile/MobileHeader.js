import React from 'react';
import styled from 'styled-components';

const MobileHeaderContainer = styled.header`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 16px 20px;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 0.5px;
`;

const Subtitle = styled.p`
  margin: 4px 0 0 0;
  font-size: 14px;
  opacity: 0.9;
`;

const MobileHeader = () => {
  return (
    <MobileHeaderContainer>
      <Title>星轨通</Title>
      <Subtitle>星落之夜轨道交通官方App</Subtitle>
    </MobileHeaderContainer>
  );
};

export default MobileHeader;
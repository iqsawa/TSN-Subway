import React from 'react';
import styled from 'styled-components';

const BottomNavContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 8px 0;
  z-index: 1000;
`;

const NavItem = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: none;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  color: ${props => props.$active ? '#667eea' : '#666'};
  font-size: 12px;
  transition: color 0.3s ease;
  
  &:hover {
    color: #667eea;
  }
`;

const NavIcon = styled.div`
  font-size: 20px;
  margin-bottom: 4px;
`;

const MobileBottomNav = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'planner', label: '路线规划', icon: '🗺️' },
    { id: 'nearby', label: '附近站点', icon: '📍' },
    { id: 'map', label: '线路图', icon: '🚇' }
  ];

  return (
    <BottomNavContainer>
      {tabs.map(tab => (
        <NavItem
          key={tab.id}
          $active={activeTab === tab.id}
          onClick={() => onTabChange(tab.id)}
        >
          <NavIcon>{tab.icon}</NavIcon>
          {tab.label}
        </NavItem>
      ))}
    </BottomNavContainer>
  );
};

export default MobileBottomNav;
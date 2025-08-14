import React, { useState } from 'react';
import styled from 'styled-components';
import Header from './components/Header';
import RoutePlanner from './components/RoutePlanner';
import NoticeBoard from './components/NoticeBoard';
import MetroMap from './components/MetroMap';
import StationDetail from './components/StationDetail';
import NearbyStations from './components/NearbyStations';
import LineInfo from './components/LineInfo';
import MobileHeader from './components/mobile/MobileHeader';
import MobileRoutePlanner from './components/mobile/MobileRoutePlanner';
import MobileNearbyStations from './components/mobile/MobileNearbyStations';
import MobileMetroMap from './components/mobile/MobileMetroMap';
import MobileBottomNav from './components/mobile/MobileBottomNav';
import { useMobileDetect } from './utils/deviceDetect';

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  align-items: start;
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const MobileContainer = styled.div`
  min-height: 100vh;
  background: #f5f5f5;
  padding-bottom: 60px;
`;

function App() {
  const isMobile = useMobileDetect();
  const [activeTab, setActiveTab] = useState('planner');

  if (isMobile) {
    return (
      <MobileContainer>
        <MobileHeader />
        {activeTab === 'planner' && <MobileRoutePlanner />}
        {activeTab === 'nearby' && <MobileNearbyStations />}
        {activeTab === 'map' && <MobileMetroMap />}
        <MobileBottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      </MobileContainer>
    );
  }

  return (
    <AppContainer>
      <Header />
      <ContentContainer>
        <LeftColumn>
          <RoutePlanner />
          <NoticeBoard />
        </LeftColumn>
        <RightColumn>
          <MetroMap />
          <StationDetail />
          <NearbyStations />
          <LineInfo />
        </RightColumn>
      </ContentContainer>
    </AppContainer>
  );
}

export default App;

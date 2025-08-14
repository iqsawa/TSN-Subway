import React from 'react';
import styled from 'styled-components';

const DetailContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;
`;

const DetailHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid #eee;
`;

const StationName = styled.h2`
  margin: 0;
  color: #333;
  font-size: 28px;
  font-weight: 700;
`;

const StationLine = styled.div`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 16px;
  color: white;
  font-size: 14px;
  font-weight: 600;
`;

const DetailSection = styled.div`
  margin-bottom: 24px;
`;

const SectionTitle = styled.h3`
  margin: 0 0 16px 0;
  color: #333;
  font-size: 20px;
  font-weight: 600;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const InfoLabel = styled.span`
  color: #666;
  font-size: 14px;
  margin-bottom: 4px;
`;

const InfoValue = styled.span`
  color: #333;
  font-size: 16px;
  font-weight: 500;
`;

const ExitList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const ExitItem = styled.div`
  padding: 12px 16px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
`;

const ExitName = styled.div`
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
`;

const ExitInfo = styled.div`
  font-size: 14px;
  color: #666;
`;

const StationDetail = ({ station }) => {
  if (!station) return null;

  // 模拟站点详细信息
  const mockDetails = {
    id: station.id,
    name: station.name,
    nameZh: station.nameZh,
    lineName: station.lineName,
    lineColor: station.lineColor,
    openTime: '05:30',
    closeTime: '23:30',
    facilities: ['无障碍电梯', '自动扶梯', '卫生间', '便利店'],
    exits: [
      { id: 1, name: 'A出口', location: '中山路与南京街交叉口', landmarks: ['万达广场', '中兴大厦'] },
      { id: 2, name: 'B出口', location: '中山路与太原街交叉口', landmarks: ['恒隆广场', '伊势丹'] },
      { id: 3, name: 'C出口', location: '中山路与青年大街交叉口', landmarks: ['地铁商城', '城市广场'] }
    ]
  };

  return (
    <DetailContainer>
      <DetailHeader>
        <StationName>{mockDetails.nameZh}</StationName>
        <StationLine style={{ background: mockDetails.lineColor }}>
          {mockDetails.lineName}
        </StationLine>
      </DetailHeader>

      <DetailSection>
        <SectionTitle>基本信息</SectionTitle>
        <InfoGrid>
          <InfoItem>
            <InfoLabel>英文名称</InfoLabel>
            <InfoValue>{mockDetails.name}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>首班车</InfoLabel>
            <InfoValue>{mockDetails.openTime}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>末班车</InfoLabel>
            <InfoValue>{mockDetails.closeTime}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>所属线路</InfoLabel>
            <InfoValue>{mockDetails.lineName}</InfoValue>
          </InfoItem>
        </InfoGrid>
      </DetailSection>

      <DetailSection>
        <SectionTitle>服务设施</SectionTitle>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          {mockDetails.facilities.map((facility, index) => (
            <div 
              key={index}
              style={{
                padding: '8px 16px',
                background: '#e3f2fd',
                color: '#1976d2',
                borderRadius: '16px',
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              {facility}
            </div>
          ))}
        </div>
      </DetailSection>

      <DetailSection>
        <SectionTitle>出入口信息</SectionTitle>
        <ExitList>
          {mockDetails.exits.map(exit => (
            <ExitItem key={exit.id}>
              <ExitName>{exit.name}</ExitName>
              <ExitInfo>{exit.location}</ExitInfo>
              <ExitInfo>
                <strong>地标:</strong> {exit.landmarks.join('、')}
              </ExitInfo>
            </ExitItem>
          ))}
        </ExitList>
      </DetailSection>
    </DetailContainer>
  );
};

export default StationDetail;
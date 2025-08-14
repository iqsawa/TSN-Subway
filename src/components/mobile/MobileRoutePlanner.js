import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import routePlannerService from '../../utils/routePlanner.js';
import { metroLines } from '../../data/metroData.js';

const MobileRoutePlannerContainer = styled.div`
  padding: 16px;
  background: white;
  min-height: 100vh;
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const SectionTitle = styled.h3`
  margin: 0 0 12px 0;
  font-size: 18px;
  color: #333;
  font-weight: 600;
`;

const InputGroup = styled.div`
  margin-bottom: 16px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  color: #666;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  box-sizing: border-box;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const RouteTypeContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
`;

const RouteTypeButton = styled.button`
  flex: 1;
  padding: 12px;
  border: 1px solid ${props => props.$active ? '#667eea' : '#ddd'};
  border-radius: 8px;
  background: ${props => props.$active ? '#667eea' : 'white'};
  color: ${props => props.$active ? 'white' : '#666'};
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #667eea;
  }
`;

const SearchButton = styled.button`
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.3s ease;
  
  &:hover {
    opacity: 0.9;
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ResultsContainer = styled.div`
  margin-top: 20px;
`;

const RouteResult = styled.div`
  background: #f8f9fa;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
`;

const RouteHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const RouteInfo = styled.div`
  font-size: 14px;
  color: #666;
`;

const StationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StationItem = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
  }
`;

const StationDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #667eea;
  margin-right: 12px;
`;

const StationName = styled.span`
  font-size: 14px;
  color: #333;
`;

const MobileRoutePlanner = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [routeType, setRouteType] = useState('shortest');
  const [route, setRoute] = useState(null);
  const [loading, setLoading] = useState(false);
  const [stations, setStations] = useState([]);
  const [originSearch, setOriginSearch] = useState('');
  const [destinationSearch, setDestinationSearch] = useState('');
  const [originResults, setOriginResults] = useState([]);
  const [destinationResults, setDestinationResults] = useState([]);
  const [showOriginResults, setShowOriginResults] = useState(false);
  const [showDestinationResults, setShowDestinationResults] = useState(false);

  useEffect(() => {
    const loadStations = async () => {
      try {
        const allStations = await routePlannerService.getAllStations();
        setStations(allStations);
      } catch (error) {
        console.error('Failed to load stations:', error);
      }
    };
    loadStations();
  }, []);

  // 搜索站点函数 - 与桌面端相同算法
  const searchStations = (query) => {
    if (!query.trim()) return [];
    
    const term = query.toLowerCase();
    return stations.filter(station => {
      const matchesName = station.name.toLowerCase().includes(term);
      const matchesNameZh = station.nameZh.toLowerCase().includes(term);
      return matchesName || matchesNameZh;
    });
  };

  // 实时搜索 - 起点
  useEffect(() => {
    const results = searchStations(originSearch);
    setOriginResults(results);
    setShowOriginResults(results.length > 0 && originSearch.length > 0);
  }, [originSearch, stations]);

  // 实时搜索 - 终点
  useEffect(() => {
    const results = searchStations(destinationSearch);
    setDestinationResults(results);
    setShowDestinationResults(results.length > 0 && destinationSearch.length > 0);
  }, [destinationSearch, stations]);

  const handleOriginSelect = (station) => {
    setOrigin(station.id);
    setOriginSearch(station.name);
    setShowOriginResults(false);
  };

  const handleDestinationSelect = (station) => {
    setDestination(station.id);
    setDestinationSearch(station.name);
    setShowDestinationResults(false);
  };

  const getStationLine = (stationId) => {
    const lines = Object.values(metroLines || {});
    return lines.find(line => line.stations.some(s => s.id === stationId));
  };

  const getLineBetweenStations = (station1Id, station2Id) => {
    const lines = Object.values(metroLines || {});
    return lines.find(line => {
      const hasStation1 = line.stations.some(s => s.id === station1Id);
      const hasStation2 = line.stations.some(s => s.id === station2Id);
      return hasStation1 && hasStation2;
    });
  };

  const handleSearch = async () => {
    if (!origin || !destination) return;
    
    setLoading(true);
    try {
      const calculatedRoute = await routePlannerService.findShortestPath(
        origin.id || origin, 
        destination.id || destination, 
        routeType
      );
      
      // 计算距离和时间
      let totalDistance = 0;
      let totalTime = 0;
      
      if (calculatedRoute && calculatedRoute.path && calculatedRoute.path.length > 1) {
        // 计算总距离（假设每站平均1.2公里）
        totalDistance = (calculatedRoute.path.length - 1) * 1.2;
        
        // 计算总时间（假设每站平均2.5分钟，包含换乘）
        totalTime = (calculatedRoute.path.length - 1) * 2.5;
        
        // 添加换乘时间（每换乘一次加3分钟）
        let transfers = 0;
        for (let i = 1; i < calculatedRoute.path.length - 1; i++) {
          const prevLine = getStationLine(calculatedRoute.path[i-1]);
          const currLine = getStationLine(calculatedRoute.path[i]);
          const nextLine = getStationLine(calculatedRoute.path[i+1]);
          
          if (prevLine && currLine && nextLine) {
            if (prevLine.id !== currLine.id || currLine.id !== nextLine.id) {
              transfers++;
            }
          }
        }
        totalTime += transfers * 3;
      }
      
      setRoute({
        ...calculatedRoute,
        distance: totalDistance.toFixed(1),
        time: Math.round(totalTime)
      });
    } catch (error) {
      console.error('Failed to calculate route:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MobileRoutePlannerContainer>
      <Section>
        <SectionTitle>路线规划</SectionTitle>
        
        <InputGroup>
          <Label>起点</Label>
          <div style={{ position: 'relative' }}>
            <Input
              type="text"
              placeholder="输入起点站名"
              value={originSearch}
              onChange={(e) => setOriginSearch(e.target.value)}
              onFocus={() => setShowOriginResults(true)}
              onBlur={() => setTimeout(() => setShowOriginResults(false), 200)}
            />
            {showOriginResults && originResults.length > 0 && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                background: 'white',
                border: '1px solid #ddd',
                borderRadius: '8px',
                maxHeight: '200px',
                overflowY: 'auto',
                zIndex: 1000,
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}>
                {Array.from(
                      originResults.reduce((acc, station) => {
                        if (!acc.has(station.id)) {
                          acc.set(station.id, []);
                        }
                        const lines = Object.values(metroLines || {});
                        const stationLines = lines.filter(line => 
                          line.stations.some(s => s.id === station.id)
                        );
                        stationLines.forEach(line => {
                          acc.get(station.id).push({
                            ...station,
                            lineName: line.name,
                            lineColor: line.color
                          });
                        });
                        return acc;
                      }, new Map())
                    ).map(([stationId, stationLines]) => (
                      <div key={`origin-${stationId}`}>
                        {stationLines.map((station, index) => (
                          <div
                            key={`origin-${station.id}-${index}`}
                            style={{
                              padding: '12px 16px',
                              cursor: 'pointer',
                              borderBottom: '1px solid #eee',
                              fontSize: '14px'
                            }}
                            onClick={() => handleOriginSelect(station)}
                          >
                            <span style={{
                              display: 'inline-block',
                              padding: '2px 8px',
                              backgroundColor: station.lineColor,
                              color: 'white',
                              borderRadius: '12px',
                              fontSize: '10px',
                              marginRight: '8px'
                            }}>
                              {station.lineName}
                            </span>
                            {station.name} - {station.nameZh}
                          </div>
                        ))}
                      </div>
                    ))}
              </div>
            )}
          </div>
        </InputGroup>

        <InputGroup>
          <Label>终点</Label>
          <div style={{ position: 'relative' }}>
            <Input
              type="text"
              placeholder="输入终点站名"
              value={destinationSearch}
              onChange={(e) => setDestinationSearch(e.target.value)}
              onFocus={() => setShowDestinationResults(true)}
              onBlur={() => setTimeout(() => setShowDestinationResults(false), 200)}
            />
            {showDestinationResults && destinationResults.length > 0 && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                background: 'white',
                border: '1px solid #ddd',
                borderRadius: '8px',
                maxHeight: '200px',
                overflowY: 'auto',
                zIndex: 1000,
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}>
                {Array.from(
                      destinationResults.reduce((acc, station) => {
                        if (!acc.has(station.id)) {
                          acc.set(station.id, []);
                        }
                        const lines = Object.values(metroLines || {});
                        const stationLines = lines.filter(line => 
                          line.stations.some(s => s.id === station.id)
                        );
                        stationLines.forEach(line => {
                          acc.get(station.id).push({
                            ...station,
                            lineName: line.name,
                            lineColor: line.color
                          });
                        });
                        return acc;
                      }, new Map())
                    ).map(([stationId, stationLines]) => (
                      <div key={`destination-${stationId}`}>
                        {stationLines.map((station, index) => (
                          <div
                            key={`destination-${station.id}-${index}`}
                            style={{
                              padding: '12px 16px',
                              cursor: 'pointer',
                              borderBottom: '1px solid #eee',
                              fontSize: '14px'
                            }}
                            onClick={() => handleDestinationSelect(station)}
                          >
                            <span style={{
                              display: 'inline-block',
                              padding: '2px 8px',
                              backgroundColor: station.lineColor,
                              color: 'white',
                              borderRadius: '12px',
                              fontSize: '10px',
                              marginRight: '8px'
                            }}>
                              {station.lineName}
                            </span>
                            {station.name} - {station.nameZh}
                          </div>
                        ))}
                      </div>
                    ))}
              </div>
            )}
          </div>
        </InputGroup>

        <RouteTypeContainer>
          <RouteTypeButton
            $active={routeType === 'shortest'}
            onClick={() => setRouteType('shortest')}
          >
            最短路线
          </RouteTypeButton>
          <RouteTypeButton
            $active={routeType === 'fastest'}
            onClick={() => setRouteType('fastest')}
          >
            最快路线
          </RouteTypeButton>
        </RouteTypeContainer>

        <SearchButton
          onClick={handleSearch}
          disabled={!origin || !destination || loading}
        >
          {loading ? '计算中...' : '搜索路线'}
        </SearchButton>
      </Section>

      {route && (
        <ResultsContainer>
          <SectionTitle>路线结果</SectionTitle>
          <RouteResult>
            <RouteHeader>
              <RouteInfo>
                距离: {route.distance}公里 | 时间: {route.time}分钟
              </RouteInfo>
            </RouteHeader>
            <StationList>
              {route.path.map((stationId, index) => {
                const station = stations.find(s => s.id === stationId);
                const line = getStationLine(stationId);
                const nextStationId = route.path[index + 1];
                const connectingLine = nextStationId ? getLineBetweenStations(stationId, nextStationId) : null;

                return station ? (
                  <StationItem key={index}>
                    <StationDot style={{ backgroundColor: line?.color || '#667eea' }} />
                    <div style={{ flex: 1 }}>
                      <StationName>{station.name}</StationName>
                      {line && (
                        <div style={{ fontSize: '12px', color: '#666', marginTop: '2px' }}>
                          <span style={{
                            display: 'inline-block',
                            padding: '2px 8px',
                            backgroundColor: line.color,
                            color: 'white',
                            borderRadius: '12px',
                            fontSize: '10px',
                            marginRight: '8px'
                          }}>
                            {line.name}
                          </span>
                          {connectingLine && nextStationId && (
                            <span>→ {connectingLine.name} → {stations.find(s => s.id === nextStationId)?.name}</span>
                          )}
                        </div>
                      )}
                    </div>
                  </StationItem>
                ) : null;
              })}
            </StationList>
          </RouteResult>
        </ResultsContainer>
      )}
    </MobileRoutePlannerContainer>
  );
};

export default MobileRoutePlanner;
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import routePlannerService from '../../utils/routePlanner.js';

const MobileNearbyContainer = styled.div`
  padding: 16px;
  background: white;
  min-height: 100vh;
`;

const SearchSection = styled.div`
  margin-bottom: 20px;
`;

const SearchTitle = styled.h3`
  margin: 0 0 12px 0;
  font-size: 18px;
  color: #333;
  font-weight: 600;
`;

const SearchInput = styled.input`
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

const SearchResults = styled.div`
  margin-top: 8px;
  background: white;
  border: 1px solid #eee;
  border-radius: 8px;
  max-height: 200px;
  overflow-y: auto;
`;

const ResultItem = styled.div`
  padding: 12px 16px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  font-size: 14px;
  
  &:hover {
    background: #f5f5f5;
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const StationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const StationCard = styled.div`
  background: #f8f9fa;
  border-radius: 12px;
  padding: 16px;
  border-left: 4px solid #667eea;
`;

const StationName = styled.h4`
  margin: 0 0 8px 0;
  font-size: 16px;
  color: #333;
  font-weight: 600;
`;

const StationInfo = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 4px;
`;

const LineBadge = styled.span`
  display: inline-block;
  padding: 4px 8px;
  background: #667eea;
  color: white;
  border-radius: 12px;
  font-size: 12px;
  margin-right: 4px;
  cursor: pointer;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const LocationButton = styled.button`
  width: 100%;
  padding: 12px;
  background: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  margin-bottom: 16px;
  
  &:hover {
    background: #e0e0e0;
  }
`;

const MobileNearbyStations = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [nearbyStations, setNearbyStations] = useState([]);
  const [allStations, setAllStations] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [metroLines, setMetroLines] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStations = async () => {
      try {
        setLoading(true);
        console.log('Loading stations and lines...');
        
        const stations = await routePlannerService.getAllStations();
        console.log('Stations loaded:', stations.length);
        
        const lines = await routePlannerService.getMetroLines();
        console.log('Lines loaded:', Object.keys(lines).length);
        
        setAllStations(stations);
        setMetroLines(lines);
        setNearbyStations(stations.slice(0, 6));
      } catch (error) {
        console.error('Failed to load stations:', error);
        console.error('Error details:', error.message);
      } finally {
        setLoading(false);
      }
    };
    loadStations();
  }, []);

  // 搜索站点函数 - 与桌面端相同算法
  const searchStations = (query) => {
    if (!query.trim()) return [];
    
    const term = query.toLowerCase();
    return allStations.filter(station => {
      const matchesName = station.name.toLowerCase().includes(term);
      const matchesNameZh = station.nameZh.toLowerCase().includes(term);
      return matchesName || matchesNameZh;
    });
  };

  // 获取站点所在线路信息 - 与桌面端相同算法
  const getStationLines = (stationId) => {
    const lines = Object.values(metroLines || {});
    return lines.filter(line => 
      line.stations && line.stations.some && line.stations.some(s => s.id === stationId)
    );
  };

  // 获取相邻站点 - 与桌面端相同算法
  const getAdjacentStations = (station) => {
    const adjacent = [];
    const stationLines = getStationLines(station.id);
    
    stationLines.forEach(line => {
      const stationIndex = line.stations.findIndex(s => s.id === station.id);
      if (stationIndex > 0) {
        adjacent.push({
          ...line.stations[stationIndex - 1],
          lineName: line.name,
          lineColor: line.color
        });
      }
      if (stationIndex < line.stations.length - 1) {
        adjacent.push({
          ...line.stations[stationIndex + 1],
          lineName: line.name,
          lineColor: line.color
        });
      }
    });
    
    return adjacent;
  };

  useEffect(() => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    const results = searchStations(searchTerm);
    setSearchResults(results);
    setShowResults(true);
  }, [searchTerm, allStations]);

  const handleSelectStation = (station) => {
    // 使用与桌面端相同的算法获取相邻站点
    const adjacentStations = getAdjacentStations(station).slice(0, 5);
    
    setNearbyStations([station, ...adjacentStations]);
    setSearchTerm('');
    setShowResults(false);
    console.log('Selected station:', station.name);
  };

  const handleUseCurrentLocation = () => {
    // 模拟获取当前位置附近的站点
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(() => {
        // 在实际应用中，这里会根据真实位置计算附近站点
        setNearbyStations(allStations.slice(0, 6));
      });
    } else {
      setNearbyStations(allStations.slice(0, 6));
    }
  };

  return (
    <MobileNearbyContainer>
      <SearchSection>
        <SearchTitle>附近站点</SearchTitle>
        {loading && <div style={{ textAlign: 'center', padding: '20px' }}>加载中...</div>}
        <LocationButton onClick={handleUseCurrentLocation}>
          📍 使用当前位置
        </LocationButton>
        <SearchInput
          type="text"
          placeholder="搜索站点名称..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setShowResults(true)}
        />
        {showResults && searchResults.length > 0 && searchTerm.trim() && (
          <SearchResults>
            {Array.from(
              searchResults.reduce((acc, station) => {
                if (!acc.has(station.id)) {
                  acc.set(station.id, []);
                }
                const stationLines = getStationLines(station.id);
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
              <div key={`search-${stationId}`}>
                {stationLines.map((station, index) => (
                  <ResultItem
                    key={`search-${station.id}-${index}`}
                    onClick={() => handleSelectStation(station)}
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
                  </ResultItem>
                ))}
              </div>
            ))}
          </SearchResults>
        )}
      </SearchSection>

      <StationList>
        {nearbyStations.map(station => {
          const stationLines = getStationLines(station.id);
          return (
            <StationCard key={station.id} onClick={() => handleSelectStation(station)}>
              <StationName>{station.name}</StationName>
              <StationInfo>{station.nameZh}</StationInfo>
              <StationInfo>
                {stationLines.map(line => (
                  <LineBadge key={line.id} style={{ backgroundColor: line.color, marginRight: '4px' }}>
                    {line.name}
                  </LineBadge>
                ))}
              </StationInfo>
            </StationCard>
          );
        })}
      </StationList>
    </MobileNearbyContainer>
  );
};

export default MobileNearbyStations;
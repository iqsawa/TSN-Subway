import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import routePlannerService from '../../utils/routePlanner';

const MobileMapContainer = styled.div`
  padding: 16px;
  background: white;
  min-height: 100vh;
`;

const MapTitle = styled.h3`
  margin: 0 0 16px 0;
  font-size: 18px;
  color: #333;
  font-weight: 600;
  text-align: center;
`;

const MapViewContainer = styled.div`
  width: 100%;
  height: 400px;
  border: 1px solid #ddd;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  background: #f8f9fa;
  margin-bottom: 20px;
  cursor: grab;
  
  &:active {
    cursor: grabbing;
  }
`;

const MapImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  user-select: none;
  transition: opacity 0.3s ease;
`;

const SVGMap = styled.svg`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  transform-origin: 0 0;
  transition: transform 0.1s ease-out;
`;

const ToggleButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid #ddd;
  border-radius: 20px;
  font-size: 12px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
  transition: all 0.2s ease;
  
  &:hover {
    background: white;
    transform: translateY(-1px);
  }
`;

const ZoomControls = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 10;
`;

const ZoomButton = styled.button`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid #ddd;
  background: rgba(255, 255, 255, 0.95);
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.2s ease;
  
  &:hover {
    background: white;
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }
  
  &:active {
    transform: translateY(0);
    background: #f8f9fa;
  }
`;

const LinePath = styled.path`
  fill: none;
  stroke-width: 3;
  transition: stroke-width 0.2s ease;
`;

const StationCircle = styled.circle`
  fill: white;
  stroke-width: 2;
  cursor: pointer;
  transition: transform 0.2s ease, r 0.2s ease;
  
  &:hover {
    transform: scale(1.5);
  }
`;

const StationLabel = styled.text`
  font-size: 8px;
  font-weight: 500;
  text-anchor: middle;
  fill: #333;
  pointer-events: none;
  paint-order: stroke;
  stroke: white;
  stroke-width: 1px;
`;

const LineLabel = styled.text`
  font-size: 10px;
  font-weight: bold;
  text-anchor: middle;
  fill: #333;
  paint-order: stroke;
  stroke: white;
  stroke-width: 1px;
`;

const LineList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 20px;
`;

const LineCard = styled.div`
  background: #f8f9fa;
  border-radius: 12px;
  padding: 16px;
  border-left: 4px solid ${props => props.color};
`;

const LineHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const LineName = styled.h4`
  margin: 0;
  font-size: 16px;
  color: #333;
  font-weight: 600;
`;

const StationCount = styled.span`
  font-size: 14px;
  color: #666;
`;

const StationList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const StationTag = styled.span`
  background: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  color: #666;
  border: 1px solid #eee;
`;

const MobileMetroMap = () => {
  const [lines, setLines] = useState({});
  const [stations, setStations] = useState([]);
  const [selectedLine, setSelectedLine] = useState(null);
  const [showImage, setShowImage] = useState(true);
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 });
  const [isDragging, setIsDragging] = useState(false);
  const [isPinching, setIsPinching] = useState(false);
  const [startDragPos, setStartDragPos] = useState({ x: 0, y: 0 });
  const [lastTouchDistance, setLastTouchDistance] = useState(0);
  const [lastTouchCenter, setLastTouchCenter] = useState({ x: 0, y: 0 });
  const mapRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        console.log('Loading metro data...');
        
        const metroData = await routePlannerService.getMetroLines();
        console.log('Metro lines loaded:', Object.keys(metroData).length);
        
        const allStations = await routePlannerService.getAllStations();
        console.log('Stations loaded:', allStations.length);
        
        setLines(metroData);
        setStations(allStations);
      } catch (error) {
        console.error('Failed to load metro data:', error);
        console.error('Error details:', error.message);
      }
    };
    loadData();
  }, []);

  const linesArray = Object.values(lines);

  // 简化的站点坐标映射（基于实际上海地铁布局的近似位置）
  const getStationPosition = (stationName, lineId) => {
    const basePositions = {
      'Line 1': { x: 50, y: 100, direction: 'horizontal' },
      'Line 2': { x: 200, y: 50, direction: 'vertical' },
      'Line 3': { x: 150, y: 150, direction: 'diagonal' },
      'Line 4': { x: 250, y: 200, direction: 'horizontal' },
      'Line 5': { x: 100, y: 250, direction: 'vertical' },
      'Line 6': { x: 300, y: 100, direction: 'horizontal' },
      'Line 7': { x: 180, y: 300, direction: 'diagonal' },
      'Line 8': { x: 120, y: 180, direction: 'vertical' },
      'Line 9': { x: 220, y: 120, direction: 'horizontal' },
      'Line 10': { x: 280, y: 220, direction: 'diagonal' },
      'Line 11': { x: 160, y: 80, direction: 'horizontal' },
      'Line 12': { x: 240, y: 160, direction: 'vertical' },
      'Line 13': { x: 320, y: 140, direction: 'horizontal' },
      'Line 14': { x: 200, y: 280, direction: 'vertical' },
      'Line 15': { x: 140, y: 320, direction: 'diagonal' },
      'Line 16': { x: 260, y: 60, direction: 'horizontal' },
      'Line 17': { x: 180, y: 240, direction: 'vertical' },
      'Line 18': { x: 100, y: 180, direction: 'diagonal' }
    };

    const lineInfo = basePositions[lineId] || { x: 200, y: 200, direction: 'horizontal' };
    const stationIndex = lines[lineId]?.stations?.findIndex(s => s.name === stationName) || 0;
    const totalStations = lines[lineId]?.stations?.length || 1;
    
    let x = lineInfo.x;
    let y = lineInfo.y;
    
    if (lineInfo.direction === 'horizontal') {
      x = 50 + (stationIndex / Math.max(totalStations - 1, 1)) * 300;
    } else if (lineInfo.direction === 'vertical') {
      y = 50 + (stationIndex / Math.max(totalStations - 1, 1)) * 300;
    } else {
      x = 50 + (stationIndex / Math.max(totalStations - 1, 1)) * 300;
      y = 50 + (stationIndex / Math.max(totalStations - 1, 1)) * 300;
    }
    
    return { x, y };
  };

  const toggleView = () => {
    setShowImage(!showImage);
  };

  // 缩放控制
  const zoomIn = useCallback(() => {
    setTransform(prev => ({
      ...prev,
      scale: Math.min(3, prev.scale * 1.2)
    }));
  }, []);

  const zoomOut = useCallback(() => {
    setTransform(prev => ({
      ...prev,
      scale: Math.max(0.5, prev.scale / 1.2)
    }));
  }, []);

  const resetView = useCallback(() => {
    setTransform({ x: 0, y: 0, scale: 1 });
  }, []);



  // 计算两点之间的距离
  const getTouchDistance = (touch1, touch2) => {
    return Math.sqrt(
      Math.pow(touch2.clientX - touch1.clientX, 2) +
      Math.pow(touch2.clientY - touch1.clientY, 2)
    );
  };

  // 计算触摸中心点
  const getTouchCenter = (touch1, touch2) => {
    return {
      x: (touch1.clientX + touch2.clientX) / 2,
      y: (touch1.clientY + touch2.clientY) / 2
    };
  };

  // 鼠标事件处理
  const handleMouseDown = useCallback((e) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    setStartDragPos({
      x: e.clientX - transform.x,
      y: e.clientY - transform.y
    });
  }, [transform.x, transform.y]);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging || isPinching) return;
    
    const deltaX = e.clientX - startDragPos.x;
    const deltaY = e.clientY - startDragPos.y;
    
    setTransform(prev => ({ ...prev, x: deltaX, y: deltaY }));
  }, [isDragging, isPinching, startDragPos.x, startDragPos.y]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  // 触摸事件处理 - 单指拖拽
  const handleTouchStart = useCallback((e) => {
    e.preventDefault();
    
    if (e.touches.length === 1) {
      setIsDragging(true);
      setStartDragPos({
        x: e.touches[0].clientX - transform.x,
        y: e.touches[0].clientY - transform.y
      });
    } else if (e.touches.length === 2) {
      setIsPinching(true);
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      setLastTouchDistance(getTouchDistance(touch1, touch2));
      setLastTouchCenter(getTouchCenter(touch1, touch2));
    }
  }, [transform.x, transform.y]);

  const handleTouchMove = useCallback((e) => {
    e.preventDefault();
    
    if (e.touches.length === 1 && isDragging && !isPinching) {
      const touch = e.touches[0];
      const deltaX = touch.clientX - startDragPos.x;
      const deltaY = touch.clientY - startDragPos.y;
      
      setTransform(prev => ({ ...prev, x: deltaX, y: deltaY }));
    } else if (e.touches.length === 2 && isPinching) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      
      const currentDistance = getTouchDistance(touch1, touch2);
      const currentCenter = getTouchCenter(touch1, touch2);
      
      const scaleFactor = currentDistance / lastTouchDistance;
      const newScale = Math.max(0.5, Math.min(3, transform.scale * scaleFactor));
      
      // 计算缩放中心点的偏移
      const deltaX = currentCenter.x - lastTouchCenter.x;
      const deltaY = currentCenter.y - lastTouchCenter.y;
      
      setTransform(prev => ({
        ...prev,
        scale: newScale,
        x: prev.x + deltaX,
        y: prev.y + deltaY
      }));
      
      setLastTouchDistance(currentDistance);
      setLastTouchCenter(currentCenter);
    }
  }, [isDragging, isPinching, startDragPos.x, startDragPos.y, lastTouchDistance, lastTouchCenter, transform.scale]);

  const handleTouchEnd = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    setIsPinching(false);
    setLastTouchDistance(0);
  }, []);

  // 双击缩放功能
  const handleDoubleClick = useCallback((e) => {
    const container = mapRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const centerX = e.clientX - rect.left;
    const centerY = e.clientY - rect.top;

    // 双击时在点击位置放大2倍或恢复
    const newScale = transform.scale >= 1.5 ? 1 : 2;
    
    setTransform({
      x: centerX - (centerX - transform.x) * (newScale / transform.scale),
      y: centerY - (centerY - transform.y) * (newScale / transform.scale),
      scale: newScale
    });
  }, [transform]);

  return (
    <MobileMapContainer>
      <MapTitle>地铁线路图</MapTitle>
      
      <MapViewContainer
        ref={mapRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onDoubleClick={handleDoubleClick}
        style={{
          touchAction: 'none',
          userSelect: 'none',
          WebkitUserSelect: 'none'
        }}
      >
        <ToggleButton onClick={toggleView}>
          {showImage ? 'SVG' : '图片'}
        </ToggleButton>
        
        {showImage ? (
          <MapImage 
            ref={imageRef}
            src="/xianlu.jpg" 
            alt="地铁线路图"
            style={{
              transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
              transformOrigin: '0 0',
              cursor: isDragging ? 'grabbing' : 'grab',
              transition: isDragging || isPinching ? 'none' : 'transform 0.2s ease-out'
            }}
          />
        ) : (
          <>
            <SVGMap
              viewBox="0 0 400 400"
              style={{
                transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
                transformOrigin: '0 0',
                cursor: isDragging ? 'grabbing' : 'grab',
                transition: isDragging || isPinching ? 'none' : 'transform 0.2s ease-out'
              }}
            >
              {/* 绘制线路 */}
              {linesArray.map(line => {
                if (!line.stations || line.stations.length === 0) return null;
                
                const pathData = line.stations
                  .map((station, index) => {
                    const pos = getStationPosition(station.name, line.name);
                    return `${index === 0 ? 'M' : 'L'} ${pos.x} ${pos.y}`;
                  })
                  .join(' ');
                
                return (
                  <g key={line.id}>
                    <LinePath
                      d={pathData}
                      stroke={line.color}
                      strokeWidth="3"
                    />
                    {/* 线路标签 */}
                    {line.stations.length > 0 && (
                      <LineLabel
                        x={getStationPosition(line.stations[0].name, line.name).x}
                        y={getStationPosition(line.stations[0].name, line.name).y - 15}
                        fill={line.color}
                      >
                        {line.name}
                      </LineLabel>
                    )}
                  </g>
                );
              })}
              
              {/* 绘制站点 */}
              {linesArray.map(line => 
                line.stations?.map(station => {
                  const pos = getStationPosition(station.name, line.name);
                  return (
                    <g key={`${line.id}-${station.id}`}>
                      <StationCircle
                        cx={pos.x}
                        cy={pos.y}
                        r="4"
                        stroke={line.color}
                        fill="white"
                      />
                      <StationLabel
                        x={pos.x}
                        y={pos.y + 15}
                        fontSize="6"
                      >
                        {station.name}
                      </StationLabel>
                    </g>
                  );
                })
              )}
            </SVGMap>
          </>
        )}
        <ZoomControls>
          <ZoomButton onClick={zoomIn}>+</ZoomButton>
          <ZoomButton onClick={zoomOut}>-</ZoomButton>
          <ZoomButton onClick={resetView}>⟲</ZoomButton>
        </ZoomControls>
      </MapViewContainer>

      <LineList>
        {linesArray.map(line => (
          <LineCard key={line.id} color={line.color}>
            <LineHeader>
              <LineName>{line.name}</LineName>
              <StationCount>{line.stations?.length || 0}个站点</StationCount>
            </LineHeader>
            <StationList>
              {line.stations?.map(station => (
                <StationTag key={station.id}>{station.name}</StationTag>
              ))}
            </StationList>
          </LineCard>
        ))}
      </LineList>
    </MobileMapContainer>
  );
};

export default MobileMetroMap;
// 地铁线路数据 - 基于实际地铁图设计
export const metroLines = {
  line1: {
    id: 'line1',
    name: '1号线',
    nameEn: 'Line 1',
    color: '#e4002b', // 红色
    stations: [
      { id: 'forstrut', name: '凛辙', nameZh: '凛辙', x: 55, y: 15 },
      { id: 'snowrealm', name: '雪界', nameZh: '雪界', x: 55, y: 25 },
      { id: 'north_astralwave', name: '星澜北', nameZh: '星澜北', x: 55, y: 35 },
      { id: 'glazebow_rd_n', name: '璃虹北路', nameZh: '璃虹北路', x: 55, y: 45 },
      { id: 'silvermoon', name: '银月', nameZh: '银月', x: 55, y: 55 },
      { id: 'astralwave', name: '星澜', nameZh: '星澜', x: 55, y: 65 },
      { id: 'east_starfell', name: '星落东', nameZh: '星落东', x: 55, y: 75 },
      { id: 'karstdome', name: '溶穹', nameZh: '溶穹', x: 55, y: 80 },
      { id: 'south_starfell', name: '星落南', nameZh: '星落南', x: 55, y: 85 },
      { id: 'railnet_command_hub', name: '铁道联控中心', nameZh: '铁道联控中心', x: 55, y: 90 },
      { id: 'duskhaven', name: '栖霞', nameZh: '栖霞', x: 55, y: 95 },
      { id: 'cyansand', name: '青沙', nameZh: '青沙', x: 55, y: 100 },
      { id: 'point_origin', name: '双零点', nameZh: '双零点', x: 55, y: 105 },
      { id: 'nullpivot', name: '零枢', nameZh: '零枢', x: 55, y: 110 },
      { id: 'serenica_rd', name: '净海路', nameZh: '净海路', x: 55, y: 115 },
      { id: 'origin_no_3_south_nullpivot', name: '起源3号 零枢南', nameZh: '起源3号 零枢南', x: 55, y: 120 }
    ]
  },
  line2: {
    id: 'line2',
    name: '2号线',
    nameEn: 'Line 2',
    color: '#009a44', // 绿色
    stations: [
      { id: 'evertide', name: '溯望', nameZh: '溯望', x: 10, y: 70 },
      { id: 'hawatari', name: '叶渡', nameZh: '叶渡', x: 20, y: 70 },
      { id: 'east_starfell_2', name: '星落东', nameZh: '星落东', x: 55, y: 75 },
      { id: 'awaminato', name: '粟港', nameZh: '粟港', x: 85, y: 75 },
      { id: 'stardream', name: '星梦', nameZh: '星梦', x: 85, y: 85 },
      { id: 'stardream_alt', name: '佐菲路', nameZh: '佐菲路', x: 85, y: 95 },
      { id: 'navigation', name: '新航路', nameZh: '新航路', x: 85, y: 100 },
      { id: 'astralwave_rd_w', name: '星澜西路', nameZh: '星澜西路', x: 85, y: 105 },
      { id: 'populace_square', name: '凡俦广场', nameZh: '凡俦广场', x: 85, y: 110 },
      { id: 'astralwave_rd_e', name: '星澜东路', nameZh: '星澜东路', x: 85, y: 115 },
      { id: 'nascent_rd', name: '新途路', nameZh: '新途路', x: 85, y: 120 }
    ]
  },
  line5: {
    id: 'line5',
    name: '5号线',
    nameEn: 'Line 5',
    color: '#8e44ad', // 紫色
    stations: [
      { id: 'tideford', name: '潮津', nameZh: '潮津', x: 5, y: 5 },
      { id: 'yincai_rd', name: '银裁路', nameZh: '银裁路', x: 15, y: 5 },
      { id: 'shayou_rd', name: '斜阳路', nameZh: '斜阳路', x: 25, y: 5 },
      { id: 'spruceveld_castle', name: '雪杉城堡', nameZh: '雪杉城堡', x: 35, y: 5 },
      { id: 'rimebough_valley', name: '雪淞谷', nameZh: '雪淞谷', x: 45, y: 5 },
      { id: 'aurora_rd', name: '极光路', nameZh: '极光路', x: 55, y: 5 },
      { id: 'aurora_rd_e', name: '极光东路', nameZh: '极光东路', x: 65, y: 5 }
    ]
  },
  line7: {
    id: 'line7',
    name: '7号线',
    nameEn: 'Line 7',
    color: '#f39c12', // 橙色
    stations: [
      { id: 'mirrorlake_park', name: '镜湖公园', nameZh: '镜湖公园', x: 45, y: 65 },
      { id: 'clocktower_rd', name: '钟楼路', nameZh: '钟楼路', x: 55, y: 65 },
      { id: 'godrest_valley', name: '神眠谷', nameZh: '神眠谷', x: 65, y: 60 },
      { id: 'east_astralwave', name: '星澜东', nameZh: '星澜东', x: 75, y: 65 },
      { id: 'finbeach', name: '终陆滩', nameZh: '终陆滩', x: 70, y: 95 },
      { id: 'coreloop_island', name: '环心岛', nameZh: '环心岛', x: 75, y: 95 }
    ]
  },
  line8: {
    id: 'line8',
    name: '8号线',
    nameEn: 'Line 8',
    color: '#2980b9', // 深蓝色
    stations: [
      { id: 'sidefall_rd', name: '边落路', nameZh: '边落路', x: 10, y: 40 },
      { id: 'north_starfell', name: '星落北', nameZh: '星落北', x: 20, y: 40 },
      { id: 'starfell_new_town', name: '星澜西', nameZh: '星澜西', x: 30, y: 40 },
      { id: 'interweave_rd', name: '交织路', nameZh: '交织路', x: 20, y: 50 },
      { id: 'cardsword_rd', name: '剑符路', nameZh: '剑符路', x: 30, y: 50 },
      { id: 'galaxy_marginal', name: '银边', nameZh: '银边', x: 40, y: 50 },
      { id: 'vigil_cape', name: '守望角', nameZh: '守望角', x: 40, y: 60 },
      { id: 'stormbearer_rd', name: '望风路', nameZh: '望风路', x: 20, y: 60 },
      { id: 'original_north_gate', name: '原北门', nameZh: '原北门', x: 30, y: 70 },
      { id: 'seacloud', name: '海云', nameZh: '海云', x: 50, y: 90 },
      { id: 'east_seacloud', name: '海云东', nameZh: '海云东', x: 60, y: 90 },
      { id: 'oceanview', name: '海景', nameZh: '海景', x: 40, y: 95 },
      { id: 'west_oceanview', name: '西海景', nameZh: '西海景', x: 30, y: 95 }
    ]
  },
  line9: {
    id: 'line9',
    name: '城域线',
    nameEn: 'Line Chengyu',
    color: '#3498db', // 青色
    stations: [
      { id: 'maltmire_wetland', name: '曲香泽', nameZh: '曲香泽', x: 30, y: 20 },
      { id: 'north_starfell_9', name: '星落北', nameZh: '星落北', x: 20, y: 40 },
      { id: 'galaxy_marginal_9', name: '银边', nameZh: '银边', x: 40, y: 50 },
      { id: 'east_starfell_9', name: '星落东', nameZh: '星落东', x: 55, y: 75 },
      { id: 'silversky', name: '银天', nameZh: '银天', x: 60, y: 80 },
      { id: 'originsea_new_town', name: '源海新城', nameZh: '源海新城', x: 60, y: 115 },
      { id: 'oceanview_9', name: '海景', nameZh: '海景', x: 40, y: 95 } // 新增站点
    ]
  },
  line10: {
    id: 'line10',
    name: '10号线',
    nameEn: 'Line 10',
    color: '#9b59b6', // 紫色
    stations: [
      { id: 'sidefall_rd_10', name: '边落路', nameZh: '边落路', x: 10, y: 40 },
      { id: 'starfell_new_town_10', name: '星落新城', nameZh: '星落新城', x: 25, y: 45 },
      { id: 'interweave_rd_10', name: '交织路', nameZh: '交织路', x: 35, y: 50 },
      { id: 'ripplehill', name: '涟丘', nameZh: '涟丘', x: 65, y: 45 },
      { id: 'glaze_haven', name: '琉璃港', nameZh: '琉璃港', x: 75, y: 45 },
      { id: 'glazebow_rd_n_10', name: '璃虹北路', nameZh: '璃虹北路', x: 55, y: 45 },
      { id: 'confluence_gate', name: '汇界门', nameZh: '汇界门', x: 50, y: 75 },
      { id: 'initial_rd', name: '初途路', nameZh: '初途路', x: 50, y: 70 },
      { id: 'evertide_10', name: '溯望', nameZh: '溯望', x: 10, y: 70 },
      { id: 'hawatari_10', name: '叶渡', nameZh: '叶渡', x: 20, y: 70 },
      { id: 'starglitter_valley', name: '星辉谷', nameZh: '星辉谷', x: 45, y: 60 }
    ]
  },
  originseaLine: {
    id: 'originseaLine',
    name: '源海线',
    nameEn: 'Originsea Line',
    color: '#2ecc71', // 绿色，恢复源海线原始颜色
    stations: [
      { id: 'point_alpha', name: '「世界起点」', nameZh: '「世界起点」', x: 40, y: 75 },
      { id: 'everwharf', name: 'Everwharf', nameZh: '旧日之港', x: 60, y: 75 },
      { id: 'originsea_rd', name: 'Originsea Rd.', nameZh: '源海路', x: 70, y: 75 },
      { id: 'pathsearch', name: 'Pathsearch', nameZh: '研途', x: 75, y: 75 },
      { id: 'awaminato_originsea', name: 'Awaminato', nameZh: '粟港', x: 90, y: 75 }
    ]
  }
};

// Station connections - Based on actual metro map
export const connections = [
  // Line 1 connections - Main north-south line
  { from: 'forstrut', to: 'snowrealm', line: 'line1' },
  { from: 'snowrealm', to: 'north_astralwave', line: 'line1' },
  { from: 'north_astralwave', to: 'glazebow_rd_n', line: 'line1' },
  { from: 'glazebow_rd_n', to: 'silvermoon', line: 'line1' },
  { from: 'silvermoon', to: 'astralwave', line: 'line1' },
  { from: 'astralwave', to: 'east_starfell', line: 'line1' },
  { from: 'east_starfell', to: 'karstdome', line: 'line1' },
  { from: 'karstdome', to: 'south_starfell', line: 'line1' },
  { from: 'south_starfell', to: 'railnet_command_hub', line: 'line1' },
  { from: 'railnet_command_hub', to: 'duskhaven', line: 'line1' },
  { from: 'duskhaven', to: 'cyansand', line: 'line1' },
  { from: 'cyansand', to: 'point_origin', line: 'line1' },
  { from: 'point_origin', to: 'nullpivot', line: 'line1' },
  { from: 'nullpivot', to: 'serenica_rd', line: 'line1' },
  { from: 'serenica_rd', to: 'origin_no_3_south_nullpivot', line: 'line1' },
  
  // Line 2 connections - East-west line
  { from: 'evertide', to: 'hawatari', line: 'line2' },
  { from: 'hawatari', to: 'east_starfell_2', line: 'line2' },
  { from: 'east_starfell_2', to: 'awaminato', line: 'line2' },
  { from: 'awaminato', to: 'stardream', line: 'line2' },
  { from: 'stardream', to: 'stardream_alt', line: 'line2' },
  { from: 'stardream_alt', to: 'navigation', line: 'line2' },
  { from: 'navigation', to: 'astralwave_rd_w', line: 'line2' },
  { from: 'astralwave_rd_w', to: 'populace_square', line: 'line2' },
  { from: 'populace_square', to: 'astralwave_rd_e', line: 'line2' },
  { from: 'astralwave_rd_e', to: 'nascent_rd', line: 'line2' },
  
  // Line 5 connections - Northern line
  { from: 'tideford', to: 'yincai_rd', line: 'line5' },
  { from: 'yincai_rd', to: 'shayou_rd', line: 'line5' },
  { from: 'shayou_rd', to: 'spruceveld_castle', line: 'line5' },
  { from: 'spruceveld_castle', to: 'rimebough_valley', line: 'line5' },
  { from: 'rimebough_valley', to: 'aurora_rd', line: 'line5' },
  { from: 'aurora_rd', to: 'aurora_rd_e', line: 'line5' },
  
  // Line 7 connections - Eastern loop
  { from: 'mirrorlake_park', to: 'clocktower_rd', line: 'line7' },
  { from: 'clocktower_rd', to: 'starglitter_valley', line: 'line7' },
  { from: 'starglitter_valley', to: 'godrest_valley', line: 'line7' },
  { from: 'godrest_valley', to: 'east_astralwave', line: 'line7' },
  { from: 'east_astralwave', to: 'finbeach', line: 'line7' },
  { from: 'finbeach', to: 'coreloop_island', line: 'line7' },
  
  // Line 8 connections - Western line
  { from: 'sidefall_rd', to: 'north_starfell', line: 'line8' },
  { from: 'north_starfell', to: 'starfell_new_town', line: 'line8' },
  { from: 'starfell_new_town', to: 'interweave_rd', line: 'line8' },
  { from: 'interweave_rd', to: 'cardsword_rd', line: 'line8' },
  { from: 'cardsword_rd', to: 'galaxy_marginal', line: 'line8' },
  { from: 'galaxy_marginal', to: 'vigil_cape', line: 'line8' },
  { from: 'vigil_cape', to: 'stormbearer_rd', line: 'line8' },
  { from: 'stormbearer_rd', to: 'original_north_gate', line: 'line8' },
  { from: 'original_north_gate', to: 'seacloud', line: 'line8' },
  { from: 'seacloud', to: 'east_seacloud', line: 'line8' },
  { from: 'seacloud', to: 'oceanview', line: 'line8' },
  { from: 'oceanview', to: 'west_oceanview', line: 'line8' },

  // Line 9 connections - Eastern main line
  { from: 'maltmire_wetland', to: 'north_starfell_9', line: 'line9' },
  { from: 'north_starfell_9', to: 'starglitter_valley', line: 'line9' },
  { from: 'starglitter_valley', to: 'galaxy_marginal_9', line: 'line9' },
  { from: 'galaxy_marginal_9', to: 'east_starfell_9', line: 'line9' },
  { from: 'east_starfell_9', to: 'silversky', line: 'line9' },
  { from: 'silversky', to: 'originsea_new_town', line: 'line9' },
  { from: 'silversky', to: 'oceanview_9', line: 'line9' },

  // Line 10 connections - Central line
  { from: 'sidefall_rd_10', to: 'starfell_new_town_10', line: 'line10' },
  { from: 'starfell_new_town_10', to: 'interweave_rd_10', line: 'line10' },
  { from: 'interweave_rd_10', to: 'ripplehill', line: 'line10' },
  { from: 'ripplehill', to: 'glaze_haven', line: 'line10' },
  { from: 'glaze_haven', to: 'glazebow_rd_n_10', line: 'line10' },
  { from: 'glazebow_rd_n_10', to: 'confluence_gate', line: 'line10' },
  { from: 'confluence_gate', to: 'initial_rd', line: 'line10' },
  { from: 'initial_rd', to: 'evertide_10', line: 'line10' },
  { from: 'evertide_10', to: 'hawatari_10', line: 'line10' },
  
  // Originsea Line connections
  { from: 'point_alpha', to: 'everwharf', line: 'originseaLine' },
  { from: 'everwharf', to: 'originsea_rd', line: 'originseaLine' },
  { from: 'originsea_rd', to: 'pathsearch', line: 'originseaLine' },
  { from: 'pathsearch', to: 'awaminato_originsea', line: 'originseaLine' },
  
  // Transfer connections
  { from: 'aurora_rd', to: 'forstrut', line: 'transfer' }, // Line 5 to Line 1
  { from: 'aurora_rd_e', to: 'forstrut', line: 'transfer' }, // Line 5 to Line 1
  { from: 'east_starfell', to: 'east_starfell_2', line: 'transfer' }, // Line 1 to Line 2
  { from: 'east_starfell', to: 'east_starfell_9', line: 'transfer' }, // Line 1 to Line 9
  { from: 'east_starfell_2', to: 'east_starfell_9', line: 'transfer' }, // Line 2 to Line 9
  { from: 'galaxy_marginal', to: 'galaxy_marginal_9', line: 'transfer' }, // Line 1 to Line 9
  { from: 'astralwave', to: 'east_astralwave', line: 'transfer' }, // Line 1 to Line 7
  { from: 'starfell_new_town', to: 'north_starfell_9', line: 'transfer' }, // Line 8 to Line 9
  { from: 'original_north_gate', to: 'east_starfell', line: 'transfer' }, // Line 1 to Line 8
  { from: 'vigil_cape', to: 'east_starfell', line: 'transfer' }, // Line 1 to Line 8, Line 9
  { from: 'north_starfell', to: 'north_starfell_9', line: 'transfer' }, // Line 8 to Line 9
  { from: 'starglitter_valley', to: 'east_astralwave', line: 'transfer' }, // Line 7 to Line 9
  { from: 'sidefall_rd', to: 'sidefall_rd_10', line: 'transfer' }, // Line 8 to Line 10
  { from: 'glazebow_rd_n', to: 'glazebow_rd_n_10', line: 'transfer' }, // Line 1 to Line 10
  { from: 'confluence_gate', to: 'point_alpha', line: 'transfer' }, // Line 10 to Originsea Line
  { from: 'evertide', to: 'evertide_10', line: 'transfer' }, // Line 2 to Line 10
  { from: 'hawatari', to: 'hawatari_10', line: 'transfer' }, // Line 2 to Line 10
  { from: 'awaminato', to: 'awaminato_originsea', line: 'transfer' } // Line 2 to Originsea Line
];

// Get all stations
export const getAllStations = () => {
  const stations = new Map();
  Object.values(metroLines).forEach(line => {
    line.stations.forEach(station => {
      if (!stations.has(station.id)) {
        stations.set(station.id, station);
      }
    });
  });
  return Array.from(stations.values());
};

// Get station connections
export const getStationConnections = (stationId) => {
  return connections.filter(conn => 
    conn.from === stationId || conn.to === stationId
  );
};

// Route planning algorithm (Dijkstra) - Optimized version
export const findRoute = (startId, endId) => {
  const stations = getAllStations();
  const distances = new Map();
  const previous = new Map();
  const unvisited = new Set();
  
  // Initialize
  stations.forEach(station => {
    distances.set(station.id, Infinity);
    unvisited.add(station.id);
  });
  
  distances.set(startId, 0);
  
  while (unvisited.size > 0) {
    let current = null;
    let minDistance = Infinity;
    
    // Find the unvisited station with the smallest distance
    for (const stationId of unvisited) {
      if (distances.get(stationId) < minDistance) {
        minDistance = distances.get(stationId);
        current = stationId;
      }
    }
    
    if (current === null || current === endId) break;
    
    unvisited.delete(current);
    
    // Check all neighboring stations
    const connections = getStationConnections(current);
    for (const conn of connections) {
      const neighbor = conn.from === current ? conn.to : conn.from;
      if (!unvisited.has(neighbor)) continue;
      
      const newDistance = distances.get(current) + 1;
      if (newDistance < distances.get(neighbor)) {
        distances.set(neighbor, newDistance);
        previous.set(neighbor, current);
      }
    }
  }
  
  // Build path
  const path = [];
  let current = endId;
  
  // Allow exit when current is undefined or null
  while (current != null) {
    path.unshift(current);
    current = previous.get(current);
  }
  
  if (path.length === 0 || path[0] !== startId) return null;
  
  return path;
};

// Get line information
export const getLineInfo = (lineId) => {
  return metroLines[lineId] || null;
};

// Get lines that a station belongs to
export const getStationLines = (stationId) => {
  const lines = [];
  Object.values(metroLines).forEach(line => {
    if (line.stations.find(s => s.id === stationId)) {
      lines.push(line);
    }
  });
  return lines;
};

// Calculate distance between two stations (for display)
export const calculateDistance = (station1Id, station2Id) => {
  const station1 = getAllStations().find(s => s.id === station1Id);
  const station2 = getAllStations().find(s => s.id === station2Id);
  
  if (!station1 || !station2) return 0;
  
  const dx = station1.x - station2.x;
  const dy = station1.y - station2.y;
  return Math.sqrt(dx * dx + dy * dy);
};

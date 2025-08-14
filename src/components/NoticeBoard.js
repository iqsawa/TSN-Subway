import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const NoticeContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;
`;

const NoticeTitle = styled.h2`
  margin: 0 0 20px 0;
  color: #333;
  font-size: 24px;
  font-weight: 600;
  text-align: center;
`;

const NoticeList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const NoticeItem = styled.div`
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #2196f3;
    box-shadow: 0 2px 8px rgba(33, 150, 243, 0.2);
  }
`;

const NoticeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const NoticeSubject = styled.h3`
  margin: 0;
  color: #333;
  font-size: 16px;
  font-weight: 600;
`;

const NoticeDate = styled.span`
  color: #666;
  font-size: 12px;
`;

const NoticeContent = styled.p`
  margin: 0;
  color: #666;
  font-size: 14px;
  line-height: 1.5;
`;

const NoticeBoard = () => {
  const [notices, setNotices] = useState([
    {
      id: 1,
      subject: '星轨通app正式上线',
      date: '2025-08-14',
      content: '星轨通app正式上线，为您提供更便捷的城市地铁出行服务。全新界面设计，优化用户体验，增加更多实用功能，让您的出行更加轻松愉快。'
    }
  ]);

  return (
    <NoticeContainer>
      <NoticeTitle>运营公告</NoticeTitle>
      <NoticeList>
        {notices.map(notice => (
          <NoticeItem key={notice.id}>
            <NoticeHeader>
              <NoticeSubject>{notice.subject}</NoticeSubject>
              <NoticeDate>{notice.date}</NoticeDate>
            </NoticeHeader>
            <NoticeContent>{notice.content}</NoticeContent>
          </NoticeItem>
        ))}
      </NoticeList>
    </NoticeContainer>
  );
};

export default NoticeBoard;
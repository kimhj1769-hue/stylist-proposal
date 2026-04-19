import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/clothing');
        setItemCount(response.data.length);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };
    fetchCount();
  }, []);

  return (
    <div className="page-container">
      <h1>스타일 대시보드</h1>
      <p>오늘의 추천 코디와 옷장 요약을 확인하세요.</p>
      
      <div className="dashboard-grid">
        <div className="card">
          <h3>내 옷장 현황</h3>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#3498db', margin: '1rem 0' }}>
            {itemCount} <span style={{ fontSize: '1.2rem', color: '#777' }}>items</span>
          </div>
          <Link to="/wardrobe" className="add-button" style={{ textDecoration: 'none', display: 'inline-block' }}>
            옷장 관리하기
          </Link>
        </div>

        <div className="card">
          <h3>오늘의 추천</h3>
          <div className="outfit-preview">
            <div className="placeholder-img" style={{ height: '80px' }}>상의</div>
            <div className="placeholder-img" style={{ height: '80px' }}>하의</div>
          </div>
          <p>날씨에 맞는 최적의 조합을 찾고 있습니다.</p>
          <Link to="/outfits" style={{ color: '#3498db', fontWeight: '600', textDecoration: 'none' }}>
            전체 추천 보기 →
          </Link>
        </div>
      </div>

      <div className="card" style={{ marginTop: '2rem' }}>
        <h3>스타일 팁</h3>
        <p>"오늘처럼 화창한 날에는 밝은 톤의 린넨 셔츠가 잘 어울릴 거예요!"</p>
      </div>
    </div>
  );
};

export default Dashboard;

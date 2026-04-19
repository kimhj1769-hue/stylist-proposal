const OutfitRecommendation = () => {
  return (
    <div className="page-container">
      <h1>오늘의 코디 추천</h1>
      <div className="recommendation-content">
        <p>현재 날씨와 사용자님의 취향을 기반으로 한 스타일입니다.</p>
        <div className="outfit-display">
          <div className="outfit-card">
            <h4>오늘의 룩: 모던 캐주얼</h4>
            <div className="outfit-preview">
              <div className="placeholder-img">아이템 1</div>
              <div className="placeholder-img">아이템 2</div>
              <div className="placeholder-img">아이템 3</div>
            </div>
            <p>날씨가 조금 쌀쌀하니 얇은 자켓을 걸치는 것을 추천드려요.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutfitRecommendation;

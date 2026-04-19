const StyleProfile = () => {
  return (
    <div className="page-container">
      <h1>스타일 프로필</h1>
      <form className="profile-form">
        <div className="form-group">
          <label>선호하는 스타일</label>
          <select>
            <option>미니멀</option>
            <option>스트릿</option>
            <option>캐주얼</option>
            <option>비즈니스 캐주얼</option>
          </select>
        </div>
        <div className="form-group">
          <label>주로 입는 사이즈</label>
          <input type="text" placeholder="예: M, 100, 28" />
        </div>
        <button type="submit" className="save-button">프로필 저장</button>
      </form>
    </div>
  );
};

export default StyleProfile;

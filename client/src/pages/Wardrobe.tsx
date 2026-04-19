import { useState, useEffect, FormEvent } from 'react';
import axios from 'axios';

interface ClothingItem {
  _id: string;
  name: string;
  category: string;
  color: string;
  season: string[];
  imageUrl: string;
}

const Wardrobe = () => {
  const [items, setItems] = useState<ClothingItem[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Top',
    color: '',
    season: ['Spring'],
    imageUrl: '',
    userId: 'user123' // 임시 사용자 ID
  });

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/clothing');
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching wardrobe items:', error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/clothing', formData);
      setIsAdding(false);
      setFormData({
        name: '',
        category: 'Top',
        color: '',
        season: ['Spring'],
        imageUrl: '',
        userId: 'user123'
      });
      fetchItems();
    } catch (error) {
      console.error('Error adding clothing item:', error);
    }
  };

  const handleSeasonChange = (season: string) => {
    const updatedSeasons = formData.season.includes(season)
      ? formData.season.filter(s => s !== season)
      : [...formData.season, season];
    setFormData({ ...formData, season: updatedSeasons });
  };

  return (
    <div className="page-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>내 옷장</h1>
        <button className="add-button" onClick={() => setIsAdding(!isAdding)}>
          {isAdding ? '취소' : '아이템 추가하기'}
        </button>
      </div>

      {isAdding && (
        <div className="card add-form">
          <h2>새 아이템 등록</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>옷 이름</label>
              <input 
                type="text" 
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                placeholder="예: 화이트 린넨 셔츠" 
                required 
              />
            </div>
            <div className="form-group">
              <label>카테고리</label>
              <select 
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value as any })}
              >
                <option value="Top">상의</option>
                <option value="Bottom">하의</option>
                <option value="Outer">아우터</option>
                <option value="Shoes">신발</option>
                <option value="Accessory">액세서리</option>
              </select>
            </div>
            <div className="form-group">
              <label>색상</label>
              <input 
                type="text" 
                value={formData.color}
                onChange={e => setFormData({ ...formData, color: e.target.value })}
                placeholder="예: 화이트, 네이비" 
                required 
              />
            </div>
            <div className="form-group">
              <label>계절</label>
              <div style={{ display: 'flex', gap: '1rem' }}>
                {['Spring', 'Summer', 'Autumn', 'Winter'].map(s => (
                  <label key={s} style={{ fontWeight: 'normal' }}>
                    <input 
                      type="checkbox" 
                      checked={formData.season.includes(s)}
                      onChange={() => handleSeasonChange(s)}
                    /> {s}
                  </label>
                ))}
              </div>
            </div>
            <div className="form-group">
              <label>이미지 URL</label>
              <input 
                type="text" 
                value={formData.imageUrl}
                onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
                placeholder="https://..." 
                required 
              />
            </div>
            <button type="submit" className="save-button">등록하기</button>
          </form>
        </div>
      )}

      <div className="wardrobe-grid">
        {items.length === 0 ? (
          <p>등록된 옷이 없습니다. 새로운 아이템을 추가해 보세요!</p>
        ) : (
          items.map(item => (
            <div key={item._id} className="clothing-card">
              <img src={item.imageUrl} alt={item.name} />
              <div className="info">
                <h4>{item.name}</h4>
                <p>{item.category} | {item.color}</p>
                <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>
                  {item.season.join(', ')}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Wardrobe;

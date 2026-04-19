import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Personal Stylist</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">대시보드</Link></li>
        <li><Link to="/wardrobe">내 옷장</Link></li>
        <li><Link to="/outfits">코디 추천</Link></li>
        <li><Link to="/profile">프로필</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;

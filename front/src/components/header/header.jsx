import './header.css';
import Logo from '../logo/logo';
import AddArticle from '../add-article-button/add-article-button';
import AvatarPlaceholder from '../avatar-placeholder/avatar-placeholder';


function Header() {
  return (
    <div className="header">
      <Logo />
      <AddArticle />
      <AvatarPlaceholder />
    </div>
  );
}

export default Header;
import './avatar-placeholder.css';
import './avatar-placeholder-script.js';
import UserAvatar from '../../images/user-avatar.jpg';

function AvatarPlaceholder() {
  return (
    <div className="avatar">
      <img src={UserAvatar} alt="UserAvatar" className="avatar-image"/>
      <span className="user-name">Ivan Ivanov</span>
      <ul className="dropdown">
        <li><a href="./">Profile</a></li>
        <li><a href="./">Logout</a></li>
      </ul>
    </div>
  );
}

export default AvatarPlaceholder;
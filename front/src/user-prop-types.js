import PropTypes from 'prop-types';

const filePropType = PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string,
  path: PropTypes.string,
  size: PropTypes.number,
});

const userPropType = PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string,
  email: PropTypes.string,
  email_confirmed: PropTypes.bool,
  phone: PropTypes.string,
  date_of_birth: PropTypes.string,
  avatar: PropTypes.string,
});

const likePropType = PropTypes.shape({
  userId: PropTypes.number,
  user: userPropType,
  date: PropTypes.string,
});

const articlePropType = PropTypes.shape({
  title: PropTypes.string,
  text: PropTypes.string,
  images: PropTypes.arrayOf(filePropType),
  createdAt: PropTypes.string,
  editedAt: PropTypes.string,
  likes: PropTypes.arrayOf(likePropType),
});

export { userPropType, articlePropType };

import PropTypes from 'prop-types';

const filePropType = PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string,
  path: PropTypes.string,
  size: PropTypes.number,
});

const userPropType = PropTypes.shape({
  id: PropTypes.number,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  age: PropTypes.number,
  avatar: PropTypes.shape({
    fileId: PropTypes.number,
    file: filePropType,
  }),
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

export { filePropType, userPropType, articlePropType };

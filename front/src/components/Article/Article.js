import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import useAuth from '../../hooks/useAuth';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useStyles } from './styles';

function Article({ articleData, onClickDelete }) {
  const classes = useStyles();
  const { id, title, text, user_id } = articleData;
  const { user } = useAuth();

  return (
    <Card key={id} className={classes.card}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {text}
        </Typography>
      </CardContent>
      {user_id === user.id && (
        <CardActions>
          <Link to={`/edit-article/${id}`}>
            <Button variant="outlined" size="small" color="primary">
              Edit
            </Button>
          </Link>
          <Button variant="outlined" size="small" color="primary" onClick={onClickDelete}>
            Delete
          </Button>
        </CardActions>
      )}
    </Card>
  );
}

Article.propTypes = {
  articleData: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    text: PropTypes.string,
    created_at: PropTypes.string,
  }).isRequired,
};

export default Article;

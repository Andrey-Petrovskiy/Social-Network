import React from 'react';
import { Route, Switch } from 'react-router-dom';

import AddArticleContainer from '../containers/articles/AddArticle';
import ArticleListContainer from '../containers/articles/ArticleList';
import ProfileContainer from '../containers/user/Profile';

function Body() {
  return (
    <Switch>
      <Route exact path="/" component={() => <ArticleListContainer />} />
      <Route
        exact
        path="/(add-article|edit-article)/:id?"
        component={(props) => <AddArticleContainer props={props} />}
      />
      <Route exact path="/profile" component={() => <ProfileContainer />} />
    </Switch>
  );
}

export default Body;

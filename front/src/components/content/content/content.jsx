import './content.css';
import Profile from '../profile/profile';
import AddArticleContainer from '../../../containers/articles/add-article';
import ArticlesContainer from '../../../containers/articles/article-list';
import GreetingPage from '../greeting-page/greeting-page';
import { Route, Switch } from 'react-router-dom';

function Content({ handleUsername }) {
  return (
    <Switch>
      <Route exact path="/" component={GreetingPage} />} />
      <Route exact path="/profile" render={() => <Profile handleUsername={handleUsername} />} />
      <Route
        exact
        path="/(add-article|edit-article)/:id?"
        render={(props) => <AddArticleContainer props={props} />}
      />
      <Route exact path="/articles" component={ArticlesContainer} />
    </Switch>
  );
}

export default Content;

import './content.css';
import Profile from '../profile/profile';
import AddArticle from '../add-article/add-article';
import Articles from '../articles/articles';
import GreetingPage from '../greeting-page/greeting-page';
import { Route, Switch, useParams } from 'react-router-dom';

function Content({ handleUsername, userData }) {
  function DateCheck() {
    const { year, month, day } = useParams();
    let date = `${year}-${month}-${day}`;

    function isFutureDate(idate) {
      const today = new Date().getTime();
      idate = idate.split('-');

      idate = new Date(idate[0], idate[1] - 1, idate[2]).getTime();
      return today - idate > 0;
    }

    return isFutureDate(date) && <Profile handleUsername={handleUsername} />;
  }

  return (
    <Switch>
      <Route exact path="/" render={() => <GreetingPage userData={userData} />} />
      <Route exact path="/profile" render={() => <Profile handleUsername={handleUsername} />} />
      <Route exact path="/add-article" component={AddArticle} />
      <Route exact path="/articles" component={Articles} />
      <Route
        exact
        path={[
          '/users',
          '/users/(\\d+)/(edit|avatar|file)?',
          '/users/(\\d+)/avatar/(edit|delete)?',
          '/users/(\\d+)/file/(\\d+)-(\\w{1,10})-:date(\\d{4})-(0[1-9]|1[0-2])-([0-2][0-9]|3[0-1]).(docx|jpeg|pdf|txt)/v.(\\d{1}).(\\d{1}).(\\d{1})',
        ]}
        render={() => <Profile handleUsername={handleUsername} />}
      />
      <Route
        exact
        path="/date/(\d+)/file/(\d+)-(\w{1,10})-:year(\d{4})-:month(0[1-9]|1[0-2])-:day([0-2][0-9]|3[0-1]).(docx|jpeg|pdf|txt)/v.(\d{1}).(\d{1}).(\d{1})"
        component={DateCheck}
      />
    </Switch>
  );
}

export default Content;

import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import BookCreate from './books/BookCreate';
import BookEdit from './books/BookEdit';
import BookDelete from './books/BookDelete';
import BookList from './books/BookList';
import BookMyList from './books/BookMyList';
import BookShow from './books/BookShow';
import Header from './Header';
import history from '../history';

const App = () => {
  return (
    <div className="ui container">
      <Router history={history}>
        <div>
          <Header />
          <Switch>
            <Route path="/" exact component={BookList} />
            <Route path="/books/mybooks" exact component={BookMyList} />
            <Route path="/books/new" exact component={BookCreate} />
            <Route path="/books/edit/:id" exact component={BookEdit} />
            <Route path="/books/delete/:id" exact component={BookDelete} />
            <Route path="/books/:id" exact component={BookShow} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;

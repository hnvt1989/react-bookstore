import React from "react";
import { Provider } from "react-redux";
import { render, fireEvent, cleanup } from "react-testing-library";
import {BrowserRouter} from 'react-router-dom';

import BookList from "../components/books/BookList";
import bookReducer from "../reducers/bookReducer";

import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';

//middleware to use redux with async
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

function renderWithRedux(
  ui,
  { initialState, store = createStore(bookReducer, initialState, composeEnhancers(applyMiddleware(reduxThunk))) } = {}
) {
  return {
    ...render(
      <Provider store={store}>
        <BrowserRouter>{ui}</BrowserRouter>
      </Provider>
    ),
    //need to wrap <Link/> inside a BrowserRouter

    // adding `store` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    store
  };
}

afterEach(cleanup);

test("<BookList> can render with redux with custom initial state", () => {
  const initialState = {
    books: [
      {
        title: "Harry Porter",
        description: "book 1",
        id: 1,
        userId: ""
      },
      {
        title: "Other book",
        description: "Here's some books",
        id: 2,
        userId: ""
      },
      {
        name: "test2",
        description: "test3",
        items: [],
        userId: "112450104384688887132",
        id: 3
      }
    ],
    auth: {
      userId: "112450104384688887132"
    },
    isSignedIn: true
  };

  const { getByTestId, getByText , store} = renderWithRedux(<BookList />, {
    initialState: initialState
  });

  expect(getByTestId("header").textContent).toBe("Books");
  expect(store.getState()).toBe(initialState);
});

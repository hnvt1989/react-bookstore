import React from "react";
import { Provider, connect } from "react-redux";
import configureMockStore from "redux-mock-store";
import { render, fireEvent, cleanup } from "react-testing-library";
//import { createStore } from "redux";
import { shallow } from "enzyme";
import {BrowserRouter} from 'react-router-dom';

import Adapter from "enzyme-adapter-react-16";
import Enzyme from "enzyme";
import BookList from "../components/books/BookList";

import bookReducer from "../reducers/bookReducer";

const mockStore = configureMockStore();
const store = mockStore({});

import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//disableLifecycleMethods is auto set to True in Enzyme 3
Enzyme.configure({ adapter: new Adapter(), disableLifecycleMethods: true });

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
  const { getByTestId, getByText } = renderWithRedux(<BookList />, {
    initialState: {
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
    }
  });

  expect(getByTestId("header").textContent).toBe("Books");
});

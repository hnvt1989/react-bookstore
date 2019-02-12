import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

import { shallow } from "enzyme";

import Adapter from "enzyme-adapter-react-16";
import Enzyme from "enzyme";
import BookList from "../components/books/BookList";

const mockStore = configureMockStore();
const store = mockStore({});

//disableLifecycleMethods is auto set to True in Enzyme 3
Enzyme.configure({ adapter: new Adapter(), disableLifecycleMethods: true });

//use jest -u to update the snapshot
//using react-render + jest snapshot feature
test("Books Listing header", () => {
  const bookListComponent = shallow(
    <Provider store={store}>
      <BookList />
    </Provider>
  );

  expect(bookListComponent.children('h2').text()).toEqual('Books');

  //const header = bookListComponent.children('div h2');
  //const header = bookListComponent.find("div h2");
  // const header = bookListComponent.find('h2');
  // expect(header.text()).toEqual('Books');

});
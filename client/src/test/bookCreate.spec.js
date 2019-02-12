import React from "react";
import renderer from "react-test-renderer";
import BookCreate from "../components/books/BookCreate";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { shallow } from "enzyme";

import Adapter from "enzyme-adapter-react-16";
import Enzyme from "enzyme";

const mockStore = configureMockStore();
const store = mockStore({});

//disableLifecycleMethods is auto set to True in Enzyme 3
Enzyme.configure({ adapter: new Adapter(), disableLifecycleMethods: true });

//use jest -u to update the snapshot
//using react-render + jest snapshot feature
test("Book Create component", () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <BookCreate />
      </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

//use enzyme shallow render
test("Book create component ", () => {
  const bookCreateComponent = shallow(
    <Provider store={store}>
      <BookCreate />
    </Provider>
  );
  expect(bookCreateComponent.find("BookForm")).toBeTruthy();
});
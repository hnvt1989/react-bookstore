import React from 'react';
import renderer from 'react-test-renderer';
import BookCreate from '../components/books/BookCreate';
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { shallow } from "enzyme";

const mockStore = configureMockStore();
const store = mockStore({})

// test('', () => {
//   const component = renderer.create(
//     <Link page="http://localhost:3000">Facebook</Link>,
//   );
//   let tree = component.toJSON();
//   expect(tree).toMatchSnapshot();

//   // manually trigger the callback
//   tree.props.onMouseEnter();
//   // re-rendering
//   tree = component.toJSON();
//   expect(tree).toMatchSnapshot();

//   // manually trigger the callback
//   tree.props.onMouseLeave();
//   // re-rendering
//   tree = component.toJSON();
//   expect(tree).toMatchSnapshot();
// });

test('Create book', () => {
    const tree = renderer.create(<Provider store={store}>
        <BookCreate />
    </Provider>).toJSON();
    expect(tree).toMatchSnapshot();
});
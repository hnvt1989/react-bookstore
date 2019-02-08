import books from '../apis/books';
import history from '../history';
import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_BOOK,
  FETCH_BOOKS,
  FETCH_CURRENT_USER_BOOKS,
  FETCH_BOOK,
  DELETE_BOOK,
  EDIT_BOOK
} from './types';

export const signIn = userId => {
  return {
    type: SIGN_IN,
    payload: userId
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT
  };
};

export const createBook = formValues => async (dispatch, getState) => {
  const { userId } = getState().auth;
  const response = await books.post('/books', { ...formValues, userId });

  dispatch({ type: CREATE_BOOK, payload: response.data });
  history.push('/');
};

export const fetchBooks = () => async dispatch => {
  const response = await books.get('/books');

  dispatch({ type: FETCH_BOOKS, payload: response.data });
};

export const fetchCurrentUserBooks = () => async (dispatch, getState) => {
  const { userId } = getState().auth;
  const response = await books.get(`/users/${userId}/books`);

  dispatch({ type: FETCH_CURRENT_USER_BOOKS, payload: response.data });
};

export const fetchBook= id => async dispatch => {
  const response = await books.get(`/books/${id}`);

  dispatch({ type: FETCH_BOOK, payload: response.data });
};

export const editBook = (id, formValues) => async (dispatch, getState) => {
  const { userId } = getState().auth;
  const response = await books.patch(`/books/${id}`, { ...formValues, id, userId});

  dispatch({ type: EDIT_BOOK, payload: response.data });
  history.push('/');
};

export const deleteBook = id => async dispatch => {
  //await books.delete(`/books/${id}`, {data: { id}});
  await books.delete(`/books/${id}`);

  dispatch({ type: DELETE_BOOK, payload: id });
  history.push('/');
};

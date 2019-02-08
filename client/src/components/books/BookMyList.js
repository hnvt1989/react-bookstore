import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCurrentUserBooks } from '../../actions';

class BookMyList extends React.Component {
  componentDidMount() {
    this.props.fetchCurrentUserBooks();
  }

  renderAdmin(book) {
    if (book.userId === this.props.currentUserId) {
      return (
        <div className="right floated content">
          <Link to={`/books/edit/${book.id}`} className="ui button primary">
            Edit
          </Link>
          <Link to={`/books/delete/${book.id}`} className="ui button negative">
            Delete
          </Link>
        </div>
      );
    }
  }

  renderList() {
    return this.props.currentUserBooks.map(book => {
      return (
        <div className="item" key={book.id}>
          {this.renderAdmin(book)}
          <i className="large middle aligned icon gift" />
          <div className="content">
            <Link to={`/books/${book.id}`} className="header">
              {book.name}
            </Link>
            <div className="description">{book.description}</div>
          </div>
        </div>
      );
    });
  }

  renderCreate() {
    if (this.props.isSignedIn) {
      return (
        <div style={{ textAlign: 'right' }}>
          <Link to="/books/new" className="ui button primary">
            Create Book
          </Link>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <h2>Books</h2>
        <div className="ui celled list">{this.renderList()}</div>
        {this.renderCreate()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUserBooks: Object.values(state.currentUser.books),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn
  };
};

export default connect(
  mapStateToProps,
  { fetchCurrentUserBooks }
)(BookMyList);

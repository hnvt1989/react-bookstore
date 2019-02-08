import React from 'react';
//import flv from 'flv.js';
import { connect } from 'react-redux';
import { fetchBook } from '../../actions';

class BookShow extends React.Component {
  componentDidMount() {
    const { id } = this.props.match.params;

    this.props.fetchBook(id);
  }

  render() {
    return (
      <div>
        <h3>Info</h3>
        {this.renderListInfo()}
        <h3>Items</h3>
        <div className="ui celled list">{this.renderList()}</div>
      </div>
    );
  }

  renderListInfo(){
    if (!this.props.book) {
      return <div>Loading...</div>;
    }

    return(
      <div>
        <div>{this.props.book.name}</div>
        <div>{this.props.book.description}</div>
      </div>
    );

  }
  renderList() {
    if (!this.props.book) {
      return <div>Loading...</div>;
    }

    if(this.props.book.items.length > 0){
      return this.props.book.items.map(item => {
        return (
          <div className="item" key={item.id}>
            <i className="large middle aligned icon gift" />
            <div className="content">
              <div className="header">
                <a href={`${item.url}`} target="_blank">{item.name}</a>
              </div>
              <div className="description">
                {item.note}
              </div>
            </div>
          </div>
        );
      });
    }else{
      return <div>Empty list</div>
    }

  }
}

const mapStateToProps = (state, ownProps) => {
  return { book: state.books[ownProps.match.params.id] };
};

export default connect(
  mapStateToProps,
  { fetchBook }
)(BookShow);

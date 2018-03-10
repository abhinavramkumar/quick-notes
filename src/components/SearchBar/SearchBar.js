import React, {Component} from 'react';
import {textFilter, sortBy, sortOrder} from '../../actions';
import {connect} from 'react-redux';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {faSortAmountDown, faSortAmountUp} from '@fortawesome/fontawesome-free-solid';

class SearchBar extends Component {
  state = {
    isAscending: false
  }

  onSetTextFilter = e => {
    let text = e.target.value;
    this
      .props
      .setTextFilter(text);
  };

  onSortByChange = e => {
    let sortBy = e.target.value;
    this
      .props
      .setOrderBy(sortBy);
  };

  onSortOrderChange = e => {
    this.setState(prevState => ({
      isAscending: !prevState.isAscending
    }));
    if (this.state.isAscending) {
      this
        .props
        .setSortOrder("asc");
    } else {
      this
        .props
        .setSortOrder("desc");
    }
  }

  render() {
    return (
      <div className="SearchBar">
        <div className="SearchInput">
          <input
            type="text"
            placeholder="Search string..."
            onChange={this.onSetTextFilter}
            value={this.props.filters.text}/>
        </div>
        <div className="SearchInput__sortBy">
          <p>Order By:</p>
          <select onInput={this.onSortByChange} defaultValue="updatedAt">
            <option value="createdAt">Date Created</option>
            <option value="updatedAt">Date Updated</option>
          </select>
        </div>
        <div className="SearchInput__sort">
          <p>Sort:
          </p>
          <button onClick={this.onSortOrderChange} title={this.props.filters.sortOrder}>
            {this.state.isAscending
              ? <FontAwesomeIcon icon={faSortAmountUp}></FontAwesomeIcon>
              : <FontAwesomeIcon icon={faSortAmountDown}></FontAwesomeIcon>}
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({notes, filters}) => ({notes, filters});

const mapDispatchToProps = dispatch => ({
  setTextFilter: text => dispatch(textFilter(text)),
  setOrderBy: order => dispatch(sortBy(order)),
  setSortOrder: orderBy => dispatch(sortOrder(orderBy))
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
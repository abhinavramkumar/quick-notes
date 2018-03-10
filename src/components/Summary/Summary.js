import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getSelectedNotes} from '../../selectors';

class Summary extends Component {
  render() {
    return (
      <div className="Summary">
        {this.props.notes.length === 0
          ? <p>There are no notes as of now!</p>
          : `Total Notes: ${this.props.notes.length} note(s)`}
      </div>
    );
  }
}

const mapStateToProps = ({notes, filters}) => ({
  notes: getSelectedNotes(notes, filters)
});

export default connect(mapStateToProps)(Summary);

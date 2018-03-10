import React, {Component} from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {faPencilAlt, faExpand, faEllipsisV} from '@fortawesome/fontawesome-free-solid';
import {faTrashAlt} from '@fortawesome/fontawesome-free-regular';
class NoteTools extends Component {
  onOptions = (e) => {
    // Display Dropdown Close if already Open
    console.log("Clicking Options")
    this
      .props
      .options();
  }

  onExpand = e => {
    console.log("Expand");
    this
      .props
      .expand();
  };

  onColor = e => {
    // Get value from selected option Makes value into array Change both the dark &
    // light color CSS variables based on array value
  }

  onEdit = e => {
    this
      .props
      .edit();
  }

  onDelete = e => {
    this
      .props
      .delete();
  }
  render() {
    return (
      <div className="Note__tools">
        <button onClick={this.onOptions} className="Note__options">
          <FontAwesomeIcon icon={faEllipsisV}></FontAwesomeIcon>
        </button>

        <div
          className={"Note__tools-dropdown " + (this.props.isShown
          ? 'active'
          : '')}>

          <button className="Note__expand" onClick={this.onExpand} title="Fullpage View">
            <FontAwesomeIcon icon={faExpand}></FontAwesomeIcon>
          </button>

          <button className="Note__edit" onClick={this.onEdit}>
            <FontAwesomeIcon icon={faPencilAlt}></FontAwesomeIcon>
          </button>

          <button className="Note__delete" onClick={this.onDelete}>
            <FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon>
          </button>

        </div>

      </div>
    );
  }
}

export default NoteTools;

import React, { Component } from "react";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import {
  faPencilAlt,
  faExpand,
  faEllipsisV
} from "@fortawesome/fontawesome-free-solid";

/**
 * NoteTools component
 *
 *
 * @class NoteTools
 * @extends {Component}
 */
class NoteTools extends Component {
  onOptions = (e) => {
    /**
     * When options button is clicked toggle options dropdown
     */
    console.log("Clicking Options");
    this.props.options();
  };

  /**
   * When expand button is clicked then expand note ie redirect to individual note page
   */
  onExpand = (e) => {
    console.log("Expand");
    this.props.expand();
  };

  /** When edit button is clicked toggle edit mode */
  onEdit = (e) => {
    this.props.edit();
  };

  /** When delete button is clicked show NoteDelete component ie Delete Dialog */
  onDelete = (e) => {
    this.props.delete();
  };
  render() {
    return (
      <div className="Note__tools">
        <button onClick={this.onOptions} className="Note__options">
          <FontAwesomeIcon icon={faEllipsisV} />
        </button>

        <div
          className={
            "Note__tools-dropdown " + (this.props.isShown ? "active" : "")
          }
        >
          <button
            className="Note__expand"
            onClick={this.onExpand}
            title="Fullpage View"
          >
            <FontAwesomeIcon icon={faExpand} />
          </button>

          <button className="Note__edit" onClick={this.onEdit}>
            <FontAwesomeIcon icon={faPencilAlt} />
          </button>

          <button className="Note__delete" onClick={this.onDelete}>
            <FontAwesomeIcon icon={faTrashAlt} />
          </button>
        </div>
      </div>
    );
  }
}

export default NoteTools;

import React from "react";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faTimes, faCheck } from "@fortawesome/fontawesome-free-solid";

const NoteDelete = props => {
  return (
    <div className="Note__delete-dialog">
      <p>Are you sure you want to delete this post ?</p>
      <div className="Note__delete-tools">
        <button
          className="Note__delete-confirm"
          onClick={this.props.confirmDelete}
        >
          <FontAwesomeIcon icon={faCheck} />
        </button>
        <button className="Note__delete-cancel" onClick={this.cancelDelete}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
    </div>
  );
};

export default NoteDelete;

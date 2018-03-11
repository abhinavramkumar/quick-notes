import React from "react";
import moment from "moment";

/**
 * NoteFooter Component
 * Render Footer with createdAt date if updatedDate is null else render updatedDate
 *
 * @param {any} props
 * @returns
 */
const NoteFooter = (props) => {
  return (
    <div
      className="Note__footer"
      style={{
        backgroundColor: props.color,
        borderTopColor: props.color
      }}
    >
      <p className="Note__createdAt">
        Created: {moment(props.createdAt).format("h:mm a - Do MMM, YYYY")}
      </p>
      {props.updatedAt !== "" && (
        <p className="Note__updatedAt">
          Updated: {moment(props.updatedAt).format("h:mm a - Do MMM, YYYY")}
        </p>
      )}
    </div>
  );
};

export default NoteFooter;

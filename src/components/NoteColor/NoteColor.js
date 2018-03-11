import React, { Component } from "react";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/fontawesome-free-solid";

/**
 * NoteColor Component
 * Display color picker to choose Note Color
 *
 * @class NoteColor
 * @extends {Component}
 */
class NoteColor extends Component {
  state = {
    isShown: false
  };

  /** Show NoteColor when button is clicked */
  toggleNoteColor = (e) => {
    this.setState((prevState) => ({
      isShown: !prevState.isShown
    }));
  };

  /** When Color is selected pass dark and light shade to parent NoteForm Component */
  onColorChange = (e) => {
    let colors = e.target.dataset.colors.split(",");
    let lightColor = colors[0];
    let darkColor = colors[1];
    this.props.color(lightColor, darkColor);
  };

  render() {
    return (
      <div className={"NoteColor " + (this.state.isShown ? "active" : "")}>
        <button className="Note__color-toggle" onClick={this.toggleNoteColor}>
          <FontAwesomeIcon
            icon={this.state.isShown ? faCaretRight : faCaretLeft}
          />
        </button>
        <div className="Note__color-container">
          <button
            className="NoteColor__color Note__color--yellow"
            onClick={this.onColorChange}
            data-colors="#f8f097,#f6ed7f"
          />
          <button
            className="NoteColor__color Note__color--green"
            onClick={this.onColorChange}
            data-colors="#b7f896,#a8f57f"
          />
          <button
            className="NoteColor__color Note__color--blue"
            onClick={this.onColorChange}
            data-colors="#96f8e7,#7ff5ef"
          />
          <button
            className="NoteColor__color Note__color--red"
            onClick={this.onColorChange}
            data-colors="#f89696,#f57f7f"
          />
          <button
            className="NoteColor__color Note__color--purple"
            onClick={this.onColorChange}
            data-colors="#96a6f8,#7f93f5"
          />
        </div>
      </div>
    );
  }
}

export default NoteColor;

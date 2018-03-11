import React, { Component } from "react";
import "../../../node_modules/react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { NoteColor } from "../index";

/**
 * NoteForm component
 * Render Note Form either with props when in edit mode or else as an empty form
 *
 * @class NoteForm
 * @extends {Component}
 */
class NoteForm extends Component {
  state = {
    id: this.props.id ? this.props.id : "",
    title: this.props.title ? this.props.title : "",
    description: this.props.description ? this.props.description : "",
    noteColorDark: this.props.noteColorDark ? this.props.noteColorDark : "",
    noteColorLight: this.props.noteColorLight ? this.props.noteColorLight : "",
    tags: this.props.tags ? this.props.tags.join(",") : ""
  };

  /** Called when new note is saved */
  onFormSubmit = (e) => {
    e.preventDefault();

    const inputs = Array.from(e.target.querySelectorAll("input"));
    const title = inputs[0].value || "No Title";
    const tags = inputs[1].value.length > 0 ? inputs[1].value.split(",") : [];
    const description = e.target.querySelector(".ql-editor").innerHTML;

    let note = {
      title,
      description,
      tags,
      noteColorDark: this.state.noteColorDark,
      noteColorLight: this.state.noteColorLight
    };

    this.props.onFormSubmit(note);
  };

  onTitleChange = (e) => {
    let title = e.target.value;
    this.setState((prevState) => ({ title }));
  };

  onDescriptionChange = (value) => {
    let description = value;
    this.setState((prevState) => ({ description }));
  };

  onTagsChange = (e) => {
    let tags = e.target.value;
    this.setState((prevState) => ({ tags }));
  };

  onColorChange = (noteColorLight, noteColorDark) => {
    this.setState((prevState) => ({ noteColorDark, noteColorLight }));
  };

  render() {
    return (
      <div
        className="NoteForm"
        style={{
          backgroundColor: this.state.noteColorLight
        }}
      >
        <form onSubmit={this.onFormSubmit}>
          {/* Form Title */}
          <div className="form-group">
            <input
              className="form-input NoteForm__title"
              type="text"
              style={{
                backgroundColor: this.props.color
              }}
              value={this.state.title}
              onChange={this.onTitleChange}
              placeholder="Title..."
            />
          </div>

          {/* Form Tags */}
          <div className="form-group">
            <input
              className="form-input NoteForm__tags"
              type="text"
              style={{
                backgroundColor: this.props.color
              }}
              value={this.state.tags}
              onChange={this.onTagsChange}
              placeholder="Add Tags separated by ','"
            />
          </div>

          {/* Form Description */}
          <div className="form-group">
            <ReactQuill
              value={this.state.description && this.state.description}
              onChange={this.onDescriptionChange}
              placeholder="Enter Description..."
            />
          </div>

          {/* Form Submit Button */}
          <div className="form-group">
            <button className="form-input NoteForm__submit" type="submit">
              Save
            </button>
          </div>
        </form>
        <NoteColor color={this.onColorChange} />
      </div>
    );
  }
}

export default NoteForm;

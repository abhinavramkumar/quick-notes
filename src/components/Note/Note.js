import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import ReactHtmlParser from "react-html-parser";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { start__editNote, start__removeNote } from "../../actions";
import { NoteDelete, NoteTools, NoteForm, NoteFooter } from "../index";

/**
 * Nore Component
 * if in edit mode renders the NoteForm with props else render Note
 *
 * @class Note
 * @extends {Component}
 */
class Note extends Component {
  state = {
    isDelete: false,
    isEditMode: false,
    showOptions: false
  };

  onExpandClick = () => {
    this.props.history.push(`/note/${this.props.publicId}`);
    this.setState((prevState) => ({ showOptions: false }));
  };

  /** show delete dialog when delete button is clicked */
  onDeleteClick = () => {
    this.setState((prevState) => ({
      isDelete: !prevState.isDelete,
      showOptions: false
    }));
  };

  /** Hide delete dialog if cancel delete button is clicked */
  onDeleteCancel = (e) => {
    this.setState((prevState) => ({
      isDelete: !prevState.isDelete
    }));
  };

  /** Confirm Delete if confirm button is clicked */
  onDeleteConfirm = (e) => {
    this.props.deleteNote(this.props.id);
    this.setState((prevState) => ({
      isDelete: !prevState.isDelete
    }));
  };

  /** set edit mode as true and show edit form */
  onEditClick = () => {
    this.setState((prevState) => ({
      isEditMode: !prevState.isEditMode,
      showOptions: false
    }));
  };

  /** Show dropdown options */
  onOptionsClick = () => {
    this.setState((prevState) => ({
      showOptions: !prevState.showOptions
    }));
  };

  /**
   * Called when Editing existing note is edited and saved
   * Redux action to updateNote is called
   * Edit mode is reset to false on save
   */
  onFormSubmit = ({
    title,
    description,
    tags,
    noteColorDark,
    noteColorLight
  }) => {
    let note = {
      title,
      description,
      tags,
      id: this.props.id,
      createdAt: this.props.createdAt,
      updatedAt: moment.now(),
      noteColorDark,
      noteColorLight,
      publicId: this.props.publicId
    };

    this.props.updateNote(note);

    this.setState((prevState) => ({
      isEditMode: !prevState.isEditMode
    }));
  };

  render() {
    /**
     * If in Edit Mode then show form
     * pass props to form
     * else
     * render Note
     */
    return !this.state.isEditMode ? (
      <div className="Note">
        {/* Note Header */}
        <header
          className="Note__title"
          style={{
            backgroundColor: this.props.noteColorDark,
            borderBottomColor: this.props.noteColorDark
          }}
        >
          <h3>{this.props.title}</h3>

          {/* Note Tools*/}
          <NoteTools
            options={this.onOptionsClick}
            history={this.props.history}
            edit={this.onEditClick}
            delete={this.onDeleteClick}
            expand={this.onExpandClick}
            isShown={this.state.showOptions}
          />
        </header>

        {/* Note Tags */}
        <div
          className="Note__tags"
          style={{
            backgroundColor: this.props.noteColorDark
          }}
        >
          {this.props.tags &&
            this.props.tags.map((tag, index) => {
              return (
                <span key={index} className="Note__tag">
                  {tag}
                </span>
              );
            })}
        </div>

        {/* Delete Dialog */}
        {this.state.isDelete && (
          <NoteDelete
            confirmDelete={this.onDeleteConfirm}
            cancelDelete={this.onDeleteCancel}
          />
        )}

        {/* Note Body */}
        <div
          className="Note__body"
          style={{
            backgroundColor: this.props.noteColorLight
          }}
        >
          {ReactHtmlParser(this.props.description)}
        </div>

        <NoteFooter
          color={this.props.noteColorDark}
          updatedAt={this.props.updatedAt}
          createdAt={this.props.createdAt}
        />
      </div>
    ) : (
      <NoteForm
        id={this.props.id}
        title={this.props.title}
        tags={this.props.tags}
        description={this.props.description}
        createdAt={this.props.createdAt}
        updatedAt={this.props.updatedAt}
        mode="edit"
        noteColorLight={this.props.noteColorLight}
        noteColorDark={this.props.noteColorDark}
        onFormSubmit={this.onFormSubmit}
      />
    );
  }
}

/** Pass deleteNote & updateNote thunks as props */
const mapDispatchToProps = (dispatch) => ({
  deleteNote: (id) => dispatch(start__removeNote(id)),
  updateNote: (updatedNote) => dispatch(start__editNote(updatedNote))
});

export default connect(undefined, mapDispatchToProps)(Note);

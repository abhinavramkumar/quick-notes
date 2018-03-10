import React, {Component} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import ReactHtmlParser from 'react-html-parser';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {start__editNote, start__removeNote} from '../../actions';
import {NoteDelete,NoteTools, NoteForm, NoteFooter} from '../index';

class Note extends Component {
  state = {
    isDelete: false,
    isEditMode: false,
    showOptions: false
  }

  onExpandClick = () => {
    this
      .props
      .history
      .push(`/note/${this.props.publicId}`);
    this.setState(prevState => ({showOptions: false}));
  };

  onDeleteClick = () => {
    this.setState(prevState => ({
      isDelete: !prevState.isDelete,
      showOptions: false
    }));
  };

  onDeleteCancel = e => {
    this.setState(prevState => ({
      isDelete: !prevState.isDelete
    }));
  };

  onDeleteConfirm = e => {
    this
      .props
      .deleteNote(this.props.id);
    this.setState(prevState => ({
      isDelete: !prevState.isDelete
    }));
  };

  onEditClick = () => {
    this.setState(prevState => ({
      isEditMode: !prevState.isEditMode,
      showOptions: false
    }));
  };

  onOptionsClick = () => {
    this.setState(prevState => ({
      showOptions: !prevState.showOptions
    }));
  };

  onFormSubmit = ({title, description, tags, noteColorDark, noteColorLight}) => {
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

    this
      .props
      .updateNote(note);

    this.setState(prevState => ({
      isEditMode: !prevState.isEditMode
    }));

  };

  render() {
    return !this.state.isEditMode
      ? (<div className="Note">
          {/* Note Header */}
          <header
            className="Note__title"
            style={{
            backgroundColor: this.props.noteColorDark,
            borderBottomColor: this.props.noteColorDark
          }}>
            <h3>{this.props.title}</h3>

            {/* Note Tools*/}
            <NoteTools
              options={this.onOptionsClick}
              history={this.props.history}
              edit={this.onEditClick}
              delete={this.onDeleteClick}
              expand={this.onExpandClick}
              isShown={this.state.showOptions}></NoteTools>
          </header>

          {/* Note Tags */}
          <div
            className="Note__tags"
            style={{
            backgroundColor: this.props.noteColorDark
          }}>
            {this.props.tags && this
              .props
              .tags
              .map((tag, index) => {
                return <span key={index} className="Note__tag">{tag}</span>
              })}
          </div>

          {/* Delete Dialog */}
          {this.state.isDelete && <NoteDelete confirmDelete={this.onDeleteConfirm} cancelDelete={this.onDeleteCancel}/>}

          {/* Note Body */}
          <div
            className="Note__body"
            style={{
            backgroundColor: this.props.noteColorLight
          }}>
            {ReactHtmlParser(this.props.description)}
          </div>

          <NoteFooter
            color={this.props.noteColorDark}
            updatedAt={this.props.updatedAt}
            createdAt={this.props.createdAt}></NoteFooter>
        </div>)
      : (<NoteForm
          id={this.props.id}
          title={this.props.title}
          tags={this.props.tags}
          description={this.props.description}
          createdAt={this.props.createdAt}
          updatedAt={this.props.updatedAt}
          mode="edit"
          noteColorLight={this.props.noteColorLight}
          noteColorDark={this.props.noteColorDark}
          onFormSubmit={this.onFormSubmit}></NoteForm>)
  };

}

const mapDispatchToProps = dispatch => ({
  deleteNote: id => dispatch(start__removeNote(id)),
  updateNote: updatedNote => dispatch(start__editNote(updatedNote))
});

export default connect(undefined, mapDispatchToProps)(Note);
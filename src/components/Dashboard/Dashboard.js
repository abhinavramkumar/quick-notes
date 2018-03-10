import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import uuid from "uuid";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import {
  faTh,
  faThList,
  faPlusCircle
} from "@fortawesome/fontawesome-free-solid";
import { getSelectedNotes } from "../../selectors";
import { Note, NoteForm, SearchBar, Summary } from "../index";
import { start__addNote } from "../../actions";

class Dashboard extends Component {
  state = {
    isCreating: false
  };

  onCreateButtonClick = e => {
    this.setState(prevState => ({
      isCreating: !prevState.isCreating
    }));
  };

  onFormSubmit = ({
    title,
    description,
    tags,
    noteColorDark,
    noteColorLight
  }) => {
    let createdAt = moment.now();
    let updatedAt = "";
    let note = {
      title,
      publicId: uuid(),
      description,
      tags,
      createdAt,
      updatedAt,
      noteColorDark,
      noteColorLight
    };
    this.props.addNewNote(note);

    this.setState(prevState => ({ isCreating: false }));
  };

  onClickGridLayout = e => {
    let notesList = document.querySelector(".NotesList");
    if (notesList.classList.contains("NotesList__list")) {
      notesList.classList.remove("NotesList__list");
    }
  };

  onClickListLayout = e => {
    let notesList = document.querySelector(".NotesList");
    if (!notesList.classList.contains("NotesList__list")) {
      notesList.classList.add("NotesList__list");
    }
  };

  render() {
    return (
      <div className="Dashboard">
        {/* Search Panel */}
        <section className="Dashboard__search-panel">
          {/* Seach Bar Container */}
          <div className="search-bar-container">
            <SearchBar />
            {/* Set Layout Container */}
            <div className="note-layout-container">
              <p>Change Layout:</p>
              <button onClick={this.onClickGridLayout} title="Grid Layout">
                <FontAwesomeIcon icon={faTh} />
              </button>
              <button onClick={this.onClickListLayout} title="List Layout">
                <FontAwesomeIcon icon={faThList} />
              </button>
            </div>
            {/* Create Note Container */}
            <div className="create-note-container">
              <button
                className="create-note-button"
                onClick={this.onCreateButtonClick}
              >
                <span>Create Note</span>
                <FontAwesomeIcon icon={faPlusCircle} />
              </button>
            </div>
          </div>
        </section>

        {/* Dashboard Content */}
        <section className="Dashboard__content">
          <div className="container">
            {/* Notes Summary */}
            <Summary />

            {/* Notes List */}
            <div className="NotesList">
              {this.state.isCreating && (
                <NoteForm
                  onFormSubmit={this.onFormSubmit}
                  noteColorLight={"#f7ef96"}
                  noteColorDark={"#f6ed7f"}
                  mode=""
                />
              )}
              {/* Note */}
              {this.props.notes.length > 0 ? (
                this.props.notes.map(note => {
                  return (
                    <Note
                      key={note.id}
                      id={note.id}
                      description={note.description}
                      title={note.title}
                      tags={note.tags}
                      createdAt={note.createdAt}
                      updatedAt={note.updatedAt}
                      history={this.props.history}
                      publicId={note.publicId}
                      noteColorDark={note.noteColorDark}
                      noteColorLight={note.noteColorLight}
                    />
                  );
                })
              ) : (
                <p>
                  Create a new Note by clicking on the 'Create Note' Button.
                </p>
              )}
            </div>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = ({ notes, filters }) => ({
  notes: getSelectedNotes(notes, filters),
  filters
});

const mapDispatchToProps = dispatch => ({
  addNewNote: note => dispatch(start__addNote(note))
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactQuill from 'react-quill';
import toast from 'toastr';
import sanitizeHtml from 'sanitize-html-react';
import {
  createComment,
  editComment
} from '../../../redux/actionCreator/commentsActions';
import 'react-quill/dist/quill.snow.css';
import './_CommentBox.scss';
import ButtonLoadingIcon from '../../Forms/ButtonLoadingIcon';

export class CommentBox extends Component {
  constructor(props) {
    super(props);
    const { comment, startSubmitReady, newRequest } = this.props;
    this.state = {
      text: comment || '',
      submitReady: startSubmitReady || false,
      newRequest: newRequest || false,
    };
  }

  componentWillReceiveProps = (nextProps) => {
    const { creatingComment } = nextProps;
    if( !creatingComment) {
      this.setState({
        text: '',
        submitReady: !this.emptyText()
      });
    }
  };

  urlDetector = (html) => {
    const processedHtml = html.replace(/(<a.*>)?(https?:\/\/)*([\w-@]+\.)+[a-zA-Z]{2,4}(\/[\w-]*)*(<\/a.*>)?\.?[\w-]*(<\/a.*>)?/g, (match) => {
      if (/([a-zA-Z0-9]@|<\/a.*>)/.test(match)) return `<code class="email-text" style="color: blue;">${match}</code>`;
      const url = /(https?:\/\/[^ ]*)/.test(match) ? match : `http://${match}`;
      return `<a href="${url}" target="_blank">${match}</a>`;
    });
    return processedHtml; 
  };

  handleKeyUp = event => {
    if (event.target.innerText.trim().length >= 1) {
      this.setState({
        text: event.target.innerHTML,
        submitReady: true
      });
    } else {
      this.setState({
        text: '',
        submitReady: !this.emptyText()
      });
    }
  };

  handleChange = value => {
    this.setState({
      text: value,
      submitReady: !this.emptyText()
    });
  };

  handleFocus = event => {
    event.target.editorContainer.style.border = '1px solid blue';
    const { dataInput } = this.state;
    this.setState({
      text: ''
    });
  };

  handleBlur = event => {
    event.target.editorContainer.style.border = '1px solid #E4E4E4';
    const { text } = this.state;
    if (text === '') {
      this.setState({
        text: '',
        submitReady: !this.emptyText()
      });
    }
  };

  handleSubmit = event => {
    const { text, newRequest } = this.state;
    const { createComment, requestId, documentId, handleComment } = this.props;
    event.preventDefault();
    if (text.trim() !== '') {
      if (newRequest) {
        handleComment( this.sanitizeInputData(this.urlDetector(text)));
        toast.success('Comment Added Successfully. Please proceed to submit the request.');
        this.setState({
          text: ''
        });
      } else {
        createComment(requestId, documentId, this.sanitizeInputData(this.urlDetector(text)));
      }
    }
    this.setState({
      submitReady: false
    });
  };

  // sanitize input data from comment box
  sanitizeInputData = dirtyHtml => {
    const cleanHtml = sanitizeHtml(dirtyHtml, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(['u']),
      allowedAttributes: {
        a: ['href', 'target'],
        code: ['class']
      },   
    });
    return cleanHtml;
  };

  handleEditComment = event => {
    event.preventDefault();
    const { text } = this.state;
    const cachedComment = localStorage.getItem('comment');
    const {
      editComment,
      requestId,
      id,
      afterSubmit,
      handleNoEdit
    } = this.props;
    if (text !== cachedComment && text !== '') {
      editComment(requestId, text, id);
    } else {
      handleNoEdit();
    }
    afterSubmit();
  };

  emptyText = () => {
    const { text } = this.state;
    return text === '' || text === '<p><br></p>';
  };

  renderButtons = () => {
    const { submitReady, newRequest } = this.state;
    const { comment , creatingComment } = this.props;
    const status = submitReady ? '--active' : '';
    return (
      <span className="editor__btn-wrap">
        {comment ? (
          <div>
            <button
              type="submit"
              onClick={this.handleEditComment}
              className={`editor__post-btn editor__post-btn${status}
              --active post-btn-text edit-buttons`}
              disabled={!submitReady}
            >
              <ButtonLoadingIcon isLoading={creatingComment} buttonText="Save" />
            </button>
          </div>
        ) : (
          <button
            className={`editor__post-btn editor__post-btn${status} post-btn-text`}
            type="submit"
            id="post-submit"
            onClick={this.handleSubmit}
            disabled={!submitReady}
          >
            <ButtonLoadingIcon isLoading={creatingComment} buttonText={newRequest ? 'Add comment' : 'Post'} />
          </button>
        )}
      </span>
    );
  }

  render() {
    const { text } = this.state;
    return (
      <div className="editor__editor-form mdl-cell mdl-cell--8-col mdl-cell--12-col-tablet mdl-cell--12-col-phone">
        <ReactQuill
          value={text}
          className="quill-contents"
          onChange={this.handleChange}
          onKeyUp={this.handleKeyUp}
          modules={CommentBox.modules}
          placeholder="Write a comment"
        />
        <div className="editor__btn-size">
          {this.renderButtons()}
        </div>
      </div>
    );
  }
}

CommentBox.modules = {
  toolbar: [
    ['bold', 'italic', 'underline'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' }
    ]
  ]
};

CommentBox.propTypes = {
  createComment: PropTypes.func.isRequired,
  editComment: PropTypes.func.isRequired,
  requestId: PropTypes.string,
  documentId: PropTypes.string,
  newRequest: PropTypes.bool,
  comment: PropTypes.string,
  id: PropTypes.string,
  creatingComment: PropTypes.bool,
  afterSubmit: PropTypes.func,
  handleNoEdit: PropTypes.func,
  startSubmitReady: PropTypes.bool,
  handleComment: PropTypes.func,
};

CommentBox.defaultProps = {
  afterSubmit: () => {},
  requestId: '',
  creatingComment: false,
  documentId: '',
  newRequest: false,
  comment: '',
  id: '',
  handleNoEdit: () => {},
  handleComment: () => {},
  startSubmitReady: false
};

const mapStateToProps = ({ comments }) => ({
  creatingComment: comments.creatingComment,
  editingComment: comments.editingComment
});

export default connect(
  mapStateToProps,
  { createComment, editComment }
)(CommentBox);


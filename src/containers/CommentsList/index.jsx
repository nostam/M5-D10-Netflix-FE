import React from "react";
import { Spinner, Container } from "react-bootstrap";
import Comment from "../../components/Comments";

class CommentsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      comments: [],
      loading: true,
      movieID: "",
      updateComment: false,
    };
  }

  componentDidUpdate = async (prevProp, prevState) => {
    if (prevProp.movieID !== this.props.movieID) {
      await this.setState({ movieID: this.props.movieID });
      await this.fetchComments();
      console.log(this.state.comments);
    }
    if (this.state.updateComment == true) {
      await this.fetchComments();
      this.setState({ updateComment: false });
    }
    if (this.props.updateComState) {
      await this.fetchComments();
      this.props.updateComments(false);
    }
  };

  fetchComments = async () => {
    let { movieID } = this.state;
    try {
      let response = await fetch(
        `${process.env.REACT_APP_API_URL}/media/${movieID}/reviews`,
        {
          headers: {
            Authorization: "",
          },
        }
      );
      let comments = await response.json();
      this.setState({ comments: comments, loading: false });
    } catch (e) {
      console.log("error happened, that's life", e);
      this.setState({ loading: false });
    }
  };

  handleCommentDelete = async (id) => {
    try {
      let response = await fetch(
        `${process.env.REACT_APP_API_URL}/reviews/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: "",
          },
        }
      );
      let newComments = await response.json();
      this.setState({ comments: newComments });
    } catch (e) {
      console.log("error at deleting, ", e);
    }
  };

  render() {
    return (
      <Container className="my-5">
        <h3>Comments: </h3>
        {this.state.loading && (
          <div className="font-bold d-flex justify-content-center">
            <span>Feching comments</span>
            <Spinner animation="border" variant="success" />
          </div>
        )}
        {this.state.comments.map((comment, index) => (
          <Comment
            key={index}
            comment={comment}
            handleDel={() => this.handleCommentDelete(comment._id)}
          />
        ))}
      </Container>
    );
  }
}

export default CommentsList;

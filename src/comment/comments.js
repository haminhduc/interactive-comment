import React from "react";
import { useState, useEffect } from "react";
import {
  getComments as getCommentsApi,
  createComment as createCommentApi,
  deleteComment as deleteCommentApi,
  updateComment as updateCommentApi,
} from "../api";
import CommentForm from "./commentForm";
import Comment from "./comment";

// get root comments function
function Comments({ currentUserId }) {
  const [backendComments, setBackendComments] = useState([]);
  const [activeComment, setActiveComment] = useState(null);
  const rootComments = backendComments.filter(
    (backendComment) => backendComment.parentId === null
  );
  // console.log(backendComments);
  useEffect(() => {
    getCommentsApi().then((data) => {
      setBackendComments(data);
    });
  }, []);
  //add comment
  function addComment(text, parentCommentId) {
    console.log("new comment", text, parentCommentId);
    createCommentApi(text, parentCommentId).then((comment) => {
      setBackendComments([comment, ...backendComments]);
      setActiveComment(null);
    });
  }
  // get replies of each root comment
  function getReplies(parentCommentId) {
    return backendComments
      .filter((backendComment) => backendComment.parentId === parentCommentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
  }
  function deleteComment(commentId) {
    if (window.confirm("Are you sure you want to delete this comment")) {
      deleteCommentApi(commentId).then(() => {
        const updatedComments = backendComments.filter(
          (backendComment) => backendComment.id !== commentId
        );
        setBackendComments(updatedComments);
      });
    }
  }
  function updateComment(text, commentId) {
    updateCommentApi(text, commentId).then(() => {
      const updatedBackendComments = backendComments.map((backendComment) => {
        if (backendComment.id === commentId) {
          return { ...backendComment, body: text };
        }
        return backendComment;
      });
      setBackendComments(updatedBackendComments);
      setActiveComment(null);
    });
  }
  return (
    <div className="comments">
      <h3 className="comment-title">Comments</h3>
      <div className="comment-form-title">
        <CommentForm submitLabel="write" handleSubmit={addComment} />
      </div>
      <div className="comment-container">
        {rootComments.map((rootComment) => (
          <Comment
            key={rootComment.id}
            comment={rootComment}
            replies={getReplies(rootComment.id)}
            currentUserId={currentUserId}
            handleDelete={deleteComment}
            activeComment={activeComment}
            setActiveComment={setActiveComment}
            addComment={addComment}
            updateComment={updateComment}
          />
        ))}
      </div>
    </div>
  );
}

export default Comments;

import React from "react";
import { useState, useEffect } from "react";
import {
  getComments as getCommentsApi,
  createComment as createCommentApi,
} from "../api";
import CommentForm from "./commentForm";
import Comment from "./comment";

// get root comments function
function Comments() {
  const [backendComments, setBackendComments] = useState([]);
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
    console.log("new comment", text);
    createCommentApi(text, parentCommentId).then((comment) =>
      setBackendComments([comment, ...backendComments])
    );
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
          />
        ))}
      </div>
    </div>
  );
}

export default Comments;

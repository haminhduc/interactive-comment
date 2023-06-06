import CommentForm from "./commentForm";

function Comment({
  comment,
  replies,
  currentUserId,
  handleDelete,
  activeComment,
  updateComment,
  addComment,
  setActiveComment,
  parentId = null,
}) {
  // console.log(comment);
  // console.log(comment.username);
  const timeLimit = 300000;
  const passTimeLimit = new Date() - new Date(comment.createdAt) > timeLimit;
  const canReply = Boolean(currentUserId);
  const canEdit = currentUserId === comment.userId && !passTimeLimit;
  const canDelete = currentUserId === comment.userId && !passTimeLimit;
  const createdAt = new Date(comment.createdAt).toDateString();
  const isReplying =
    activeComment &&
    activeComment.type === "replying" &&
    activeComment.id === comment.id;
  const isEditing =
    activeComment &&
    activeComment.type === "editing" &&
    activeComment.id === comment.id;
  const replyId = parentId ? parentId : comment.id;
  return (
    // render comments
    <div className="comment">
      <div className="comment-image-container">
        <img
          src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
          alt="avatar"
        />
      </div>
      <div className="comment-right-part">
        <div className="comment-content">
          <div className="comment-author">{comment.username}</div>
          <div className="">{createdAt}</div>
        </div>
        {!isEditing && <div className="comment-text">{comment.body}</div>}
        {isEditing && (
          <CommentForm
            submitLabel="Update"
            hasCancelButton
            initialText={comment.body}
            handleSubmit={(text) => updateComment(text, comment.id)}
            handleCancelButton={() => setActiveComment(null)}
          />
        )}
        <div className="comment-actions">
          {canReply && (
            <div
              className="comment-action"
              onClick={() =>
                setActiveComment({ type: "replying", id: comment.id })
              }
            >
              Reply
            </div>
          )}
          {canEdit && (
            <div
              className="comment-action"
              onClick={() =>
                setActiveComment({ type: "editing", id: comment.id })
              }
            >
              Edit
            </div>
          )}
          {canDelete && (
            <div
              className="comment-action"
              onClick={() => handleDelete(comment.id)}
            >
              Delete
            </div>
          )}
        </div>

        {/*  render replies to comments */}
        {isReplying && (
          <CommentForm
            submitLabel="Reply"
            handleSubmit={(text) => addComment(text, replyId)}
          />
        )}
        {replies.length > 0 && (
          <div className="replies">
            {replies.map((reply) => (
              <Comment
                key={reply.id}
                comment={reply}
                replies={[]}
                currentUserId={currentUserId}
                handleDelete={handleDelete}
                parentId={comment.id}
                activeComment={activeComment}
                setActiveComment={setActiveComment}
                addComment={addComment}
                updateComment={updateComment}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Comment;

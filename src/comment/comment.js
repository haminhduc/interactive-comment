function Comment({ comment, replies }) {
  // console.log(comment);
  // console.log(comment.username);
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
          <div className="">{comment.createdAt}</div>
        </div>
        <div className="comment-text">{comment.body}</div>
        {/*  render replies to comments */}
        {replies.length > 0 && (
          <div className="replies">
            {replies.map((reply) => (
              <Comment key={reply.id} comment={reply} replies={[]} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Comment;

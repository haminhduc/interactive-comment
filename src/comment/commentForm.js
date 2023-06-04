import { useState } from "react";

function CommentForm({ handleSubmit, submitLabel }) {
  const [text, setText] = useState("");
  const isTextareaDisableButton = text.length === 0;
  function onSubmit(event) {
    event.preventDefault();
    handleSubmit(text);
    console.log(text);
    setText("");
  }
  return (
    <form onSubmit={onSubmit}>
      <textarea
        placeholder="enter comment"
        className="comment-form-textarea"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      <button disabled={isTextareaDisableButton}>{submitLabel}</button>
    </form>
  );
}

export default CommentForm;

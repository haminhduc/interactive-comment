import { useState } from "react";

function CommentForm({
  handleSubmit,
  submitLabel,
  hasCancelButton = false,
  initialText = "",
  handleCancelButton,
}) {
  const [text, setText] = useState(initialText);
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
      <button
        className="comment-form-button"
        disabled={isTextareaDisableButton}
      >
        {submitLabel}
      </button>
      {hasCancelButton && (
        <button
          type="button"
          className="comment-form-button comment-form-cancel-button"
          onClick={handleCancelButton}
        >
          Cancel
        </button>
      )}
    </form>
  );
}

export default CommentForm;

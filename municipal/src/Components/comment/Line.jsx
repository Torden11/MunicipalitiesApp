import { useContext } from 'react';
import Comment from '../../Contexts/Comment';

function Line({ comment }) {

    const { setComment, setDeleteData } = useContext(Comment);

    const approve = (id) => {
        setComment({
          id,
          status: 1,
        });
      };
    
      const remove = (id) => {
        setDeleteData({ id });
      };

    return (
        <li key={comment.id} className="list-group-item">
      <div className="comment-id">comment # {comment.id}</div>

      <div className="comment-details">
        <div>{comment.municipalityTitle}</div>
        <div>{comment.serviceTitle}</div>
      </div>
      <div className="comment-post">
        <div>{comment.post}</div>
      </div>
      <div className="comment-status">
        {comment.status === 0 ? (
          <div style={{ color: "crimson" }}>Not confirmed</div>
        ) : (
          <div style={{ color: "green" }}>Confirmed</div>
        )}
      </div>
      {comment.status === 0 ? (
        <div className="btn__box">
          <button
            onClick={() => approve(comment.id)}
            type="button"
            className="btn btn-outline-success"
          >
            Confirm
          </button>
          <button
            onClick={() => remove(comment.id)}
            type="button"
            className="btn btn-outline-danger"
          >
            Delete
          </button>
        </div>
      ) : null}
    </li>
  );
};

export default Line;
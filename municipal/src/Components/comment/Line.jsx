import { useContext } from "react";
import Comment from "../../Contexts/Comment";

function Line({ comment }) {
  const { setComment, setDeleteData } = useContext(Comment);

  
  const approve = (id) => {
    setComment({
      id,
      status: 1
    });
  };

  const remove = (id) => {
    setDeleteData({ id });
  };

  return (
    <li className="list-group-item">
      <div className="home">
        <div className="home_content">
          <div className="home-content-info">comment # {comment.comment_id}</div>
          <div className="home-content-info">
            <div>{comment.municipalityTitle}</div>
            <div>{comment.serviceTitle}</div>
          </div>
          <div className="home-content-info">
            <div>{comment.post}</div>
          </div>
        </div>
        <div className="home-content">
          {comment.status === 0 ? (
            <div style={{ color: "crimson" }}>Not confirmed</div>
          ) : (
            <div style={{ color: "green" }}>Confirmed</div>
          )}
        </div>
      </div>
      <div className="home">
        {comment.status === 0 ? (
          <div className="home_content_buttons">
            <button
              onClick={() => approve(comment.comment_id)}
              type="button"
              className="btn btn-outline-success"
            >
              Confirm
            </button>
            <button
              onClick={() => remove(comment.comment_id)}
              type="button"
              className="btn btn-outline-danger"
            >
              Delete
            </button>
          </div>
        ) : null}
      </div>
    </li>
  );
}

export default Line;

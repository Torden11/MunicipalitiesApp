import { useState, useEffect, useContext } from 'react';
import Comment from "../../Contexts/Comment";
import Line from './Line';


function List() {

    const { comments, setComments } = useContext(Comment);
    const [status, setStatus] = useState('5')
    


    useEffect(() => {
        if (Number(status) === 5) {
          setComments((prevCom) => prevCom?.map((c) => ({ ...c, show: true })));
        } else {
          setComments((prevCom) =>
            prevCom?.map((c) =>
              Number(c.status) === Number(status)
                ? { ...c, show: true }
                : { ...c, show: false }
            )
          );
        }
    }, [status, setComments]);

    return (
    <>
        <div className="card m-4">
        <h5 className="card-header">Filter</h5>
        <div className="card-body">
          <div className="mb-3">
            <label className="form-label">
              Sort by status:
            </label>
            <select
              className="form-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value={5} defaultValue>
                All
              </option>
              <option value={0}>Not confirmed</option>
              <option value={1}>Confirmed</option>
            </select>
          </div>
        </div>
      </div>
      <div className="card m-4">
        <h5 className="card-header">Comments:</h5>

        <ul className="list-group">
          {comments?.map((c) =>
            c.show ? <Line key={c.comment_id} comment={c} /> : null
          )}
        </ul>
      </div>
    </>
    );
}

export default List;
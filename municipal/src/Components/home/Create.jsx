import React, { useContext, useState } from "react";
import Home from "../../Contexts/Home";
import DataContext from "../../Contexts/DataContext";

const Create = () => {
  const [municipality, setMunicipality] = useState(0);
  const [service, setService] = useState(0);
  const [post, setPost] = useState("");

  const { setCreateData, municipalities, services } = useContext(Home);
  const { makeMsg } = useContext(DataContext);

  const addComment = () => {
    if (municipality === 0) {
      makeMsg("Please choose a municipality.");
      return;
    }
    if (service === 0) {
      makeMsg("Please choose a service.");
      return;
    }
    if (post.length === 0) {
      makeMsg("You haven't posted anything.");
      return;
    }
    setCreateData({
      mun_id: municipality,
      service_id: service,
      post,
    });
    setMunicipality("");
    setService("");
    setPost("");
  };

  return (
    <div className="card m-4">
      <h5 className="card-header">Add a comment</h5>
      <div className="card-body">
        <div className="mb-3">
          <label className="form-label">Municipality</label>
          <select
            className="form-select"
            value={municipality}
            onChange={(e) => setMunicipality(e.target.value)}
          >
            <option value={0} disabled>
              Choose from list
            </option>

            {municipalities?.map((m) => (
              <option key={m.id} value={m.id}>
                {m.title}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Service</label>
          <select
            className="form-select"
            value={service}
            onChange={(e) => setService(e.target.value)}
          >
            <option value={0} disabled>
              Choose from list
            </option>

            {services?.map((s) => (
              <option key={s.id} value={s.id}>
                {s.title}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Comment</label>
          <input
            type="text"
            className="form-control"
            value={post}
            onChange={(e) => setPost(e.target.value)}
          />
        </div>
        <button
          onClick={addComment}
          type="button"
          className="btn btn-outline-success"
        >
          Add comment
        </button>
      </div>
    </div>
  );
};

export default Create;

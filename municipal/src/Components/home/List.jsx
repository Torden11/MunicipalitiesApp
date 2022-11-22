import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import Home from "../../Contexts/Home";
import Line from "./Line";

const List = () => {
  const [municipalityId, setMunicipalityId] = useState(0);
  const [serviceId, setServiceId] = useState(0);

  const {
    comments,
    setComments,
    municipalities,
    services,
    filterOn,
    filterWhat,
  } = useContext(Home);

  useEffect(() => {
    setComments((prevCom) =>
      prevCom?.map((c) =>
        (Number(c.sid) === Number(serviceId) || Number(serviceId) === 0) &&
        (Number(c.mid) === Number(municipalityId) ||
          Number(municipalityId) === 0)
          ? { ...c, show: true }
          : { ...c, show: false }
      )
    );
  }, [serviceId, municipalityId, setComments]);

  const resetFilter = () => {
    setMunicipalityId("");
    setServiceId("");
    setComments((prevCom) => prevCom.map((c) => ({ ...c, show: true })));
    filterOn.current = false;
    filterWhat.current = null;
  };

  return (
    <>
      <div className="card m-4">
        <h5 className="card-header">Filter Comments</h5>
        <div className="card-body">
          <div className="mb-3">
            <label className="form-label">By municipality</label>
            <select
              className="form-select"
              value={municipalityId}
              onChange={(e) => setMunicipalityId(e.target.value)}
            >
              <option value={0}>All municipalities</option>
              {municipalities?.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.title}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">By a type of service</label>
            <select
              className="form-select"
              value={serviceId}
              onChange={(e) => setServiceId(e.target.value)}
            >
              <option value={0}>All services</option>
              {services?.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="card m-4">
        <h5 className="card-header">Comments List:</h5>
        <button
          onClick={resetFilter}
          type="button"
          className="mx-auto btn btn-outline-success"
        >
          Show all comments
        </button>
        <div className="card-body">
          <ul className="list-group">
            {comments?.map((c) =>
              c.show ? <Line key={c.id} comment={c} /> : null
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default List;

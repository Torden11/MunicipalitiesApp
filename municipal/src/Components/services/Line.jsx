import { useContext } from 'react';
import Services from '../../Contexts/Services';

function Line({ service }) {

    const { setDeleteData, setModalData } = useContext(Services);

    return (
        <li className="list-group-item">
            <div className="line">
                <div className="line__content">
                    <div className="line__content__title">
                        <h1>{service.title}</h1>
                    </div>
                </div>
                <div className="line__buttons">
                    <button onClick={() => setModalData(service)} type="button" className="btn btn-outline-success">Edit</button>
                    <button onClick={() => setDeleteData(service)} type="button" className="btn btn-outline-danger">Delete</button>
                </div>
            </div>
        </li>
    )
}

export default Line;
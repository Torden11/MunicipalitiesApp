import { useContext } from 'react';
import Municipalities from '../../Contexts/Municipalities';

function Line({ municipality }) {

    const { setDeleteData, setModalData } = useContext(Municipalities);

    return (
        <li className="list-group-item">
            <div className="line">
                <div className="line__content">
                    <div className="line__content__info">
                        {municipality.image ? <div className='img-bin'>
                            <img src={municipality.image} alt={municipality.title}>
                            </img>
                        </div> : <span className="red-image">No image</span>}
                    </div>
                    <div className="line__content__title">
                        <h1>{municipality.title}</h1>
                    </div>
                </div>
                <div className="line__buttons">
                    <button onClick={() => setModalData(municipality)} type="button" className="btn btn-outline-success">Edit</button>
                    <button onClick={() => setDeleteData(municipality)} type="button" className="btn btn-outline-danger">Delete</button>
                </div>
            </div>
        </li>
    )
}

export default Line;
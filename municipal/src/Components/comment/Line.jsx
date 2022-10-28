import { useContext } from 'react';
import Comment from '../../Contexts/Comment';

function Line({ municipality }) {

    const { setComment } = useContext(Comment);

    const remove = id => {
        setComment({id});
    }

    return (
        <li className="list-group-item">
            <div className="home">
                <div className="home__content">
                    <div className="home__content__info">
                    <h1>{municipality[0]} <small>({municipality[1].length})</small></h1>
                        {municipality[1][0].image ? <div className='img-bin'>
                            <img src={municipality[1][0].image} alt={municipality[0]}>
                            </img>
                        </div> : null}
                    </div>
                    <div className="home__content__info">
                        Service: {municipality[1][0].service}
                    </div>
                </div>
            </div>
            <div className="comments">
                <ul className="list-group">
                    {
                         municipality[1]?.map(c => c.cid !== null ? <li key={c.cid} className="list-group-item">
                            <p>{c.post}</p>
                            <div className="home__buttons">
                                <button onClick={() => remove(c.cid)} type="button" className="btn btn-outline-danger">Delete</button>
                            </div>
                        </li> : null)
                    }
                </ul>
            </div>
        </li>
    )
}

export default Line;
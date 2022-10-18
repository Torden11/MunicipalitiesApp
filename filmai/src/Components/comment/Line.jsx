import { useContext } from 'react';
import Comment from '../../Contexts/Comment';

function Line({ movie }) {

    const { setComment } = useContext(Comment);

    const remove = id => {
        setComment({id});
    }

    return (
        <li className="list-group-item">
            <div className="home">
                <div className="home__content">
                    <div className="home__content__info">
                    <h1>{movie[0]} <small>({movie[1].length})</small></h1>
                        {movie[1][0].image ? <div className='img-bin'>
                            <img src={movie[1][0].image} alt={movie[0]}>
                            </img>
                        </div> : null}
                    </div>
                    <div className="home__content__price">
                        {movie[1][0].price} Eur
                    </div>
                </div>
            </div>
            <div className="comments">
                <ul className="list-group">
                    {
                         movie[1]?.map(c => c.cid !== null ? <li key={c.cid} className="list-group-item">
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
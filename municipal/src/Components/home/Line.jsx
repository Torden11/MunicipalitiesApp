import { useContext } from 'react';
import Home from '../../Contexts/Home';

import { useState } from "react";

function Line({ municipality }) {

    const { setComment } = useContext(Home);

    
    const [post, setPost] = useState('');

    
    const add = () => {
        setComment({
            post,
            municipality_id: municipality[1][0].id
        });
        setPost('');
    };

    return (
        <li className="list-group-item">
            <div className="home">
                <div className="home__content">
                    <div className="home__content__info">
                    <h1>{municipality[0]}</h1>
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
                        municipality[1]?.map(c => c.cid !== null ? <li key={c.cid} className="list-group-item"><p>{c.post}</p></li> : null)
                    }
                </ul>

                <div className="mb-3">
                    <label className="form-label">Add comment</label>
                    <textarea className="form-control" value={post} onChange={e => setPost(e.target.value)}></textarea>
                </div>
                <button onClick={add} type="button" className="btn btn-outline-success">Add</button>
            </div>
        </li>
    )
}

export default Line;
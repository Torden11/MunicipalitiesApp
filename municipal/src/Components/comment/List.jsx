import { useState, useEffect, useContext } from 'react';
import Comment from "../../Contexts/Comment";
import Line from './Line';


function List() {

    const { movies } = useContext(Comment);
    const [stats, setStats] = useState({ movieCount: null });


    useEffect(() => {
        if (null === movies) {
            return;
        }
        setStats(s => ({ ...s, movieCount: movies.length }));
    }, [movies]);

    return (
        <div className="card m-4">
            <h5 className="card-header">Movies List ({stats.movieCount})</h5>
            <div className="card-body">
                <ul className="list-group">
                    {
                        movies?.map(m => <Line key={m[1][0].id} movie={m} />)
                    }
                </ul>
            </div>
        </div>
    );
}

export default List;
import { useContext } from 'react';
import Movies from "../../Contexts/Movies";
import Line from './Line';

function List() {

    const { movies } = useContext(Movies);

    return (
        <div className="card m-4">
            <h5 className="card-header">Movies List</h5>
            <div className="card-body">
                <ul className="list-group">
                    {
                        movies?.map(m => <Line key={m.id} movie={m} />)
                    }
                </ul>
            </div>
        </div>
    );
}

export default List;
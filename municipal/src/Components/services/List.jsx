import { useContext } from 'react';
import Services from "../../Contexts/Services";
import Line from './Line';

function List() {

    const { services } = useContext(Services);

    return (
        <div className="card m-4">
            <h5 className="card-header">Services List</h5>
            <div className="card-body">
                <ul className="list-group">
                    {
                        services?.map(s => <Line key={s.id} service={s} />)
                    }
                </ul>
            </div>
        </div>
    );
}

export default List;
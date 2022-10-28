import { useState, useEffect, useContext } from 'react';
import Comment from "../../Contexts/Comment";
import Line from './Line';


function List() {

    const { municipalities } = useContext(Comment);
    const [stats, setStats] = useState({ municipalityCount: null });


    useEffect(() => {
        if (null === municipalities) {
            return;
        }
        setStats(s => ({ ...s, municipalityCount: municipalities.length }));
    }, [municipalities]);

    return (
        <div className="card m-4">
            <h5 className="card-header">Municipalities List ({stats.municipalityCount})</h5>
            <div className="card-body">
                <ul className="list-group">
                    {
                        municipalities?.map(m => <Line key={m[1][0].id} municipality={m} />)
                    }
                </ul>
            </div>
        </div>
    );
}

export default List;
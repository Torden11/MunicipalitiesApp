import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import Home from "../../Contexts/Home";
import Line from './Line';

const sortData = [
    { v: 'default', t: 'Default' },
    { v: 'price_asc', t: 'Price 1-9' },
    { v: 'price_desc', t: 'Price 9-1' },
    { v: 'rate_asc', t: 'Rating 1-9' },
    { v: 'rate_desc', t: 'Rating 9-1' }
];

function List() {

    const { municipalities, setMunicipalities } = useContext(Home);

    const [sortBy, setSortBy] = useState('default');
    const [stats, setStats] = useState({municipalityCount: null});

    

    useEffect(() => {
        if (null === municipalities) {
            return;
        }
        setStats(s => ({...s, municipalityCount: municipalities.length}));
    }, [municipalities]);

    useEffect(() => {
        switch (sortBy) {
            case 'price_asc':
                setMunicipalities(m => [...m].sort((a, b) => a[1][0].price - b[1][0].price));
                break;
            case 'price_desc':
                setMunicipalities(m => [...m].sort((b, a) => a[1][0].price - b[1][0].price));
                break;
            case 'rate_asc':
                setMunicipalities(m => [...m].sort((x, c) => x[1][0].rating - c[1][0].rating));
                break;
            case 'rate_desc':
                setMunicipalities(m => [...m].sort((jo, no) => no[1][0].rating - jo[1][0].rating));
                break;
            default:
                setMunicipalities(m => [...m ?? []].sort((a, b) => a.row - b.row));
        }

    }, [sortBy, setMunicipalities]);

    return (
        <>
            <div className="card m-4">
                <h5 className="card-header">Sort</h5>
                <div className="card-body">
                    <div className="mb-3">
                        <label className="form-label">Sort By</label>
                        <select className="form-select" value={sortBy} onChange={e => setSortBy(e.target.value)}>
                            {
                                sortData.map(c => <option key={c.v} value={c.v}>{c.t}</option>)
                            }
                        </select>
                    </div>
                </div>
            </div>
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
        </>
    );
}

export default List;
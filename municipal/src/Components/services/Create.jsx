import { useState, useContext } from 'react';
import DataContext from '../../Contexts/DataContext';
import Services from '../../Contexts/Services';


function Create() {

    const [title, setTitle] = useState('');
    

    const { setCreateData } = useContext(Services);
    const {makeMsg} = useContext(DataContext);

    
    const add = () => {

        if (title.length === 0 || title.length > 50) {
            makeMsg('Invalid title', 'error');
            return;
        }
        setCreateData({
            title,
        });
        setTitle('');
    }

    return (
        <div className="mx-auto card m-4 col-lg-4 col-md-12">
            <h5 className="card-header">New Service</h5>
            <div className="card-body">
                <div className="mb-3">
                    <label className="form-label">Service title</label>
                    <input type="text" className="form-control" value={title} onChange={e => setTitle(e.target.value)} />
                </div>
                <button onClick={add} type="button" className="btn btn-outline-success">Add</button>
            </div>
        </div>
    );
}

export default Create;
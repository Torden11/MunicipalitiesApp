import { useState, useContext, useRef } from 'react';
import DataContext from '../../Contexts/DataContext';
import Municipalities from '../../Contexts/Municipalities';
import getBase64 from '../../Functions/getBase64';

function Create() {

    const [title, setTitle] = useState('');
    const [service, setService] = useState('');
    const fileInput = useRef();

    const { setCreateData } = useContext(Municipalities);
    const {makeMsg} = useContext(DataContext);

    const [photoPrint, setPhotoPrint] = useState(null);

    const doPhoto = () => {
        getBase64(fileInput.current.files[0])
            .then(photo => setPhotoPrint(photo))
            .catch(_ => {
                // tylim
            })
    }

    const add = () => {

        if (title.length === 0 || title.length > 50) {
            makeMsg('Invalid title', 'error');
            return;
        }
        if (service.length === 0 || service.length > 50) {
            makeMsg('Invalid title', 'error');
            return;
        }
        setCreateData({
            title,
            service,
            image: photoPrint
        });
        setTitle('');
        setService('');
        setPhotoPrint(null);
        fileInput.current.value = null;
    }

    return (
        <div className="mx-auto card m-4 col-lg-4 col-md-12">
            <h5 className="card-header">New Municipality</h5>
            <div className="card-body">
                <div className="mb-3">
                    <label className="form-label">Municipality title</label>
                    <input type="text" className="form-control" value={title} onChange={e => setTitle(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Municipality service</label>
                    <input type="text" className="form-control" value={service} onChange={e => setService(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Municipality Shield Image</label>
                    <input ref={fileInput} type="file" className="form-control" onChange={doPhoto} />
                </div>
                {photoPrint ? <div className='img-bin'><img src={photoPrint} alt="upload"></img></div> : null}
                <button onClick={add} type="button" className="btn btn-outline-success">Add</button>
            </div>
        </div>
    );
}

export default Create;
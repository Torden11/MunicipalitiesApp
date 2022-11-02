import { useContext, useEffect, useState } from 'react';
import Services from '../../Contexts/Services';


function Edit() {

    const [title, setTitle] = useState('');
    

    

    const { setEditData, modalData, setModalData } = useContext(Services);

    const edit = () => {
        setEditData({
            title,
            id: modalData.id,
        });
        setModalData(null);
        }

    useEffect(() => {
        if (null === modalData) {
            return;
        }
        setTitle(modalData.title);
    }, [modalData])

    if (null === modalData) {
        return null;
    }

    return (

        <div className="modal">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Edit Service</h5>
                        <button onClick={() => setModalData(null)} type="button" className="btn-close"></button>
                    </div>
                    <div className="modal-body"></div>
                    <div className="card m-4">
                        <div className="card-body">
                            <div className="mb-3">
                                <label className="form-label">Service Title</label>
                                <input type="text" className="form-control" value={title} onChange={e => setTitle(e.target.value)} />
                            </div>
                            <button onClick={edit} type="button" className="btn btn-outline-success">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Edit;
import { useState, useEffect } from 'react';
import Services from '../../Contexts/Services';
import DataContext from '../../Contexts/DataContext';
import { useContext } from 'react';
import Create from './Create';
import List from './List';
import axios from 'axios';
import Edit from './Edit';
import { authConfig } from '../../Functions/auth';

function Main() {
    const [services, setServices] = useState(null);
    const [createData, setCreateData] = useState(null);
    const [deleteData, setDeleteData] = useState(null);
    const [modalData, setModalData] = useState(null);
    const [editData, setEditData] = useState(null);
    const [lastUpdate, setLastUpdate] = useState(Date.now());
    
    const { makeMsg } = useContext(DataContext);


    //CREATE
    useEffect(() => {
        if (null === createData) {
            return;
        }
        axios.post('http://localhost:3003/server/services', createData, authConfig())
            .then(res => {
                setLastUpdate(Date.now());
                makeMsg(res.data.text, res.data.type);
            });
    }, [createData, makeMsg]);

    // READ for list
    useEffect(() => {
        axios.get('http://localhost:3003/server/services', authConfig())
            .then(res => {
                setServices(res.data);
            })
    }, [lastUpdate]);
    
//UPDATE
        useEffect(() => {
        if (null === editData) {
            return;
        }
        axios.put('http://localhost:3003/server/services/' + editData.id, editData, authConfig())
            .then(res => {
                setLastUpdate(Date.now());
                makeMsg(res.data.text, res.data.type);
            });
    }, [editData, makeMsg]);

    //DELETE
    useEffect(() => {
        if (null === deleteData) {
            return;
        }
        axios.delete('http://localhost:3003/server/services/' + deleteData.id, authConfig())
            .then(res => {
                setLastUpdate(Date.now());
                makeMsg(res.data.text, res.data.type);
            });
    }, [deleteData, makeMsg]);




    return (
        <Services.Provider value={{
            setCreateData,
            services,
            setDeleteData,
            modalData,
            setModalData,
            setEditData,
            editData
        }}>
            <div className="container">
                <div className="row">
                    <div className="col-4 col-md-12">
                        <Create />
                    </div>
                    <div className="col-8 col-md-12">
                        <List />
                    </div>
                </div>
            </div>
            <Edit />
        </Services.Provider>
    )
}

export default Main;
import Home from "../../Contexts/Home";
import Create from "./Create";
import List from "./List";
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { authConfig } from '../../Functions/auth';
import { useContext } from "react";
import DataContext from "../../Contexts/DataContext";

const Main = () => {

        const [lastUpdate, setLastUpdate] = useState(Date.now());
        const [municipalities, setMunicipalities] = useState(null);
        const [services, setServices] = useState(null);
        const [comments, setComments] = useState(null);
        const [createData, setCreateData] = useState(null);
        const { makeMsg } = useContext(DataContext);

        const filterOn = useRef(false);
        const filterWhat = useRef(null);
       

                // READ for list
        useEffect(() => {
            axios.get('http://localhost:3003/home/municipalities', authConfig())
                .then(res => {
                    setMunicipalities(res.data)
                });
            }, [])

        useEffect(() => {
            axios.get('http://localhost:3003/home/services', authConfig())
                .then(res => {
                    setServices(res.data)
                }, [])

                axios.get('http://localhost:3003/home/comments', authConfig())
                .then(res => {
                    setComments(res.data.map((d, i) => ({ ...d, show: true, row: i })));
                })
        }, [lastUpdate]);

        //CREATE COMMENT

        useEffect(() => {
            if (createData === null) {
                return;
            }
            axios.post('http://localhost:3003/home/comments', createData, authConfig())
            .then(res => {
                setLastUpdate(Date.now());
                makeMsg(res.data.text, res.data.type);
            })
         }, [createData, makeMsg]);
         


        
      return (
        <Home.Provider value={{
            comments,
            municipalities,
            services, 
            setComments,
            setCreateData,
            createData, 
            filterOn,
            filterWhat
        }}>
        <div className="container">
        <div className="row">
                <div className="col-12">
                    <Create/>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <List/>
                </div>
            </div>
        </div>
        </Home.Provider>
    );
}


export default Main;
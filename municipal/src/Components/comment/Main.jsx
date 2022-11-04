import Comment from "../../Contexts/Comment";
import List from "./List";
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { authConfig } from '../../Functions/auth';
import DataContext from "../../Contexts/DataContext";

function Main() {

    const [lastUpdate, setLastUpdate] = useState(Date.now());
    const [comments, setComments] = useState(null);
    const [comment, setComment] = useState(null);
    const [deleteData, setDeleteData] = useState(null);
    const { makeMsg } = useContext(DataContext);

    

    // READ for list
    useEffect(() => {
        axios.get('http://localhost:3003/server/comments', authConfig())
            .then(res => {
                setComments(res.data.map((d, i) => ({ ...d, show: true, row: i })));
            })
    }, [lastUpdate]);

    // UPDATE comment
    useEffect(() => {
        if (comment === null) {
          return;
        }
        axios.put("http://localhost:3003/server/comments/" + comment.id, comment, authConfig())
          .then((res) => {
            setLastUpdate(Date.now());
            makeMsg(res.data.text, res.data.type);
          });
      }, [comment, makeMsg]);


// DELETE comment
    useEffect(() => {
        if (deleteData === null) {
            return;
        }
        axios.delete('http://localhost:3003/server/comments/' + deleteData.id, authConfig())
            .then(res => {
                setLastUpdate(Date.now());
                makeMsg(res.data.text, res.data.type);
            })
    }, [deleteData, makeMsg]);

    return (
        <Comment.Provider value={{
            setComment,
            comments,
            setComments,
            setDeleteData
        }}>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <List />
                    </div>
                </div>
            </div>
        </Comment.Provider>
    );
}

export default Main;
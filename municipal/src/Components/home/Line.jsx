import { useContext } from 'react';
import Home from '../../Contexts/Home';


const Line = ({ comment }) => {
    const { filterWhat, filterOn, setComments } = useContext(Home);
  
    const filterByMunicipality = () => {
      filterOn.current = !filterOn.current;
      if (!filterOn.current) {
        setComments((prevCom) => prevCom.map((c) => ({ ...c, show: true })));
        filterWhat.current = null;
      } else {
        setComments((prevCom) => [
          ...prevCom.map((c) =>
            c.municipalityTitle === comment.municipalityTitle
              ? { ...c, show: true }
              : { ...c, show: false }
          ),
        ]);
        filterWhat.current = comment.municipalityTitle;
      }
    };
  
    const filterByService = () => {
      if (!filterOn.current) {
        setComments((prevCom) => prevCom.map((c) => ({ ...c, show: true })));
        filterWhat.current = null;
      } else {
        setComments((prevCom) =>
          prevCom.map((c) =>
            c.serviceTitle === comment.serviceTitle
              ? { ...c, show: true }
              : { ...c, show: false }
          )
        );
        filterWhat.current = comment.serviceTitle;
      }
      filterOn.current = !filterOn.current;
    };
  
    return (
      <li className="list-group-item">
        <div className="line">
          <div className="line__content">
            <div className="line__content__info">
              <div
                className="line__content__info"
                onClick={filterByMunicipality}
              >
                <div className="img-bin">
                <img
                  className="line__content_info"
                  src={comment.municipalityImage}
                  alt={comment.municipalityTitle}
                ></img>
                </div>
                <div className="line__content__title">
                  {comment.municipalityTitle}
                </div>
              </div>
              <div
                className="line__content__info click-link"
                onClick={filterByService}
              >
                {comment.serviceTitle}
              </div>
            </div>
            <div className="line__content__info">{comment.post}</div>
          </div>
        </div>
      </li>
    );
  };
  

// function Line({ municipality }) {

//     const { setComment, municipalities } = useContext(Home);

    
//     const [post, setPost] = useState('');

    
//     const add = () => {
//         setComment({
//             post,
//             mun_id: municipality.id
//         });
//         setPost('');
//     };
//     console.log(municipality)
//     console.log(municipalities)
    

//     return (
//         <li className="list-group-item">
//             <div className="home">
//                 <div className="home__content">
//                     <div className="home__content__info">
//                         <h1>{municipality.title}</h1>
//                         {municipality.image ? <div className='img-bin'>
//                             <img src={municipality.image} alt={municipality}>
//                             </img>
//                         </div> : null}
//                     </div>
//                     <div className="home__content__info">
//                     Service: {municipality.service}
//                     </div>
//                 </div>
//             </div>
//             <div className="comments">

//                 <ul className="list-group">
//                     {
//                         municipalities.map(c => c.cid !== null ? <li key={c.cid} className="list-group-item"><p>{c.post}</p></li> : null)
//                     }
//                 </ul>

//                 <div className="mb-3">
//                     <label className="form-label">Add comment</label>
//                     <textarea className="form-control" value={post} onChange={e => setPost(e.target.value)}></textarea>
//                 </div>
//                 <button onClick={add} type="button" className="btn btn-outline-success">Add</button>
//             </div>
//         </li>
//     )
// }

export default Line;
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
  


export default Line;
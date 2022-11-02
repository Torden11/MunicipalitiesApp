import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import Home from "../../Contexts/Home";
import Line from './Line';


const List = () => {

    const [municipalityId, setMunicipalityId] = useState(0);
    const [serviceId, setServiceId] = useState(0);

  const {
    comments,
    setComments,
    municipalities,
    services,
    filterOn,
    filterWhat,
  } = useContext(Home);

  

  useEffect(() => {
    setComments((prevCom) =>
      prevCom?.map((c) =>
        (Number(c.srid) === Number(serviceId) || Number(serviceId) === 0) &&
        (Number(c.mid) === Number(municipalityId) || Number(municipalityId) === 0)
          ? { ...c, show: true }
          : { ...c, show: false }
      )
    );
  }, [serviceId, municipalityId, setComments]);

  // const filtruoti = () => {
  //   setComment((prevCom) =>
  //     prevCom?.map((k) =>
  //       (Number(k.srid) === Number(serviceId) || serviceId === 0) &&
  //       (Number(k.sid) === Number(municipalityId) || municipalityId === 0)
  //         ? { ...k, show: true }
  //         : { ...k, show: false }
  //     )
  //   );
  // };

  const resetFilter = () => {
    setComments((prevCom) => prevCom.map((c) => ({ ...c, show: true })));
    filterOn.current = false;
    filterWhat.current = null;
  };

  return (
    <>
      <div className="card m-4">
        <h5 className="card-header">Filter</h5>
        <div className="card-body">
          <div className="mb-3">
            <label className="form-label">By municipality</label>
            <select
              className="form-select"
              value={municipalityId}
              onChange={(e) => setMunicipalityId(e.target.value)}
            >
              <option value={0}>All municipalities</option>
              {municipalities?.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.title}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">By a type of service</label>
            <select
              className="form-select"
              value={serviceId}
              onChange={(e) => setServiceId(e.target.value)}
            >
              <option value={0}>All services</option>
              {services?.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="card m-4">
        <h5 className="card-header">Comments:</h5>

        <small onClick={resetFilter} className="click-link reset-filter">
          Show all comments
        </small>
        <div className="card-body">
          <ul className="list-group">
            {comments?.map((c) =>
              c.show ? <Line key={c.id} comment={c} /> : null
            )}
          </ul>
        </div>
      </div>
    </>
  );
};



//     const { municipalities, setMunicipalities } = useContext(Home);
// console.log(municipalities)
//     const [municipality, setMunicipality] = useState("0");
//     const [comments, setComments] = useState(null);
//     const [sortBy, setSortBy] = useState('default');
//     const [stats, setStats] = useState({municipalityCount: null});
    
//         useEffect(() => {
//         if (null === municipalities) {
//             return;
//         }
//         // setStats(s => ({...s, municipalityCount: municipalities.length}));
//     }, [municipalities]);


// //FILTRAS pagal municipality_id

//     useEffect(() => {
//         if ("0" === municipality) {
//      setMunicipalities((m) => m?.map((municipality) => ({ ...municipality, show: true })));
//         } else {
//           setMunicipalities((c) =>
//             c.map((m) =>
//               parseInt(municipality) === m.id
//                 ? { ...m, show: true }
//                 : { ...m, show: false }
//             )
//           );
//         }
//       }, [municipality]);

// //Filtras pagal service pavadinima
  
// //   useEffect(() => {
// //     switch (sortBy) {
// //       case "default":
// //         setComments((bi) => [...(bi ?? [])].sort((a, b) => a.row - b.row));
// //         break;
// //       case "service_asc":
// //         setComments((bi) =>
// //           [...(bi ?? [])].sort((a, b) => a.service.localeCompare(b.service))
// //         );
// //         break;
// //       case "service_desc":
// //         setComments((bi) =>
// //           [...(bi ?? [])].sort((a, b) => b.service.localeCompare(a.service))
// //         );
// //         break;
// //       default:
// //     }
// //   }, [sortBy, setComments]);

//     // useEffect(() => {
//     //     switch (sortBy) {
//     //         case 'price_asc':
//     //             setMunicipalities(m => [...m].sort((a, b) => a[1][0].price - b[1][0].price));
//     //             break;
//     //         case 'price_desc':
//     //             setMunicipalities(m => [...m].sort((b, a) => a[1][0].price - b[1][0].price));
//     //             break;
//     //         case 'rate_asc':
//     //             setMunicipalities(m => [...m].sort((x, c) => x[1][0].rating - c[1][0].rating));
//     //             break;
//     //         case 'rate_desc':
//     //             setMunicipalities(m => [...m].sort((jo, no) => no[1][0].rating - jo[1][0].rating));
//     //             break;
//     //         default:
//     //             setMunicipalities(m => [...m ?? []].sort((a, b) => a.row - b.row));
//     //     }

//     // }, [sortBy, setMunicipalities]);

//     return (
//         <>
//             <div className="card m-4">
//                 <h5 className="card-header">Sort</h5>
//                 <div className="card-body">
//                     <div className="mb-3">
//                         <label className="form-label">Municipality Filter</label>
//                         <select className="form-select" value={municipality} onChange={e => setMunicipality(e.target.value)}>
//                         <option value={0}>Show All</option>
                        
//                             {
//                                 municipalities?.map(m => <option key={m.cid} value={m.id}>{m.title}</option>)
//                             }
                            
//                         </select>
//                     </div>
//                     <div className="mb-3">
//                     <label className="form-label">Total Sort</label>
//                     <select className="form-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
//                     <option value={"default"}>Default</option>
//                     <option value={"service_asc"}>Service A - Z</option>
//                     <option value={"service_desc"}>Service Z - A</option>
//                     </select>
//                     </div>
//                 </div>
//             </div>
//             <div className="card m-4">
//                 <h5 className="card-header">Municipalities List ({stats.municipalityCount})</h5>
//                 <div className="card-body">
//                     <ul className="list-group">
//                         {
//                             municipalities?.map(m => <Line key={m.cid} municipality={m} />)
//                         }
//                     </ul>
//                 </div>
//             </div>
//         </>
//     );
// }

export default List;
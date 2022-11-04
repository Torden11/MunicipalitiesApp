import {useNavigate} from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { login } from "../../Functions/auth";
import DataContext from "../../Contexts/DataContext";


function LoginPage({ setRoleChange }) {
   const navigate = useNavigate();
 
   const { makeMsg } = useContext(DataContext);
   const [user, setUser] = useState("");
   const [pass, setPass] = useState("");
 
   const doLogin = () => {
     axios.post("http://localhost:3003/login", { user, pass }).then((res) => {
       setRoleChange(Date.now());
       if ("ok" === res.data.msg) {
         login(res.data.key);
         navigate("/", { replace: true });
         makeMsg(res.data.text, res.data.type);
       }
     })
     .catch(() => {
       makeMsg('You are not registered', 'error');
     })
   };
   return (
     <div className="container-login">
       <h3 className="login-header">Login:</h3>
       <div className="login-content">
         name:{" "}
         <input
           type="text"
           value={user}
           onChange={(e) => setUser(e.target.value)}
         ></input>
       </div>
       <div className="login-content">
         password:{" "}
         <input
           type="password"
           value={pass}
           onChange={(e) => setPass(e.target.value)}
         ></input>
       </div>
       <button onClick={doLogin}>Login</button>
     </div>
   );
 }

 export default LoginPage;
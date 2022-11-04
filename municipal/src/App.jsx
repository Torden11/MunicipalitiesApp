import "./App.scss";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  } from "react-router-dom";
import Nav from "./Components/Nav";
import Home from "./Components/home/Main";
import MainComments from "./Components/comment/Main";
import Main from "./Components/municipalities/Main";
import MainS from "./Components/services/Main";
import RegisterPage from "./Components/register/Main";
import LoginPage from "./Components/login/LoginPage";
import LogoutPage from "./Components/login/LogoutPage";
import { authConfig } from "./Functions/auth";
import { useState, useEffect, useCallback} from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import DataContext from "./Contexts/DataContext";
import Messages from "./Components/Messages";

function App() {
  const [roleChange, setRoleChange] = useState(Date.now());
  const [msgs, setMsgs] = useState([]);

  const makeMsg = useCallback((text, type = "") => {
    let msgTypeClass;
    switch (type) {
      case "success":
        msgTypeClass = "ok";
        break;
      case "error":
        msgTypeClass = "error";
        break;
      case "info":
        msgTypeClass = "info";
        break;
      default:
        msgTypeClass = "default";
    }

    const msg = {
      id: uuidv4(),
      text,
      class: msgTypeClass
    };
    setMsgs((m) => [...m, msg]);
    setTimeout(() => {
      setMsgs((m) => m.filter((mes) => mes.id !== msg.id));
    }, 6000);
  }, []);

  return (
    <DataContext.Provider
      value={{
        msgs,
        setMsgs,
        makeMsg,
      }}
    >
      <BrowserRouter>
        <ShowNav roleChange={roleChange} />
        <Messages />
        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth role="user">
                <Home />
              </RequireAuth>
            }
          ></Route>
          <Route
            path="/login"
            element={<LoginPage setRoleChange={setRoleChange} />}
          />
          <Route
            path="/logout"
            element={<LogoutPage setRoleChange={setRoleChange} />}
          />
          <Route
            path="/municipalities"
            element={
              <RequireAuth role="admin">
                <Main />
              </RequireAuth>
            }
          ></Route>
          <Route
            path="/services"
            element={
              <RequireAuth role="admin">
                <MainS />
              </RequireAuth>
            }
          ></Route>
          <Route
            path="/comments"
            element={
              <RequireAuth role="admin">
                <MainComments />
              </RequireAuth>
            }
          ></Route>
          <Route
            path="/register"
            element={<RegisterPage setRoleChange={setRoleChange} />}
          />
        </Routes>
      </BrowserRouter>
    </DataContext.Provider>
  );
}

function ShowNav({ roleChange }) {
  const [status, setStatus] = useState(1);
  useEffect(() => {
    axios
      .get("http://localhost:3003/login-check?role=admin", authConfig())
      .then((res) => {
        setStatus(res.data.status);
      });
  }, [roleChange]);
  return <Nav status={status} />;
}

function RequireAuth({ children, role }) {
  const [view, setView] = useState(<h2>Please wait...</h2>);

  useEffect(() => {
    axios
      .get("http://localhost:3003/login-check?role=" + role, authConfig())
      .then((res) => {
        if ("ok" === res.data.msg) {
          setView(children);
        } else if (res.data.status === 2) {
          setView(<h2>Unauthorize...</h2>);
        } else {
          setView(<Navigate to="/login" replace />);
        }
      });
  }, [children, role]);

  return view;
}


export default App;

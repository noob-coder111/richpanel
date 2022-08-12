import { Routes, Route } from "react-router-dom";
import Register from "./pages/register";
//import Home from "./pages/signuppage/home";
import "./App.css";
import Integrate from "./pages/integrate";
import Disconnect from "./pages/disconnect";
import { useEffect, useState } from "react";
import Agent from "./pages/agentscreen";

function App() {
  const [userData, setUserData] = useState();
  const [senderData, setSenderData] = useState();

  const url = "http://localhost:3000/senders";

  useEffect(() => {
    fetch(url, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setSenderData(data);
      });
  }, []);

  const callBack = (name, email, photoURL) => {
    setUserData({ name: name, email: email, photoURL: photoURL });
  };
  

  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/disconnect" element={<Disconnect userData={userData} />} />
      <Route path="/fbintegrate" element={<Integrate callBack={callBack} />} />
      <Route
        exact
        path="/agentscreen"
        element={<Agent userData={userData} senderData={senderData} />}
      />
    </Routes>
  );
}

export default App;

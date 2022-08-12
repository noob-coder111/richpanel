import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Sender = ({ senderData, callBack }) => {
  const [active, setActive] = useState("false");
  const navigate = useNavigate();
  const url = "http://localhost:3000/senders";
  const handleShow = () => {
    navigate(`/senders/${senderData.id}`);
  };
  return (
    <div
      style={{ borderBottom: "1px solid gray", padding: "0 1rem" }}
      onClick={() => {
        callBack(senderData.name, senderData.message);
        console.log(senderData);
      }}
    >
      <h3>{senderData.name}</h3>
      <p>{senderData.message}</p>
    </div>
  );
};

export default Sender;

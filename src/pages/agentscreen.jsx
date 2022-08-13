import React, { useEffect, useState, useRef } from "react";
import Sender from "./sender";
import {
  MdRefresh,
  MdMenu,
  MdInbox,
  MdSupervisorAccount,
} from "react-icons/md";
import pic from "./richpanel.jpg";
import styles from "./agentscreen.module.css";
import { stringify } from "@firebase/util";

const Agent = ({ userData, senderData }) => {
  let senderContent;
  const [user, setUser] = useState();
  const [sender, setSender] = useState();
  const [selecteduser, setSelecteduser] = useState();
  const [mymsg, setMymsg] = useState([]);
  const inputElement = useRef();

  const callBack = (name, msg) => {
    setSelecteduser({ name: name, msg: msg });
  };

  const url = "http://localhost:3000/senders";
  if (senderData.length > 0) {
    senderContent = senderData.map((senderData) => (
      <Sender key={senderData.id} callBack={callBack} senderData={senderData} />
    ));
  }
  console.log(senderData);
  useEffect(() => {
    const fetchdata = async () => {
      await fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setSender(data);
        });
    };
    fetchdata();
  }, []);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      setMymsg([...mymsg, event.target.value]);
      console.log(inputElement);
      inputElement.current.value = "";
    }
  };

  return (
    <div className={styles.box}>
      <div className={styles.col1}>
        <div className={styles.pic}>
          <img src={pic} />
        </div>
        <div className={styles.message}>
          <MdInbox className={styles.messages} />
        </div>
        <div className={styles.sender}>
          <MdSupervisorAccount className={styles.senders} />
        </div>
        <div>
          <img className={styles.dp} src={userData["photoURL"]} />
        </div>
      </div>
      <div className={styles.col2}>
        <div className={styles.heading}>
          <div className={styles.menu}>
            <MdMenu />
          </div>
          Conversations
          <div className={styles.refresh}>
            <MdRefresh />
          </div>
        </div>

        <div className={styles.sendercontent}>{senderContent}</div>
      </div>

      <div className={styles.heading3}>{selecteduser && selecteduser.name}</div>
      <div className={styles.col3}>
        <div clasName={styles.msgscreen}></div>
        {selecteduser && selecteduser.msg ? (
          <div className={styles.msgcontent}>
            {selecteduser && selecteduser.msg}
          </div>
        ) : (
          ""
        )}
        {mymsg
          ? mymsg.map((msg, i) => {
              return (
                <div key={i} className={styles.msgcontent2}>
                  {msg}
                </div>
              );
            })
          : ""}
      </div>
      <input
        className={styles.input}
        placeholder={"Message"}
        // value={reset}
        ref={inputElement}
        onKeyPress={(e) => handleKeyPress(e)}
      ></input>
      <div className={styles.col4}>
        <div className={styles.heading2}>
          {selecteduser && <div className={styles.profilepic}></div>}
          <br></br>
          <h3>{selecteduser && selecteduser.name}</h3>
        </div>
        <div className={styles.profile}>
          <div>
            <h3>Customer Details</h3>
            <div className={styles.senderdetails}>
              First Name: {selecteduser && selecteduser.name}
              <br></br>
              Last Name: kr
              <br></br>
              Email :{selecteduser && selecteduser.name}@gmail.com
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Agent;

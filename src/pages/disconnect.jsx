import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./disconnect.module.css";
import { auth } from "./firebase-config";
import { signOut } from "firebase/auth";

const Disconnect = ({ userData }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  {
    /* <script>
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '{your-app-id}',
      cookie     : true,
      xfbml      : true,
      version    : '{api-version}'
    });
      
    FB.AppEvents.logPageView();   
      
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
</script> */
  }
  return (
    <div className={styles.disconnectbox}>
      <div className={styles.disconnectcontent}>
        <div className={styles.title}>Facebook Page Integration</div>
        <div className={styles.title}>Integrated Page:{userData["name"]}</div>
        <button className={styles.delete} onClick={handleLogout}>
          Delete Integration
        </button>
        <button
          className={styles.reply}
          onClick={() => {
            navigate("/agentscreen");
          }}
        >
          Reply to Messages
        </button>
      </div>
    </div>
  );
};

export default Disconnect;

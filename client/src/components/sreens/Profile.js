import React, {useContext, useEffect, useState} from "react";
import { UserContext } from "../../App";

const Profile = () => {
  const [mypics, setPics] = useState([])
  const {state, dispatch} = useContext(UserContext)
  useEffect(() => {
    fetch("/mypost", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt")
      }
    }).then(res => res.json())
    .then(result => {
      setPics(result.mypost)
      console.log(result)
    })
  })
  return (
    <div className="profile">
      <div style={{
        display: "flex",
        justifyContent: "center",
        marginRight: "20px, 20px",
        margin: "18px 0px",
        borderBottom: "1px solid grey",
        flexDirection: "inherit",
        paddingBottom: "10px"
      }}>
        <div>
          <img style={{ width: "160px", height: "160px", borderRadius: "80px" }}
            src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTIwfHxwZXJzb258ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
          />
        </div>
        <div style={{marginLeft: "30px"}}>
          <h4 style={{fontWeight:"bold"}}>{state?state.name:"loading"}</h4>
          <div style={{ display: "flex", justifyContent: "space-between", width: "100%", marginRight:"30px" }}>
            <p>40 posts</p>
            <p>40 Seguidores</p>
            <p>40 Seguindo</p>
          </div>

        </div>
      </div>

      <div className="gallery">
        {
          mypics.map(item=>{
            return(
              <img className="item" src={item.photo} alt={item.title}/>
            )
          })
        }
      </div>

    </div>
  );
}
export default Profile;
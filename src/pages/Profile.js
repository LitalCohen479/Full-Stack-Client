import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from '../helpers/AuthContext'

const Profile = () => {

    let { id } = useParams();
    let navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [listOfPosts, setListOfPosts] = useState([]);
    const {authState} =useContext(AuthContext);

useEffect(()=>{
    axios.get(`/api/auth/basicinfo/${id}`).then((response) => {
      setUsername(response.data.username);
console.log(response.data.username)

axios.get(`/api/posts/byUserId/${id}`).then((response) => {
    setListOfPosts(response.data);
  });
})
},[])

  return ( 
    <div className="profilePageContainer">
    <div className="basicInfo">
      <h1> Username: {username} </h1>
      {authState.username===username && (
     <button className="changePassword_btn" onClick={()=>{
      navigate('/changePassword')
     }}>Change My Password</button>
      )}
 
    </div>
    <div className="listOfPosts">
      {listOfPosts.map((value, key) => {
        return (
          <div key={key} className="post">
            <div className="title"> {value.title} </div>
            <div
              className="body"
              onClick={() => {
                navigate(`/post/${value.id}`);
              }}
            >
              {value.postText}
            </div> 
             <div className="footer">
              <div className="username">{value.username}</div>
              <div className="buttons">
                <label> {value.Likes.length}</label>
              </div>
            </div>
          </div>
        );
      })} 
    
    </div> 
  </div>
);
}

export default Profile
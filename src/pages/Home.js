import React, {useEffect, useState, useContext} from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { AuthContext } from '../helpers/AuthContext'
const Home = () => {

    const [listOfPosts, setListOfPosts] =useState([]);
    const [likedPosts, setLikedPosts] = useState([]);
    const {authState} =useContext(AuthContext);

let navigate = useNavigate();

useEffect(()=>{
  if(!localStorage.getItem("accessToken")){
    navigate('/login');
  }else{

 
axios.get('https://litalcohenfullstack.herokuapp.com/posts', {
  headers: { accessToken: localStorage.getItem("accessToken") },
}).then((response)=>{
setListOfPosts(response.data.listOfPosts);
setLikedPosts(
  response.data.likedPosts.map((like) => {
    return like.PostId;
  })
);
});
}
},[]);

const likeAPost = (postId)=>{
axios.post('https://litalcohenfullstack.herokuapp.com/likes', 
{PostId:postId},
 {headers:{accessToken: localStorage.getItem('accessToken')}}
 )
 .then(()=>{
// alert(response.data);
setListOfPosts(
  listOfPosts.map((post)=>{
  if(post.Id===postId){
    window.location.reload();
    
return {...post, Likes:[...post.Likes, 0]};
  }else{
    window.location.reload();
    return post;
  }
})
 );
 if (likedPosts.includes(postId)) {
  setLikedPosts(
    likedPosts.filter((id) => {
      return id !== postId;
    })
  );
} else {
  setLikedPosts([...likedPosts, postId]);
}

 });
};

  return (
    <div>
        {listOfPosts.map((value, key)=>{
      return <div key={key} className='post'>
        <div className='title'>{value.title}</div>
        <div className='body' onClick={()=>{navigate(`/post/${value.id}`)}}>{value.postText}</div>
        <div className='footer'>
          <div className='username'> 
                   <Link to={`/profile/${value.UserId}`}>
          {value.username}
          </Link>
          </div>
        <div className='buttons'>
        {/* <FavoriteIcon className='likeBttn' onClick={()=>{likeAPost(value.id)}}/> */}
        <FavoriteIcon className={
                    likedPosts.includes(value.id) ? "unlikeBttn" : "likeBttn"
                  } onClick={()=>{likeAPost(value.id)}}/>
        <label>{value.Likes.length}</label>
        </div>
        </div>
        </div>
    })}
    </div>
  )
}

export default Home
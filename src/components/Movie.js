import React, {useState } from 'react'
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { useDispatch } from 'react-redux';
import { DisLikeMovie, LikeMovie, RemoveLikeMovie } from '../Redux/actions/like-dislike';

function Movie({movie}) {
 const dispatch= useDispatch();
    const [isLiked, setisLiked] = useState(false)
    const [isDisLiked, setisDisLiked] = useState(false)
  const likeMovie=()=>{
    let newMovie=movie;
  if(!isLiked){
      newMovie.likes=newMovie.likes+1;
    dispatch(LikeMovie(newMovie));
  }else{
        newMovie.likes=newMovie.likes-1;
    dispatch(RemoveLikeMovie(newMovie));
  }
    setisLiked(!isLiked)
}


const disLikeMovie=()=>{
    let newMovie=movie;
    if(isDisLiked){

      newMovie.dislikes=newMovie.dislikes-1;
      dispatch(DisLikeMovie(newMovie));
    }else{
 newMovie.dislikes=newMovie.dislikes+1;
      dispatch(DisLikeMovie(newMovie));
    }
  setisDisLiked(!isDisLiked)

 
}
 return (
    <div className="card" style={{width: '18rem'}}>
  <div className="card-body">
    <h5 className="card-title">{movie.title}</h5>
    <p className="card-text">{movie.category}</p>
   <div style={{width:"100%",display:'flex',flexDirection:"row",justifyContent:"space-evenly"}}>
      <button className="btn btn-primary" id="isLiked" disabled={isDisLiked} onClick={likeMovie}><AiFillLike /> {movie.likes}</button>
    <button className="btn btn-danger" disabled={isLiked} onClick={disLikeMovie}><AiFillDislike /> {movie.dislikes}</button>
   </div>

  </div>
</div>
  );
}

export default Movie
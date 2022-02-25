import {  Col, Row, Spinner } from "react-bootstrap";

import React, { useState } from "react";
import Movie from "./Movie";
import { useSelector } from "react-redux";
import Filter from "./Filter";
import ReactPaginate from "react-paginate";

function Movies() {
  const [category, setCategory] = useState("");
  var movies = useSelector((State) => State.moviesData.movies);
 const [pageNumber, setPageNumber] = useState(0);
const [moviesPerPage,setMoviesPerPage]=useState(4);
  const pagesVisited = pageNumber * moviesPerPage;

  const isLoading = useSelector(
    (MoviesState) => MoviesState.moviesData.isLoading
  );
  const error = useSelector((MoviesState) => MoviesState.moviesData.error);
  if (isLoading) {
    return (
      <Spinner
        className="bootstrapSpinner"
        animation="grow"
        role="status"
        size="md"
        variant="info"
      >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  } else if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error.message}
      </div>
    );
  }
  const callback = (searchTerm) => {
    setCategory(searchTerm);
  
  };
  var FiltredArray=[];
  var pageCount = 0;
  if(category){
    movies.map(movie=>{if(movie.category===category){
      FiltredArray.push(movie);
    }})
    pageCount=Math.ceil(FiltredArray.length / moviesPerPage)
    
  }else{
    pageCount=Math.ceil(movies.length / moviesPerPage);
  }
console.log(moviesPerPage);
  const filterByCategory = (movies, category) => {
   
    let cat = category.toLowerCase();
    let filtredMovies=movies.category.toLowerCase().includes(cat);
    

    return filtredMovies;
  };
  
  const displayMovies = movies
    .slice(pagesVisited, pagesVisited + moviesPerPage)
    .filter((movie) =>filterByCategory(movie, category))
    .map((movie) => {
      return (
        <Col key={movie.id}>
        <Movie movie={movie} />
        </Col>
      );
    });
    

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  const PageSizeonChangeHandler =(e)=>{
    console.log(e.target.value);
    setMoviesPerPage(e.target.value);
    
  }

  
  return (
    <>
      <Filter movies={movies} callback={callback} />
      <div className="row" style={{ margin: "2%" }}>
        <div className="col-md-2"></div>
        <div className="col-md-8">
          <Row xs={1} md={3} className="g-5">
          
                
                 {displayMovies}
              
          </Row>

          <div
            style={{
              width: "100%",
              margin: "50px",
              textAlign: "center",
              display:"flex",
              flexDirection:"row",
             
            }}
          >
            <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />
      <select
      className="form-control form-control-sm"
      style={{width:"40px",marginLeft:"-10%",height:"20px"}}
       onClick={PageSizeonChangeHandler}   >
           
              <option  value={4}>4</option>
              <option  value={8}>8</option>
              <option  value={12}>12</option>
              
            </select>
    </div>
          </div>
        </div>

        <div className="col-md-2"></div>
      
    </>
  );
}

export default Movies;

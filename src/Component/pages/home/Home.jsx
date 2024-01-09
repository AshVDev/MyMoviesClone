import React, { useEffect, useState } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';
import './Home.css'
import MovieList from '../../movieList/MovieList';
const Home
 = () => {
   const [getPopular,setGetPopulare] = useState([])
useEffect(()=>{
      
      fetch('https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US')
        .then(response => response.json())
        .then(response => {
            console.log(response)
        setGetPopulare(response.results)
        })
        .catch(err => console.error(err));

}, [] ) 

useEffect(()=>{
    console.log(getPopular)
},[getPopular])



  return (
    <>
        <div className='poster'>
            <Carousel 
                showThumbs={false}
                autoPlay={true}
                transitionTime={3}
                infiniteLoop={true}
                showStatus={false}
            >
                {
                   getPopular?.map((movie)=>{
                   return<>
                   <Link className='no-underline text-white' to={`/movie/${movie.id}`}
                   >
                    <div className='posterImage' >
                        <img src={`https://image.tmdb.org/t/p/original${movie && movie.backdrop_path}`}/>

                    </div>
                    <div className='posterImage_overlay'>
                        <div className='posterImage_title'>
                        {
                            movie ? movie.original_title:""
                        }
                        </div>
                        <div className='posterImage_runtime'>
                            {movie.release_date}
                            <span className='posterImage_rating'>{movie.vote_average}
                            <i className='fas fa-star'/>{" "}
                            </span>
                        </div>
                        <div className='posterImage_description'>{movie.overview} </div>

                    </div>

                   </Link>
                    </>
                   }) 
                }



            </Carousel>
          <MovieList/>

        </div>
        
        
    </>
  )
}

export default Home

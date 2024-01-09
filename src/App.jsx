import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter as Router ,Routes, Route } from "react-router-dom"
import Header from './Component/header/header'
import Home from './Component/pages/home/Home'
import MovieList from './Component/movieList/MovieList'
import MoviesDetail from './Component/pages/movieDetailPage/MoviesDetail'

function App() {


  return (
    <>
      <div className='App'>
        <Router>
          <Header/>
          <Routes>
            <Route index element ={<Home/>} ></Route>
            <Route path="movie/:id" element ={<MoviesDetail/>} ></Route>
            <Route path="movies/:type" element={<MovieList />} ></Route>
            <Route path="/*" element={<h1>Error Page</h1>} ></Route>
          </Routes>
        </Router>
   
      </div>
      
    </>
  )
}

export default App

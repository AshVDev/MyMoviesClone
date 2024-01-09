import React, { useEffect, useState } from "react";
import "./Header.css";
import { Link, useParams } from "react-router-dom";
import imdb from "../../assets/pngegg.png";

const Header = () => {
  const [selectedOption, setSelectedOption] = useState("popular");
  const [mlForSrch, setMLForSrch] = useState([]);

  // Function to handle the change event
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const [srchval,SetSrchVal]=useState(null)

  // const {type} = useParams()
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${selectedOption}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setMLForSrch(response.results);
        // setMovieList(response.results)
      })
      .catch((err) => console.error(err));
  }, [selectedOption]);
  const handleSearch = (e) => {
    let enteredTxt = e.target.value;
    SetSrchVal(enteredTxt)
    // console.log(enteredTxt)
  };
  // console.log(type)

  return (
    <div className="header">
      <div className="headerLeft">
        <Link to="/">
          <span>
            <img
              className="header_icon"
              src={
                "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png"
              }
            ></img>
          </span>
        </Link>
        <Link to={"/movies/popular"} className="no-underline">
          <span>Popular</span>
        </Link>
        <Link className="no-underline" to={"/movies/top_rated "}>
          <span>Top Rated</span>
        </Link>
        <Link className="no-underline" to={"/movies/upcoming"}>
          <span>Upcoming</span>
        </Link>
        <select
          id="movieSelector"
          className="text-black  mr-2 rounded-[4px] p-1 "
          value={selectedOption}
          onChange={handleChange}
          // placeholder='Options...'
        >
          {/* //   <option className='text-black ' value="" disabled>Options...</option> */}
          <option className="text-black " value="popular">
            Popular
          </option>
          <option className="text-black " value="top_rated">
            Top Rated
          </option>
          <option className="text-black " value="upcoming">
            Upcoming
          </option>
        </select>
<div className="search-bar">

        <input
          className="rounded-[10px]  hover:bg-white hover:text-black text-yellow-800 bg-black border-solid border 1px border-yellow-200 p-2 " id="searchInput"
          onChange={(e) => handleSearch(e)}
          value={srchval}
          placeholder="Search"
          type="text"
        />
        <ul className={`${srchval?'suggestion-box':''}`} style={{zIndex:'10'}} >
    {/* <!-- Suggestions will be populated here dynamically -->
    <li>Result 1</li>
    <li>Result 2</li>
    <li>Result 3</li> */}
        {srchval &&
          mlForSrch
          ?.filter((d) => {
              return (
                d.original_title
                .toLowerCase().includes(srchval.toLowerCase()) &&
                d.original_title !== mlForSrch
              );
            })
            .map((item, i) => {
              console.log(item);
              return (
        // className="suggestion flex flex-col"

                <li
                  // className="suggestion flex flex-col"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    SetSrchVal("");
                  }}
                  key={i}
                >
        <Link to={`/movie/${item.id}`} style={{textDecoration:"none", color:"black"}}>

                  {item.original_title}
                </Link>

                </li>
              );
            })}
            </ul>
              </div>
      </div>
    </div>
  );
};

export default Header;

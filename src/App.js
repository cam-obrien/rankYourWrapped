import React from 'react';
import axios from 'axios';
import { useEffect, useState } from "react";
import TopArtistsBoard from './TopArtistsBoard'
import TopTracksBoard from './TopTracksBoard';
import Summary from './Summary';

const App = () => {

  const CLIENT_ID = "ade964553b5b452bb412b514e669c3b0"
  const REDIRECT_URI = "http://localhost:3000"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"
  const SCOPE = "user-top-read"

  const [token, setToken] = useState("");
  const [trackItems, setTrackItems] = useState([])
  const [artistItems, setArtistItems] = useState([])

  const [name, setName] = useState("");
  const [nResults, setNResults] = useState(20)
  const [timeRange, setTimeRange] = useState("medium_term")
  const [showArtists, setShowArtists] = useState(false)
  const [showTracks, setShowTracks] = useState(false)


  useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem("token")


    if (!token && hash) {
        token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

        window.location.hash = ""
        window.localStorage.setItem("token", token)
    }
    //console.log(token)
    setToken(token)
    //getDisplayName()
  }, [])


  const logout = () => {
    setToken("")
    window.localStorage.removeItem("token")
    setShowArtists(false)
    setShowTracks(false)
  }

  const getTopArtists = async (e) => {
    e.preventDefault()
    const {data} = await axios.get("https://api.spotify.com/v1/me/top/artists",{
      headers: {
        Authorization: `Bearer ${token}`
      },
      params:{
        limit: nResults,
        time_range: timeRange
      }
    })
    setArtistItems(data.items)
    setShowTracks(false)
    setShowArtists(false)
    setShowArtists(true)

  }

  const getTopTracks = async (e) => {
    e.preventDefault()
    const {data} = await axios.get("https://api.spotify.com/v1/me/top/tracks",{
      headers: {
        Authorization: `Bearer ${token}`
      },
      params:{
        limit: nResults,
        time_range: timeRange
      }
    })
    setTrackItems(data.items)
    setShowArtists(false)
    setShowTracks(false)
    setShowTracks(true)
  }

  return ( 
    <div className='page-container'>
      <div className='top-bar'>
        <h1>rankYourWrapped</h1>
      </div>




      {token ?
      <div>
          <div className="filters-container">
            <div id="res-input">
              <h3># of Results</h3>
              <input id="n-results-input" type="number" min="1" max="50" placeholder='20'onChange={e => setNResults(e.target.value)}></input>
            </div>
            <div id="range-select">
              <h3>Time Range</h3>
              <select id="time-range-select" onChange={e => setTimeRange(e.target.value)}>
                <option value="short_term"> 4 Weeks </option>
                <option value="medium_term" defaultValue> 6 Months </option>
                <option value="long_term"> All Time </option>
              </select>
            </div>
          </div>
          

        <div className='search-options-container'>

          <form onSubmit={getTopArtists}>
          <button type={"submit"}>Get Artists</button>
        
          </form>
          <form onSubmit={getTopTracks}>
          <button type={"submit"}>Get Tracks</button>
        
          </form>
        </div>
      </div>
        : <p id="tagline">How rare is your music taste?</p>

      }

      
      {showArtists &&  
        <div>
          <TopArtistsBoard items={artistItems} name={name}/>
          <Summary items={artistItems}/>
        </div>
      }
      {showTracks && 
        <div>
          <TopTracksBoard items={trackItems} name={name}/>
          <Summary items={trackItems}/>
        </div>
      }



      {!token ? 
                      <div className='login-container'>
                        <div id="login-button">
                          <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`}>Login
                            to Spotify</a>
                        </div>
                      </div>
                    : <div className='logout-container'>
                        <button id="logout-button" onClick={logout}>Logout</button>
                      </div>}
    </div>

  );
}

export default App;
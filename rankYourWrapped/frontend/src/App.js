import React from 'react';
import axios from 'axios';
import { useEffect, useState } from "react";

const App = () => {

  const CLIENT_ID = "ade964553b5b452bb412b514e669c3b0"
  const REDIRECT_URI = "http://localhost:3000"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"
  const SCOPE = "user-top-read"

  const [token, setToken] = useState("")
  //const [searchKey, setSearchKey] = useState("")
  const [artists, setArtists] = useState([])
  const [name, setName] = useState("")

  useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem("token")


    if (!token && hash) {
        token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

        window.location.hash = ""
        window.localStorage.setItem("token", token)
    }

    setToken(token)

  }, [])


  const logout = () => {
    setToken("")
    window.localStorage.removeItem("token")
  }

  const getDisplayName = async (e) => {
    e.preventDefault()
    const {data} = await axios.get("https://api.spotify.com/v1/users/cameronobrien44",{
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    setName(data.display_name)
    console.log(name)

  }

  const getTopArtists = async (e) => {
    e.preventDefault()
    const {data} = await axios.get("https://api.spotify.com/v1/me/top/artists",{
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    console.log(data)
  }

  return ( 
    <div>
      <h1>rankYourWrapped</h1>

      {!token ? 
        <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`}>Login
                        to Spotify</a>
                    : <button onClick={logout}>Logout</button>}
      
      {token ?

        <div>
          <form onSubmit={getDisplayName}>
            <button type={"submit"}>Get Display Name</button>

          </form>
          <form onSubmit={getTopArtists}>
          <button type={"submit"}>Get Artists</button>
        
          </form>
        </div>
        : <h2>Please Login</h2>

      }


    </div>
  );
}

export default App;
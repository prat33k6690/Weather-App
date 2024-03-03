import Search from "./components/Search";
import Result from "./components/Result";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState([]);
  const [history, setHistory] = useState([]);

  const changeSearch = (value) => {
    setSearch(value);
  };

  const searchWeatherHandler = () =>{
   
    if (search !== ""){
      axios.get(
        'https://api.openweathermap.org/data/2.5/weather?q=data&appid=1bc7c84841edfc5b01ac439113f21030'
      )
      .then((response) => {
        if(history.indexOf(search)=== -1){
          setHistory(
            [
              ...history,
              search
            ]
          )
        }
        console.log(response.data);
        setWeather(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }

  const historySearchHandler = async (data) => {
    setSearch(data)
    if (data !== "") {
      axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${data}&appid=3265874a2c77ae4a04bb96236a642d2f&units=metric`
      )
        .then(
          (response) => {
            if (history.indexOf(data) === -1) {
              setHistory(
                [
                  ...history,
                  data
                ]
              )
            }
            // console.log(response.data);
            setWeather(response.data);
          }
        ).catch(
          (error) => {
            console.log(error);
          }
        )
    }
  }
  
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand">Weather App</a>
        </div>
      </nav>
      <div className="col-md-12">
        <div className="weatherBg">
          <h1 className="heading">Search Your Weather Here !!</h1>
          <Search searchData={search} eventHandler={changeSearch} searchWeather={searchWeatherHandler} />
        </div>
      </div>
      <div className="max-w-[1240px] mx-auto mt-2 p-3 shadow">
        <Result weatherData={weather} historyData={history} historySearch={historySearchHandler} />
      </div>
    </div>
  );
}

export default App;

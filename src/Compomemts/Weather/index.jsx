import { useEffect, useState } from "react";
import Search from "../Search/index.jsx";

export default function Weather() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  async function fetchWeatherData(param) {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${param}&appid=276ddfdcd7130227a6dbbc82f7dd0416`
      );
      const data = await response.json();
      console.log(data);
      if (data) {
        setData(data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  function getCurrentDate() {
    return new Date().toLocaleDateString("en-us", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }

  function handleSearch() {
    fetchWeatherData(search);
  }

  useEffect(() => {
    fetchWeatherData("jerusalem");
  }, []);

  if (loading) {
    return <h1>Loading Data! Please Wait</h1>;
  }
  return (
    <div>
      <Search
        Search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
      />
      {loading ? (
        <h1>Loading Data! Please Wait</h1>
      ) : (
        <div>
          <div className="City-name">
            <h2>
              {data?.name}, <span>{data?.sys?.country}</span>
            </h2>
          </div>
          <div className="Date">
            <span>{getCurrentDate()}</span>
          </div>
          <div className="temp">
            <span>{Math.round(data?.main?.temp - 273.15)}°C</span>
          </div>
          <p className="description">
            {data && data.weather && data.weather[0]
              ? data.weather[0].description
              : ""}
          </p>
          <div className="weather-info">
            <div className="column">
              <div>
                <p className="wind">{data?.wind?.speed}</p>
                <p>Wind Speed</p>
              </div>
            </div>
            <div className="column">
              <div>
                <p className="humidity">{data?.main?.humidity}%</p>
                <p>Humidity</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

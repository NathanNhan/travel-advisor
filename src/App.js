import react, { useState, useEffect } from "react";
import { CssBaseline, Grid } from "@material-ui/core";
import Header from "./components/Header/Header";
import Map from "./components/Map/Map";
import List from "./components/List/List";
import { getPlacesData, getWeatherMap } from "./api";
function App() {
  const [places, setPlaces] = useState([]);
  const [coordinate, setCoordinate] = useState({ lat: 0, lng: 0 });
  const [bounds, setBounds] = useState({});
  const [childClicked, setChildClicked] = useState(null);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("restaurant");
  const [rating, setRating] = useState("");
  const [filterPlaces, setFilterPlaces] = useState([]);
  const [weatherData, setWeatherData] = useState([]);
  // get current geolocation
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longtitude } }) => {
        setCoordinate({ lat: latitude, lng: longtitude });
      }
    );
  }, []);
  // filter places with rating 
  useEffect(()=>{
   const filteredPlaces = places.filter((place) => place.rating > rating);
   setFilterPlaces(filteredPlaces);
  },[rating])
  // Get type of accomodation, bound in a map
  useEffect(() => {
    if(bounds){
      setLoading(true);
      getWeatherMap(coordinate.lat, coordinate.lng).then((data) => setWeatherData(data));
      getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
        console.log(data);
        setPlaces(data.filter((place) => place.name && place.num_reviews > 0));
        setFilterPlaces([]);
        setLoading(false);
      });
    }
  }, [type, bounds]);
  return (
    <div>
      <CssBaseline />
      <Header setCoordinate={setCoordinate}/>
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List
            places={filterPlaces.length ? filterPlaces : places}
            childClicked={childClicked}
            loading={loading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setCoordinate={setCoordinate}
            setBounds={setBounds}
            coordinate={coordinate}
            places={filterPlaces.length ? filterPlaces : places}
            setChildClicked={setChildClicked}
            weatherData={weatherData}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;

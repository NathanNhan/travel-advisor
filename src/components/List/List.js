import React, {useState, useEffect, createRef} from 'react';
import {
  CircularProgress,
  Grid,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";
import useStyles from './styles';
import PlaceDetail from "../PlaceDetail/PlaceDetail";
const List = ({places , childClicked , loading, type, rating, setType, setRating}) => {
  const classes = useStyles();
  
  const [refElement, setRefElement] = useState([]);
  //set ref element for the restaurant when user click on map
  useEffect(()=>{
  //write your effect here...
  const refs = Array(places.length)
    .fill()
    .map((_, i) => refElement[i] || createRef());

    setRefElement(refs);
  },[places])
  console.log({childClicked});
  return (
    <div className={classes.container}>
      <Typography variant="h4">Food & Dinning around you</Typography>
      {loading ? (
        <div className={classes.loading}>
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <>
          <FormControl>
            <InputLabel>Type</InputLabel>
            <Select value={type} onChange={(e) => setType(e.target.value)}>
              <MenuItem value="restaurant">Restaurants</MenuItem>
              <MenuItem value="hotels">Hotels</MenuItem>
              <MenuItem value="attractions">Attraction</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel>Rating</InputLabel>
            <Select value={rating} onChange={(e) => setRating(e.target.value)}>
              <MenuItem value={0}>All</MenuItem>
              <MenuItem value={3}>Above 3.0</MenuItem>
              <MenuItem value={4}>Above 4.0</MenuItem>
              <MenuItem value={4.5}>Above 4.5</MenuItem>
            </Select>
          </FormControl>
          <Grid container spacing={3} className={classes.list}>
            {places?.map((place, i) => (
              <Grid item key={i} xs={12}>
                <PlaceDetail
                  place={place}
                  selected={Number(childClicked === i)}
                  refProp={refElement[i]}
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </div>
  );
};

export default List;

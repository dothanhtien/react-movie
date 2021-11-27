import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import useStyles from "./style";
import { Link } from "react-router-dom";

const MovieItem = (props) => {
  const { maPhim, hinhAnh, tenPhim, danhGia, moTa } = props.movie;
  const classes = useStyles();

  return (
    <Card>
      <CardMedia
        component="img"
        height="320"
        image={hinhAnh}
        alt="green iguana"
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h6"
          component="h3"
          className={classes.title}
        >
          {tenPhim.length > 40 ? tenPhim.substr(0, 36) + " ..." : tenPhim}
        </Typography>
        <Typography variant="overline">Rating: {danhGia}/10</Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          component="p"
          className={classes.description}
        >
          {moTa.length > 89 ? moTa.substr(0, 85) + " ..." : moTa}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Booking</Button>
        <Button size="small" component={Link} to={`/movies/${maPhim}`}>
          Detail
        </Button>
      </CardActions>
    </Card>
  );
};

export default MovieItem;

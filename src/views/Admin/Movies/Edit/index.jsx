import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  IconButton,
  Input,
  InputLabel,
  MenuItem,
  Rating,
  Select,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { format } from "date-fns";
import { useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createMovieSchema } from "../../../../services/movie";
import { useDispatch, useSelector } from "react-redux";
import { createLoadingSelector } from "../../../../store/selector";
import { fetchMovieDetail, updateMovie } from "../../../../store/actions/movie";
import Swal from "sweetalert2";
import { GROUP_ID } from "../../../../constants/appConfig";
import NoImage from "../../../../assets/img/no-image.png";
import useStyles from "./style";
import BackButton from "../../../../components/UI/Buttons/BackButton";

const EditMovie = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const classes = useStyles();
  const { movieDetail } = useSelector((state) => state.movie);
  const updatingMovieSelector = createLoadingSelector(["UPDATE_MOVIE"]);
  const isUpdatingMovie = useSelector((state) => updatingMovieSelector(state));
  const movieImageRef = useRef(null);
  const movieImageElemRef = useRef(null);
  const [movieImage, setMovieImage] = useState(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
    setValue,
  } = useForm({
    mode: "all",
    defaultValues: {
      tenPhim: "",
      trailer: "",
      moTa: "",
      ngayKhoiChieu: "",
      status: "",
      dangChieu: false,
      sapChieu: false,
      danhGia: 9,
      hot: false,
      hinhAnh: null,
    },
    resolver: yupResolver(createMovieSchema),
  });

  useEffect(() => {
    dispatch(fetchMovieDetail(params.id));
  }, [dispatch, params.id]);

  useEffect(() => {
    reset(movieDetail);

    setInitialValueOfStatus(movieDetail?.sapChieu, movieDetail?.dangChieu);
    // eslint-disable-next-line
  }, [movieDetail]);

  const handleChangeReleaseDate = (value) => {
    if (value && value.toString() === "Invalid Date") {
      setError("ngayKhoiChieu", {
        type: "manual",
        message: "Release date is invalid",
      });
      return;
    }

    setValue("ngayKhoiChieu", value ? format(value, "dd/MM/yyyy") : "", {
      shouldValidate: true,
    });
  };

  const setInitialValueOfStatus = (comingSoon, nowShowing) => {
    if (comingSoon) {
      setValue("status", "comingSoon", { shouldValidate: true });
    } else if (nowShowing) {
      setValue("status", "nowShowing", { shouldValidate: true });
    } else {
      setValue("status", "noScreenings", { shouldValidate: true });
    }
  };

  const handleChangeStatus = (e) => {
    const { value } = e.target;

    setValue("status", value, { shouldValidate: true });

    switch (value) {
      case "comingSoon":
        setValue("sapChieu", true);
        break;
      case "nowShowing":
        setValue("dangChieu", true);
        break;
      default:
        setValue("sapChieu", false);
        setValue("dangChieu", false);
        break;
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file);

    if (
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/gif" ||
      file.type === "image/png"
    ) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setMovieImage(e.target.result);
      };

      setValue("hinhAnh", file, { shouldValidate: true });
      movieImageRef.current = file;
    } else {
      setError("hinhAnh", {
        type: "manual",
        message: "Image is not in the correct format",
      });
    }
  };

  const onSubmit = (data) => {
    data.maNhom = GROUP_ID;
    data.hinhAnh = movieImageRef.current;

    const formData = new FormData();
    for (let key in data) {
      if (key !== "hinhAnh") {
        formData.append(key, data[key]);
      } else if (key === "hinhAnh" && data.hinhAnh) {
        formData.append("File", data.hinhAnh, data.hinhAnh.name);
      }
    }

    formData.delete("biDanh");

    dispatch(
      updateMovie(formData, () => {
        // show success modal
        Swal.fire({
          icon: "success",
          title: "Movie updated successfully",
          // timer: 5000,
          showConfirmButton: false,
          didClose: () => {
            // scroll to top
            window.scrollTo(0, 0);
          },
        });
      })
    );
  };

  const handleResetForm = () => {
    reset(movieDetail);
    setInitialValueOfStatus(movieDetail?.sapChieu, movieDetail?.dangChieu);
    setMovieImage(null);
    movieImageElemRef.current.value = "";
  };

  return (
    <>
      <BackButton />
      <Typography variant="h3" component="h1" mb={2}>
        Edit movie
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="tenPhim"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={
                <>
                  Movie name
                  <span className={classes.labelMandatory}>&nbsp;*</span>
                </>
              }
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!errors.tenPhim}
              helperText={errors.tenPhim?.message}
            />
          )}
        />

        <Controller
          name="trailer"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Trailer"
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!errors.trailer}
              helperText={errors.trailer?.message}
            />
          )}
        />

        <Controller
          name="moTa"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Description"
              variant="outlined"
              fullWidth
              multiline
              minRows={4}
              margin="normal"
            />
          )}
        />

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 0, sm: 2 }}
        >
          <Controller
            name="ngayKhoiChieu"
            control={control}
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  {...field}
                  label={
                    <>
                      Release date
                      <span className={classes.labelMandatory}>&nbsp;*</span>
                    </>
                  }
                  inputFormat="dd/MM/yyyy"
                  renderInput={(params) => (
                    <TextField
                      onBlur={field.onBlur}
                      {...params}
                      margin="normal"
                      error={!!errors.ngayKhoiChieu}
                      helperText={errors.ngayKhoiChieu?.message}
                    />
                  )}
                  value={
                    field.value
                      ? new Date(
                          field.value.replace(
                            /(\d{2})\/(\d{2})\/(\d{4})/,
                            "$2/$1/$3"
                          )
                        )
                      : null
                  }
                  onChange={handleChangeReleaseDate}
                />
              </LocalizationProvider>
            )}
          />

          <Box width="100%">
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <FormControl
                  fullWidth
                  margin="normal"
                  error={!!errors.status?.message}
                >
                  <InputLabel id="status-select-label">
                    Status
                    <span className={classes.labelMandatory}>&nbsp;*</span>
                  </InputLabel>
                  <Select
                    {...field}
                    labelId="status-select-label"
                    id="status-select"
                    label="Status"
                    value={field.value}
                    onChange={handleChangeStatus}
                  >
                    <MenuItem value="comingSoon">Coming soon</MenuItem>
                    <MenuItem value="nowShowing">Now showing</MenuItem>
                    <MenuItem value="noScreenings">No screenings</MenuItem>
                  </Select>
                  <FormHelperText>{errors.status?.message}</FormHelperText>
                </FormControl>
              )}
            />
          </Box>
        </Stack>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 0, sm: 10 }}
        >
          <Controller
            name="danhGia"
            control={control}
            render={({ field }) => (
              <FormControl margin="normal">
                <Typography component="legend">Rating</Typography>
                <Rating
                  {...field}
                  max={10}
                  onChange={(e, newValue) => setValue("danhGia", newValue)}
                />
              </FormControl>
            )}
          />

          <Controller
            name="hot"
            control={control}
            render={({ field }) => (
              <Box>
                <FormControl margin="normal">
                  <FormControlLabel
                    label="Hot"
                    control={<Switch {...field} checked={field.value} />}
                  />
                </FormControl>
              </Box>
            )}
          />
        </Stack>

        <Box>
          <FormControl
            margin="normal"
            error={!!errors.hinhAnh}
            sx={{ display: "block" }}
          >
            <label htmlFor="movie-image">
              <Input
                inputRef={movieImageElemRef}
                accept="image/*"
                id="movie-image"
                type="file"
                sx={{ display: "none" }}
                onChange={handleImageChange}
              />
              Upload image
              <span className={classes.labelMandatory}>&nbsp;*</span>
              <IconButton color="primary" component="span">
                <PhotoCamera />
              </IconButton>
            </label>
            <FormHelperText>{errors.hinhAnh?.message}</FormHelperText>
          </FormControl>
          <Box
            component="img"
            src={
              movieImage
                ? movieImage
                : movieDetail?.hinhAnh
                ? movieDetail.hinhAnh
                : NoImage
            }
            alt="preview"
            maxHeight={250}
          />
        </Box>

        <FormGroup row sx={{ marginTop: 2 }}>
          <Button
            variant="contained"
            type="submit"
            sx={{ marginRight: 1 }}
            disabled={isUpdatingMovie}
          >
            Update
          </Button>
          <Button
            variant="contained"
            color="inherit"
            onClick={handleResetForm}
            disabled={isUpdatingMovie}
          >
            Reset
          </Button>
        </FormGroup>
      </form>
    </>
  );
};

export default EditMovie;

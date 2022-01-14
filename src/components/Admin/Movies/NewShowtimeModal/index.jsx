import React, { useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { format } from "date-fns";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createMovieShowtimeSchema } from "../../../../services/booking";
import { useDispatch, useSelector } from "react-redux";
import { createAction } from "../../../../store/actions";
import { actionType } from "../../../../store/actions/type";
import {
  fetchCinemaComplexes,
  fetchCinemaGroupByCinemaComplex,
} from "../../../../store/actions/cinema";
import { createMovieShowtime } from "../../../../store/actions/booking";

const NewShowtimeModal = ({ movieId, open, onClose, onCreate, onSuccess }) => {
  const dispatch = useDispatch();
  const { cinemaComplexes } = useSelector((state) => state.cinema);
  const { cinemaGroups } = useSelector((state) => state.cinema);

  const {
    control,
    formState: { errors },
    handleSubmit,
    setError,
    setValue,
  } = useForm({
    mode: "all",
    defaultValues: {
      cinemaComplex: "",
      cinemaGroup: "",
      showtime: String(new Date()),
      price: "",
    },
    resolver: yupResolver(createMovieShowtimeSchema),
  });

  useEffect(() => {
    dispatch(fetchCinemaComplexes());

    return () => {
      // remove cinemaGroups data in redux before leaving this modal
      dispatch(
        createAction(
          actionType.FETCH_CINEMA_GROUP_BY_CINEMA_COMPLEX_SUCCESS,
          []
        )
      );
    };
  }, [dispatch]);

  const handleChangeCinemaComplex = (e) => {
    setValue("cinemaComplex", e.target.value);

    dispatch(fetchCinemaGroupByCinemaComplex(e.target.value));
  };

  const handleChangeCinemaGroup = (e) => {
    setValue("cinemaGroup", e.target.value);
  };

  const handleChangeShowtime = (value) => {
    if (value && value.toString() === "Invalid Date") {
      setError("showtime", {
        type: "manual",
        message: "Showtime is invalid",
      });
      return;
    }

    setValue(
      "showtime",
      value ? format(value, "dd/MM/yyyy hh:mm aaaaa'm'") : "",
      {
        shouldValidate: true,
      }
    );
  };

  const onSubmit = (data) => {
    dispatch(
      createMovieShowtime(
        {
          maPhim: movieId,
          ngayChieuGioChieu: format(
            new Date(
              data.showtime.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3")
            ),
            "dd/MM/yyyy HH:mm:ss"
          ),
          maRap: data.cinemaGroup,
          giaVe: data.price,
        },
        () => {
          onClose();
          onSuccess();
        }
      )
    );
  };

  return (
    <Dialog fullWidth maxWidth="xs" open={open}>
      <DialogTitle>New showtime</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Controller
            control={control}
            name="cinemaComplex"
            render={({ field }) => {
              return (
                <FormControl
                  fullWidth
                  margin="normal"
                  error={!!errors.cinemaComplex?.message}
                >
                  <InputLabel id="cinema-complex-select-label">
                    Cinema complex
                  </InputLabel>
                  <Select
                    {...field}
                    labelId="cinema-complex-select-label"
                    id="cinema-complex-select"
                    label="Cinema complex"
                    onChange={handleChangeCinemaComplex}
                  >
                    {cinemaComplexes &&
                      cinemaComplexes.map((cinemaComplex) => {
                        return (
                          <MenuItem
                            key={cinemaComplex.maHeThongRap}
                            value={cinemaComplex.maHeThongRap}
                          >
                            {cinemaComplex.tenHeThongRap}
                          </MenuItem>
                        );
                      })}
                  </Select>
                  <FormHelperText>
                    {errors.cinemaComplex?.message}
                  </FormHelperText>
                </FormControl>
              );
            }}
          />

          <Controller
            control={control}
            name="cinemaGroup"
            render={({ field }) => {
              return (
                <FormControl
                  fullWidth
                  margin="normal"
                  error={!!errors.cinemaGroup?.message}
                >
                  <InputLabel id="cinema-of-cinema-complex-select-label">
                    Cinema of cinema complex
                  </InputLabel>
                  <Select
                    {...field}
                    labelId="cinema-of-cinema-complex-select-label"
                    id="cinema-of-cinema-complex-select"
                    label="Cinema of cinema complex"
                    onChange={handleChangeCinemaGroup}
                  >
                    {cinemaGroups &&
                      cinemaGroups.map((cinema) => {
                        return (
                          <MenuItem
                            key={cinema.maCumRap}
                            value={cinema.maCumRap}
                          >
                            {cinema.tenCumRap}
                          </MenuItem>
                        );
                      })}
                  </Select>
                  <FormHelperText>{errors.cinemaGroup?.message}</FormHelperText>
                </FormControl>
              );
            }}
          />

          <Controller
            control={control}
            name="showtime"
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  {...field}
                  label="Showtime"
                  inputFormat="dd/MM/yyyy hh:mm a"
                  mask="___/__/__ __:__ _M"
                  renderInput={(params) => (
                    <TextField
                      onBlur={field.onBlur}
                      {...params}
                      margin="normal"
                      fullWidth
                      error={!!errors.showtime}
                      helperText={errors.showtime?.message}
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
                  onChange={handleChangeShowtime}
                />
              </LocalizationProvider>
            )}
          />

          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Ticket price"
                variant="outlined"
                fullWidth
                margin="normal"
                error={!!errors.price}
                helperText={errors.price?.message}
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={onCreate}
          >
            Create
          </Button>
          <Button
            variant="contained"
            color="inherit"
            onClick={onClose}
            autoFocus
          >
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default NewShowtimeModal;

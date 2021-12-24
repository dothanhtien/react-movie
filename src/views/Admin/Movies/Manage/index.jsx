import React, { useEffect, useState } from "react";
import {
  Avatar,
  CircularProgress,
  IconButton,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteMovie,
  fetchMoviesWithPagination,
} from "../../../../store/actions/movie";
import { createLoadingSelector } from "../../../../store/selector";
import DeleteMovieModal from "../../../../components/Admin/Movies/DeleteMovieModal";

const MovieManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchingMoviesSelector = createLoadingSelector([
    "FETCH_MOVIES_WITH_PAGINATION",
  ]);
  const deletingMovieSelector = createLoadingSelector(["DELETE_MOVIE"]);
  const isFetchingMovies = useSelector((state) =>
    fetchingMoviesSelector(state)
  );
  const isDeletingMovie = useSelector((state) => deletingMovieSelector(state));
  const movieList = useSelector((state) => state.movie.movieList);
  const pagination = useSelector((state) => state.movie.pagination);
  const [showDeleteMovieModal, setShowDeleteMovieModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    dispatch(fetchMoviesWithPagination());
  }, [dispatch]);

  const handleChangePagination = (e, page) => {
    dispatch(fetchMoviesWithPagination({ soTrang: page }));
  };

  const handleShowConfirmDeleteMovieModal = (movie) => {
    setSelectedMovie(movie);
    setShowDeleteMovieModal(true);
  };

  const handleDeleteMovie = () => {
    dispatch(
      deleteMovie(selectedMovie.maPhim, () => {
        // hide Confirm delete movie modal
        setShowDeleteMovieModal(false);

        // show success modal
        Swal.fire({
          icon: "success",
          title: "Movie deleted successfully",
          // timer: 5000,
          showConfirmButton: false,
        });

        // fetch movie list => NEED TO BE IMPLEMENTED
        dispatch(fetchMoviesWithPagination());
      })
    );
  };

  return (
    <>
      <Typography variant="h3" component="h1" mb={4}>
        Manage movies
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Movie name</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isFetchingMovies && (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            )}

            {!isFetchingMovies &&
              movieList &&
              movieList.map((movie) => {
                return (
                  <TableRow key={movie.maPhim}>
                    <TableCell>{movie.maPhim}</TableCell>
                    <TableCell>
                      <Avatar
                        variant="square"
                        alt={movie.tenPhim}
                        src={movie.hinhAnh}
                        sx={{ width: 56, height: 56 }}
                      />
                    </TableCell>
                    <TableCell>{movie.tenPhim}</TableCell>
                    <TableCell align="center">
                      <Tooltip title="Edit" arrow>
                        <IconButton
                          size="small"
                          color="primary"
                          sx={{ marginRight: 1 }}
                          onClick={() =>
                            navigate(`/admin/movies/${movie.maPhim}/edit`)
                          }
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete" arrow>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() =>
                            handleShowConfirmDeleteMovieModal(movie)
                          }
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>

      {pagination && (
        <Pagination
          variant="outlined"
          color="primary"
          shape="rounded"
          sx={{ marginTop: 2 }}
          count={pagination.totalPages}
          page={pagination.currentPage}
          onChange={handleChangePagination}
        />
      )}

      {showDeleteMovieModal && (
        <DeleteMovieModal
          movie={selectedMovie}
          open={showDeleteMovieModal}
          onClose={() => setShowDeleteMovieModal(false)}
          isDeleting={isDeletingMovie}
          onDelete={handleDeleteMovie}
        />
      )}
    </>
  );
};

export default MovieManagement;

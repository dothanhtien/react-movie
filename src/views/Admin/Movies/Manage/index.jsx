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
import { useDispatch, useSelector } from "react-redux";
import { fetchMoviesWithPagination } from "../../../../store/actions/movie";
import { createLoadingSelector } from "../../../../store/selector";
import DeleteMovieModal from "../../../../components/Admin/Movies/DeleteMovieModal";

const MovieManagement = () => {
  const dispatch = useDispatch();
  const loadingSelector = createLoadingSelector([
    ["FETCH_MOVIES_WITH_PAGINATION"],
  ]);
  const isFetching = useSelector((state) => loadingSelector(state));
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
            {isFetching && (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            )}

            {!isFetching &&
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
          open={showDeleteMovieModal}
          handleClose={() => setShowDeleteMovieModal(false)}
          movie={selectedMovie}
        />
      )}
    </>
  );
};

export default MovieManagement;

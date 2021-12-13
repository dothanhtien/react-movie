import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";

const DeleteMovieModal = ({ open, handleClose, movie }) => {
  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={handleClose}>
      <DialogTitle>Are you sure to delete this movie?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          The movie <strong>{movie.tenPhim}</strong> will be permanently
          deleted.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="error" onClick={handleClose}>
          Delete
        </Button>
        <Button
          variant="contained"
          color="inherit"
          onClick={handleClose}
          autoFocus
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteMovieModal;

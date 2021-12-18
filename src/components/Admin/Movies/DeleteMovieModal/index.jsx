import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const DeleteMovieModal = ({ open, movie, isDeleting, onClose, onDelete }) => {
  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose}>
      <DialogTitle>Are you sure to delete this movie?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          The movie <strong>{movie.tenPhim}</strong> will be permanently
          deleted.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="error"
          onClick={onDelete}
          disabled={isDeleting}
        >
          Delete
        </Button>
        <Button
          variant="contained"
          color="inherit"
          onClick={onClose}
          disabled={isDeleting}
          autoFocus
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteMovieModal;

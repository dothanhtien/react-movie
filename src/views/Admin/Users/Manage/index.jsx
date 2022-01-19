import React, { useEffect, useState } from "react";
import {
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
import LaunchIcon from "@mui/icons-material/Launch";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  fetchUsersWithPagination,
} from "../../../../store/actions/user";
import { createLoadingSelector } from "../../../../store/selector";
import DeleteUserModal from "../../../../components/Admin/Users/DeleteUserModal";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const ManageUsers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchingUsersSelector = createLoadingSelector([
    "FETCH_USERS_WITH_PAGINATION",
  ]);
  const deletingUserSelector = createLoadingSelector(["DELETE_USER"]);
  const isFetchingUsers = useSelector((state) => fetchingUsersSelector(state));
  const isDeletingUser = useSelector((state) => deletingUserSelector(state));
  const { userList, pagination } = useSelector((state) => state.user);
  const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    dispatch(fetchUsersWithPagination());
  }, [dispatch]);

  const handleChangePagination = (e, page) => {
    dispatch(fetchUsersWithPagination({ soTrang: page }));
  };

  const handleShowConfirmDeleteUserModal = (user) => {
    setSelectedUser(user);
    setShowDeleteUserModal(true);
  };

  const handleDeleteUser = () => {
    dispatch(
      deleteUser(selectedUser.taiKhoan, () => {
        // hide Confirm delete movie modal
        setShowDeleteUserModal(false);

        // show success modal
        Swal.fire({
          icon: "success",
          title: "User deleted successfully",
          // timer: 5000,
          showConfirmButton: false,
        });

        // fetch movie list => NEED TO BE IMPLEMENTED
        dispatch(fetchUsersWithPagination());
      })
    );
  };

  return (
    <>
      <Typography variant="h3" component="h1" mb={4}>
        Manage users
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isFetchingUsers && (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            )}

            {!isFetchingUsers &&
              userList &&
              userList.map((user) => {
                return (
                  <TableRow key={user.taiKhoan}>
                    <TableCell>{user.taiKhoan}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell align="center">
                      <Tooltip title="Edit" arrow>
                        <IconButton
                          size="small"
                          color="primary"
                          sx={{ marginRight: 1 }}
                          onClick={() =>
                            navigate(`/admin/users/${user.taiKhoan}/edit`)
                          }
                        >
                          <LaunchIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete" arrow>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleShowConfirmDeleteUserModal(user)}
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
          count={
            pagination.totalCount % 20 > 0
              ? pagination.totalPages
              : Math.floor(pagination.totalCount / 20)
          }
          page={pagination.currentPage}
          onChange={handleChangePagination}
        />
      )}

      {showDeleteUserModal && (
        <DeleteUserModal
          user={selectedUser}
          open={showDeleteUserModal}
          onClose={() => setShowDeleteUserModal(false)}
          isDeleting={isDeletingUser}
          onDelete={handleDeleteUser}
        />
      )}
    </>
  );
};

export default ManageUsers;

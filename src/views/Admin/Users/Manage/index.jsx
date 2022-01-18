import React, { useEffect } from "react";
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
import { fetchUsersWithPagination } from "../../../../store/actions/user";
import { createLoadingSelector } from "../../../../store/selector";

const ManageUsers = () => {
  const dispatch = useDispatch();
  const fetchingUsersSelector = createLoadingSelector([
    "FETCH_USERS_WITH_PAGINATION",
  ]);
  const isFetchingUsers = useSelector((state) => fetchingUsersSelector(state));
  const { userList, pagination } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUsersWithPagination());
  }, [dispatch]);

  const handleChangePagination = (e, page) => {
    dispatch(fetchUsersWithPagination({ soTrang: page }));
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
                          onClick={() => console.log("edit user")}
                        >
                          <LaunchIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete" arrow>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => console.log("delete user")}
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
    </>
  );
};

export default ManageUsers;

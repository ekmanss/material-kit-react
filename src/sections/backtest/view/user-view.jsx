import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useBacktests } from 'src/hooks/useBacktests';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';
import EditBacktestModal from '../edit-backtest-modal';

export default function UserPage() {
  const { kolId } = useParams();
  const {
    data,
    isLoading,
    isError,
    error,
    updateBacktest,
    deleteBacktest,
    isUpdating,
    isDeleting,
    updateSuccess,
    deleteSuccess,
    updateError,
    deleteError
  } = useBacktests(kolId);

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingBacktest, setEditingBacktest] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingBacktestId, setDeletingBacktestId] = useState(null);

  useEffect(() => {
    if (updateSuccess) {
      setSnackbar({ open: true, message: 'Backtest updated successfully!', severity: 'success' });
    }
    if (deleteSuccess) {
      setSnackbar({ open: true, message: 'Backtest deleted successfully!', severity: 'success' });
    }
    if (updateError || deleteError) {
      let errorMessage = 'Error occurred';
      const currentError = updateError || deleteError;
      if (currentError.response && currentError.response.data) {
        const { error: api_error, message: api_message } = currentError.response.data;
        errorMessage = `${errorMessage}: ${api_error}. ${api_message}`;
      } else if (currentError.message) {
        errorMessage = `${errorMessage}: ${currentError.message}`;
      }
      setSnackbar({ open: true, message: errorMessage, severity: 'error' });
    }
  }, [updateSuccess, deleteSuccess, updateError, deleteError]);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = data.kol_backtest_results.map((n) => n.token_name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleEditClick = (backtest) => {
    setEditingBacktest(backtest);
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setEditingBacktest(null);
  };

  const handleUpdateBacktest = (updatedBacktest) => {
    updateBacktest(updatedBacktest);
  };

  const handleDeleteClick = (id) => {
    setDeletingBacktestId(id);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (deletingBacktestId) {
      deleteBacktest(deletingBacktestId);
      setDeleteDialogOpen(false);
      setDeletingBacktestId(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setDeletingBacktestId(null);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  if (isLoading) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }

  if (isError) {
    return (
      <Container>
        <Alert severity="error">Error loading data: {error.message}</Alert>
      </Container>
    );
  }

  const backtests = data?.kol_backtest_results || [];

  const dataFiltered = applyFilter({
    inputData: backtests,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Back Test Data</Typography>
        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
          New Back Test
        </Button>
      </Stack>

      <Card>
        <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={backtests.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'token_name', label: 'Token Name' },
                  { id: 'token_address', label: 'Token Address' },
                  { id: 'call_price', label: 'Call Price' },
                  { id: 'current_price', label: 'Current Price' },
                  { id: 'more_change', label: 'More Change' },
                  { id: 'less_change', label: 'Less Change' },
                  { id: 'score', label: 'Score' },
                  { id: 'type', label: 'Type' },
                  { id: '', label: 'Actions' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <UserTableRow
                      key={row.id}
                      id={row.id}
                      token_name={row.token_name}
                      token_address={row.token_address}
                      token_logo={row.token_logo}
                      call_price={row.call_price}
                      current_price={row.current_price}
                      more_change={row.more_change}
                      less_change={row.less_change}
                      score={row.score}
                      type={row.type}
                      selected={selected.indexOf(row.token_name) !== -1}
                      handleClick={(event) => handleClick(event, row.token_name)}
                      onEditClick={() => handleEditClick(row)}
                      onDeleteClick={() => handleDeleteClick(row.id)}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, backtests.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={backtests.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>

      <EditBacktestModal
        open={editModalOpen}
        handleClose={handleCloseEditModal}
        backtest={editingBacktest}
        onUpdate={handleUpdateBacktest}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>

      {(isUpdating || isDeleting) && (
        <CircularProgress
          size={24}
          sx={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            marginTop: '-12px',
            marginLeft: '-12px',
          }}
        />
      )}

      <Dialog
        open={deleteDialogOpen}
        onClose={handleCancelDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Confirm Deletion'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this backtest? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
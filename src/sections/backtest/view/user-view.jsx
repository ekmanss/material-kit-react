import { useState } from 'react';
import { useParams } from 'react-router-dom';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
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
import AddBacktestModal from '../add-backtest-modal';
import UploadExcelModal from '../upload-excel-modal'; // 新增的导入
import GetPriceModal from '../get-price-modal';

export default function UserPage() {
  const { kolId } = useParams();
  const {
    data,
    isLoading,
    isError,
    error,
    updateBacktest,
    deleteBacktest,
    createBacktest,
    uploadBacktestResults, // 新增的导入
    isUpdating,
    isDeleting,
    isCreating,
  } = useBacktests(kolId);

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingBacktest, setEditingBacktest] = useState(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false); // 新增的状态
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingBacktestId, setDeletingBacktestId] = useState(null);
  const [getPriceModalOpen, setGetPriceModalOpen] = useState(false);

  const handleGetPriceClick = () => {
    setGetPriceModalOpen(true);
  };

  const handleCloseGetPriceModal = () => {
    setGetPriceModalOpen(false);
  };

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = backtests.map((n) => n.token_name);
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

  const handleUpdateBacktest = async (updatedBacktest) => {
    try {
      await updateBacktest(updatedBacktest);
      setEditModalOpen(false);
      setSnackbar({ open: true, message: 'Backtest updated successfully!', severity: 'success' });
    } catch (error) {
      setSnackbar({ open: true, message: `Error updating backtest: ${error.message}`, severity: 'error' });
    }
  };

  const handleDeleteClick = (id) => {
    setDeletingBacktestId(id);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (deletingBacktestId) {
      try {
        await deleteBacktest(deletingBacktestId);
        setDeleteDialogOpen(false);
        setDeletingBacktestId(null);
        setSnackbar({ open: true, message: 'Backtest deleted successfully!', severity: 'success' });
      } catch (error) {
        setSnackbar({ open: true, message: `Error deleting backtest: ${error.message}`, severity: 'error' });
      }
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

  const handleAddClick = () => {
    setAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setAddModalOpen(false);
  };

  const handleAddBacktest = async (newBacktest) => {
    try {
      await createBacktest(newBacktest);
      setAddModalOpen(false);
      setSnackbar({ open: true, message: 'Backtest created successfully!', severity: 'success' });
    } catch (error) {
      setSnackbar({ open: true, message: `Error creating backtest: ${error.message}`, severity: 'error' });
    }
  };

  const handleUploadClick = () => {
    setUploadModalOpen(true);
  };

  const handleCloseUploadModal = () => {
    setUploadModalOpen(false);
  };

  const handleUploadSuccess = (message) => {
    setSnackbar({ open: true, message, severity: 'success' });
    setUploadModalOpen(false);
  };

  const handleUploadError = (message) => {
    setSnackbar({ open: true, message, severity: 'error' });
  };

  const handleUploadExcel = async (formData) => {
    try {
      await uploadBacktestResults(formData);
      handleUploadSuccess('File uploaded successfully.');
    } catch (error) {
      handleUploadError(`Error uploading file: ${error.message}`);
    }
  };

  if (isLoading) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }

  const backtests = (isError && error?.response?.status === 404) ? [] : (data?.kol_backtest_results || []);

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
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={handleAddClick}
        >
          New Back Test
        </Button>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Iconify icon="eva:upload-fill" />}
          onClick={handleUploadClick}
        >
          Upload Excel
        </Button>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<Iconify icon="eva:pricetags-fill" />}
          onClick={handleGetPriceClick}
        >
          Get Price
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
                  { id: 'time_stamp', label: 'Backtest Time' },
                  { id: 'stage_time', label: 'Stage Time' },
                  { id: 'call_time', label: 'Call Time' },
                  { id: 'high_time', label: 'Highest Price Time' },
                  { id: 'low_time', label: 'Lowest Price Time' },
                  { id: 'call_price', label: 'Call Price ($)' },
                  { id: 'high_price', label: 'Highest Price ($)' },
                  { id: 'low_price', label: 'Lowest Price ($)' },
                  { id: 'more_change', label: 'Increase (0~1)' },
                  { id: 'less_change', label: 'Decrease (0~1)' },
                  { id: 'harvest_duration', label: 'Harvest Duration' },
                  { id: 'current_price', label: 'Current Price ($)' },
                  { id: 'current_marketcap', label: 'Current Market Cap ($)' },
                  { id: 'score', label: 'Score' },
                  { id: 'type', label: 'Type' },
                  { id: 'btc_more_change', label: 'BTC Increase (0~1)' },
                  { id: '', label: 'Actions' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <UserTableRow
                      key={row.id}
                      kol_id={row.kol_id}
                      token_name={row.token_name}
                      token_address={row.token_address}
                      token_logo={row.token_logo}
                      time_stamp={row.time_stamp}
                      stage_time={row.stage_time}
                      call_time={row.call_time}
                      high_time={row.high_time}
                      low_time={row.low_time}
                      call_price={row.call_price}
                      high_price={row.high_price}
                      low_price={row.low_price}
                      more_change={row.more_change}
                      less_change={row.less_change}
                      harvest_duration={row.harvest_duration}
                      current_price={row.current_price}
                      current_marketcap={row.current_marketcap}
                      score={row.score}
                      type={row.type}
                      btc_more_change={row.btc_more_change}
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

      <AddBacktestModal
        open={addModalOpen}
        handleClose={handleCloseAddModal}
        onAdd={handleAddBacktest}
        kolId={kolId}
      />

      <UploadExcelModal
        open={uploadModalOpen}
        handleClose={handleCloseUploadModal}
        onSuccess={handleUploadSuccess}
        onError={handleUploadError}
      />

      <GetPriceModal
        open={getPriceModalOpen}
        handleClose={handleCloseGetPriceModal}
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

      {(isUpdating || isDeleting || isCreating) && (
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
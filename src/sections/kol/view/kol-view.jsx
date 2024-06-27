import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useKols } from 'src/hooks/useKols';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import AddKolModal from '../AddKolModal';
import TableNoData from '../table-no-data';
import EditKolModal from '../edit-kol-modal';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

export default function KolPage() {
  const {
    data,
    isLoading,
    isError,
    error,
    updateKol,
    deleteKol,
    createKol,
    isUpdating,
    isDeleting,
    isCreating,
    updateSuccess,
    deleteSuccess,
    createSuccess,
    updateError,
    deleteError,
    createError,
  } = useKols();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingKol, setEditingKol] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingKolId, setDeletingKolId] = useState(null);
  const [addModalOpen, setAddModalOpen] = useState(false);

  useEffect(() => {
    if (updateSuccess) {
      setSnackbar({ open: true, message: 'KOL updated successfully!', severity: 'success' });
    }
    if (deleteSuccess) {
      setSnackbar({ open: true, message: 'KOL deleted successfully!', severity: 'success' });
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

  useEffect(() => {
    if (createSuccess) {
      setSnackbar({ open: true, message: 'KOL created successfully!', severity: 'success' });
    }
    if (createError) {
      let errorMessage = 'Error occurred while creating KOL';
      if (createError.response && createError.response.data) {
        const { error: api_error, message: api_message } = createError.response.data;
        errorMessage = `${errorMessage}: ${api_error}. ${api_message}`;
      } else if (createError.message) {
        errorMessage = `${errorMessage}: ${createError.message}`;
      }
      setSnackbar({ open: true, message: errorMessage, severity: 'error' });
    }
  }, [createSuccess, createError]);

  const handleAddKol = (newKol) => {
    createKol(newKol);
  };

  const handleDeleteKol = (id) => {
    setDeletingKolId(id);
    setDeleteDialogOpen(true);
  };
  const handleConfirmDelete = () => {
    if (deletingKolId) {
      deleteKol(deletingKolId);
      setDeleteDialogOpen(false);
      setDeletingKolId(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setDeletingKolId(null);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  if (isLoading) {
    return (<Container>
      <CircularProgress />
    </Container>);
  }

  if (isError) {
    return (<Container>
      <Alert severity="error">Error loading data: {error.message}</Alert>
    </Container>);
  }

  const kols = data?.kols || [];

  const handleEditClick = (kol) => {
    setEditingKol(kol);
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setEditingKol(null);
  };

  const handleUpdateKol = (updatedKol) => {
    updateKol(updatedKol);
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
      const newSelecteds = kols.map((n) => n.name);
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
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
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

  const dataFiltered = applyFilter({
    inputData: kols, comparator: getComparator(order, orderBy), filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (<Container>
    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
      <Typography variant="h4">KOLs</Typography>

      <Button
        variant="contained"
        color="inherit"
        startIcon={<Iconify icon="eva:plus-fill" />}
        onClick={() => setAddModalOpen(true)}
      >
        New KOL
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
              rowCount={kols.length}
              numSelected={selected.length}
              onRequestSort={handleSort}
              onSelectAllClick={handleSelectAllClick}
              headLabel={[{ id: 'name', label: 'Name' }, { id: 'twitter', label: 'Twitter' }, {
                id: 'description', label: 'Description',
              }, { id: 'star', label: 'Star' }, { id: 'recommend', label: 'Recommend' }, {
                id: 'score', label: 'Score',
              }, { id: 'key_words', label: 'Key Words' }, { id: '', label: 'Actions' }]}
            />
            <TableBody>
              {dataFiltered
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (<UserTableRow
                  key={row.id}
                  name={row.name}
                  twitter={row.twitter}
                  description={row.description}
                  star={row.star}
                  recommend={row.recommend}
                  score={row.score}
                  photo={row.photo}
                  key_words={row.key_words}
                  selected={selected.indexOf(row.name) !== -1}
                  handleClick={(event) => handleClick(event, row.name)}
                  onEditClick={() => handleEditClick(row)}
                  onDeleteClick={() => handleDeleteKol(row.id)}
                />))}

              <TableEmptyRows
                height={77}
                emptyRows={emptyRows(page, rowsPerPage, kols.length)}
              />

              {notFound && <TableNoData query={filterName} />}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>

      <TablePagination
        page={page}
        component="div"
        count={kols.length}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[5, 10, 25]}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Card>

    <AddKolModal
      open={addModalOpen}
      handleClose={() => setAddModalOpen(false)}
      onAdd={handleAddKol}
    />

    <EditKolModal
      open={editModalOpen}
      handleClose={handleCloseEditModal}
      kol={editingKol}
      onUpdate={handleUpdateKol}
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
          Are you sure you want to delete this KOL? This action cannot be undone.
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
  </Container>);
}
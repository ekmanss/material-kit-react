import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

const getScoreColor = (score) => {
  if (score >= 80) return 'success';
  if (score >= 60) return 'warning';
  return 'error';
};

export default function UserTableRow({
                                       id,
                                       selected,
                                       twitter,
                                       name,
                                       description,
                                       star,
                                       recommend,
                                       score,
                                       photo,
                                       key_words,
                                       handleClick,
                                       onEditClick, // Add this prop
                                       onDeleteClick,
                                     }) {
  const [open, setOpen] = useState(null);
  const navigate = useNavigate();

  const handleRowClick = () => {
    navigate(`/kol/${id}/backtests`);
  };

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleEdit = () => {
    onEditClick(); // Call the edit function passed from the parent
    handleCloseMenu();
  };

  const handleDelete = () => {
    onDeleteClick(); // 不需要再传递 id，因为我们在父组件中已经处理了
    handleCloseMenu();
  };

  return (<>
    <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox disableRipple checked={selected} onChange={handleClick} />
      </TableCell>

      <TableCell component="th" scope="row" padding="none" onClick={handleRowClick} sx={{ cursor: 'pointer' }} >
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar alt={name} src={photo} />
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </Stack>
      </TableCell>

      <TableCell>{twitter}</TableCell>
      <TableCell>{description}</TableCell>
      <TableCell>{star}</TableCell>
      <TableCell>{recommend}</TableCell>
      <TableCell>
        <Label color={getScoreColor(Number(score))}>
          {score}
        </Label>
      </TableCell>
      <TableCell>{key_words.join(', ')}</TableCell>

      <TableCell align="right">
        <IconButton onClick={handleOpenMenu}>
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>
      </TableCell>
    </TableRow>

    <Popover
      open={!!open}
      anchorEl={open}
      onClose={handleCloseMenu}
      anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      PaperProps={{
        sx: { width: 140 },
      }}
    >
      <MenuItem onClick={handleEdit}>
        <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
        Edit
      </MenuItem>

      <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
        <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
        Delete
      </MenuItem>
    </Popover>
  </>);
}

UserTableRow.propTypes = {
  id: PropTypes.number.isRequired,
  selected: PropTypes.bool,
  twitter: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  star: PropTypes.string,
  recommend: PropTypes.string,
  score: PropTypes.string,
  photo: PropTypes.string,
  key_words: PropTypes.arrayOf(PropTypes.string),
  handleClick: PropTypes.func,
  onEditClick: PropTypes.func, // Add this prop type
  onDeleteClick: PropTypes.func,
};
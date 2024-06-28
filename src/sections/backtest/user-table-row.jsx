import { useState } from 'react';
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

export default function UserTableRow({
                                       selected,
                                       token_name,
                                       token_address,
                                       token_logo,
                                       call_price,
                                       current_price,
                                       more_change,
                                       less_change,
                                       score,
                                       type,
                                       handleClick,
                                       onEditClick,
                                       onDeleteClick,
                                     }) {
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleEdit = () => {
    onEditClick();
    handleCloseMenu();
  };

  const handleDelete = () => {
    onDeleteClick();
    handleCloseMenu();
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={token_name} src={token_logo} />
            <Typography variant="subtitle2" noWrap>
              {token_name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{token_address}</TableCell>
        <TableCell>{call_price}</TableCell>
        <TableCell>{current_price}</TableCell>
        <TableCell>{more_change}</TableCell>
        <TableCell>{less_change}</TableCell>
        <TableCell>{score}</TableCell>

        <TableCell>
          <Label color={(type === 'meme' && 'success') || 'info'}>{type}</Label>
        </TableCell>

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
    </>
  );
}

UserTableRow.propTypes = {
  selected: PropTypes.bool,
  token_name: PropTypes.string,
  token_address: PropTypes.string,
  token_logo: PropTypes.string,
  call_price: PropTypes.string,
  current_price: PropTypes.string,
  more_change: PropTypes.string,
  less_change: PropTypes.string,
  score: PropTypes.string,
  type: PropTypes.string,
  handleClick: PropTypes.func,
  onEditClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
};
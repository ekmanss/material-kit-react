import { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

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

const getScoreColor = (score) => {
  if (score >= 80) return 'success';
  if (score >= 60) return 'warning';
  return 'error';
};

export default function BacktestTableRow({
                                           id,
                                           selected,
                                           token_address,
                                           token_name,
                                           token_logo,
                                           time_stamp,
                                           call_time,
                                           high_time,
                                           low_time,
                                           call_price,
                                           high_price,
                                           low_price,
                                           more_change,
                                           less_change,
                                           harvest_duration,
                                           current_price,
                                           current_marketcap,
                                           score,
                                           type,
                                           btc_more_change,
                                           handleClick,
                                           onEditClick,
                                           onDeleteClick,
                                         }) {
  const [open, setOpen] = useState(null);
  const navigate = useNavigate();

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

        <TableCell align="left">{token_address}</TableCell>
        <TableCell align="left">{new Date(call_time * 1000).toLocaleString()}</TableCell>
        <TableCell align="right">{call_price}</TableCell>
        <TableCell align="right">{current_price}</TableCell>
        <TableCell align="right">{more_change}</TableCell>
        <TableCell align="right">{less_change}</TableCell>
        <TableCell align="right">{harvest_duration}</TableCell>
        <TableCell align="right">{current_marketcap}</TableCell>
        <TableCell align="left">
          <Label color={getScoreColor(Number(score))}>{score}</Label>
        </TableCell>
        <TableCell align="left">{type}</TableCell>
        <TableCell align="right">{btc_more_change}</TableCell>

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

BacktestTableRow.propTypes = {
  id: PropTypes.number.isRequired,
  selected: PropTypes.bool,
  token_address: PropTypes.string,
  token_name: PropTypes.string,
  token_logo: PropTypes.string,
  time_stamp: PropTypes.number,
  call_time: PropTypes.number,
  high_time: PropTypes.number,
  low_time: PropTypes.number,
  call_price: PropTypes.string,
  high_price: PropTypes.string,
  low_price: PropTypes.string,
  more_change: PropTypes.string,
  less_change: PropTypes.string,
  harvest_duration: PropTypes.string,
  current_price: PropTypes.string,
  current_marketcap: PropTypes.string,
  score: PropTypes.string,
  type: PropTypes.string,
  btc_more_change: PropTypes.string,
  handleClick: PropTypes.func,
  onEditClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
};
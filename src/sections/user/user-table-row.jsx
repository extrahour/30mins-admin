import PropTypes from 'prop-types';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import {statusToColor} from "../../helpers/booking-status";

// ----------------------------------------------------------------------

export default function UserTableRow({
  name,
  date,
  status,
  serviceName,
  price,
  orderUuid,
  handleEdit,
}) {

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox">
        <TableCell>{name}</TableCell>
        <TableCell>{date}</TableCell>
        <TableCell>{serviceName}</TableCell>
        <TableCell>{price}€</TableCell>
        <TableCell>
          <Label color={statusToColor(status)}>{status}</Label>
        </TableCell>
        <TableCell align="right">
          <IconButton aria-label="edit" href={`https://glowlist.co/booking-review/${orderUuid}`} target="_blank">
            <Iconify icon="eva:edit-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      {/*<Popover*/}
      {/*  open={!!open}*/}
      {/*  anchorEl={open}*/}
      {/*  onClose={handleCloseMenu}*/}
      {/*  anchorOrigin={{ vertical: 'top', horizontal: 'left' }}*/}
      {/*  transformOrigin={{ vertical: 'top', horizontal: 'right' }}*/}
      {/*  PaperProps={{*/}
      {/*    sx: { width: 140 },*/}
      {/*  }}*/}
      {/*>*/}
      {/*  <MenuItem onClick={handleCloseMenu}>*/}
      {/*    <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />*/}
      {/*    Edit*/}
      {/*  </MenuItem>*/}
      {/*</Popover>*/}
    </>
  );
}

UserTableRow.propTypes = {
  avatarUrl: PropTypes.any,
  company: PropTypes.any,
  handleClick: PropTypes.func,
  isVerified: PropTypes.any,
  name: PropTypes.any,
  role: PropTypes.any,
  selected: PropTypes.any,
  status: PropTypes.string,
};

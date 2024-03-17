import PropTypes from 'prop-types';
import {MenuItem, Select} from "@mui/material";


// ----------------------------------------------------------------------

BookingDateFilter.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
};

const options = [
  {
    value: 'all',
    title: 'All bookings',
  },
  {
    value: 'upcoming',
    title: 'Upcoming bookings',
  },
  {
    value: 'past',
    title: 'Past bookings'
  }
];

export default function BookingDateFilter({onChange, value}) {
  return (
    <Select sx={{mx: 2}} onChange={onChange} value={value}>
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>{option.title}</MenuItem>
      ))}
    </Select>
  );
}
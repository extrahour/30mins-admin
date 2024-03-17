import {useContext, useEffect, useState} from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import BookingsTableRow from '../bookings-table-row';
import BookingsTableHead from '../bookings-table-head';
import TableEmptyRows from '../table-empty-rows';
import BookingsTableToolbar from '../bookings-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';
import {SessionContext} from "../../../app";
import {supabase} from "../../../supabaseClient";
import moment from "moment";

// ----------------------------------------------------------------------

export default function UserPage() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('date');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [bookingDateFilter, setBookingDateFilter] = useState('upcoming');

  const session = useContext(SessionContext);

  useEffect(() => {
    let ignore = false
    async function getBookings() {
      setLoading(true)
      // const { user } = session

      const { data, error } = await supabase
        .from('bookings')
        .select('*, salon_services (title, price)')
      // console.log('bookings', data);

      if (!ignore) {
        if (error) {
          console.warn(error)
        } else if (data) {
          const flatBookings = data.map(x => ({
            id: x.id,
            name: x.name,
            date: `${x.date} ${x.startTime} - ${x.endTime}`,
            startTimeMoment: moment(`${x.date} ${x.startTime}`, 'YYYY-MM-DD, hh:mm'),
            serviceName: x.salon_services.title,
            price: x.salon_services.price,
            status: x.status,
            orderUuid: x.uuid,
          }))
          setBookings(flatBookings);
        }
      }

      setLoading(false)
    }
    getBookings()

    return () => {
      ignore = true
    }
  }, [session])

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    // if (event.target.checked) {
    //   const newSelecteds = users.map((n) => n.name);
    //   setSelected(newSelecteds);
    //   return;
    // }
    // setSelected([]);
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
        selected.slice(selectedIndex + 1)
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

  const dataFiltered = applyFilter({
    inputData: bookings,
    comparator: getComparator(order, orderBy),
    filterName,
    bookingDateFilter
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Bookings</Typography>
      </Stack>

      <Card>
        <BookingsTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
          onBookingDateFilterChange={(event) => setBookingDateFilter(event.target.value)}
          bookingDateFilter={bookingDateFilter}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <BookingsTableHead
                order={order}
                orderBy={orderBy}
                rowCount={bookings.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'name', label: 'Name' },
                  { id: 'date', label: 'Date' },
                  { id: 'serviceName', label: 'Service' },
                  { id: 'price', label: 'Price' },
                  { id: 'status', label: 'Status' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <BookingsTableRow
                      key={row.id}
                      name={row.name}
                      date={row.date}
                      serviceName={row.serviceName}
                      price={row.price}
                      status={row.status}
                      orderUuid={row.orderUuid}
                      handleClick={(event) => handleClick(event, row.name)}
                    />
                  ))}

                {/*<TableEmptyRows*/}
                {/*  height={77}*/}
                {/*  emptyRows={emptyRows(page, rowsPerPage, bookings.length)}*/}
                {/*/>*/}

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={dataFiltered.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}

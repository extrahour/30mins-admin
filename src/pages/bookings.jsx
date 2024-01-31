import { Helmet } from 'react-helmet-async';

import { BookingsView } from 'src/sections/bookings/view';

// ----------------------------------------------------------------------

export default function BookingsPage() {
  return (
    <>
      <Helmet>
        <title> Bookings | Glowlist </title>
      </Helmet>

      <BookingsView />
    </>
  );
}

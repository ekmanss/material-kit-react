import { Helmet } from 'react-helmet-async';

import { KolView } from 'src/sections/kol/view';

// ----------------------------------------------------------------------

export default function KolPage() {
  return (
    <>
      <Helmet>
        <title> Kol | Minimal UI </title>
      </Helmet>

      <KolView />
    </>
  );
}

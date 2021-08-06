import Layout from '../Layout';
import AddLocationForm from '../AddLocationForm';

import { LocationProvider } from '../context';
import ReviewMap from '../ReviewMap';

const App = (): JSX.Element => {
  return (
    <Layout>
      <LocationProvider>
        <AddLocationForm />
        <ReviewMap />
      </LocationProvider>
    </Layout>
  );
};

export default App;

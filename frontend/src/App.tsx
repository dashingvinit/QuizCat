import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-react';
import { BrowserRouter } from 'react-router-dom';

import Layout from './layout/Layout';
import Pages from './pages/pages';
import Home from './pages/Home';

const PUBLISHABLE_KEY = 'pk_test_cmlnaHQtZ2F0b3ItMTIuY2xlcmsuYWNjb3VudHMuZGV2JA';

function App() {
  return (
    <div className="App">
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <BrowserRouter>
          <SignedOut>
            <Home />
          </SignedOut>
          <SignedIn>
            <Layout>
              <Pages />
            </Layout>
          </SignedIn>
        </BrowserRouter>
      </ClerkProvider>
    </div>
  );
}

export default App;

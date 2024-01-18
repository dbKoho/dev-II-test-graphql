import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { CssBaseline } from '@mui/material';

import Homepage from './pages/Home';
import PokemonType from './pages/PokemonType';
import PokemonDetail from './pages/PokemonDetail';

const client = new ApolloClient({
  uri: 'https://flyby-router-demo.herokuapp.com/',
  cache: new InMemoryCache(),
});

const root = createRoot(document.getElementById('app'));

root.render(
  <StrictMode>
    <ApolloProvider client={client}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/types/:type" element={<PokemonType />} />
          <Route path="/pokemon/:id" element={<PokemonDetail />} />
          <Route path="*" element={<h1>Route not found</h1>} />
        </Routes>
      </Router>
    </ApolloProvider>
  </StrictMode>
);

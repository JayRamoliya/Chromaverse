import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import PalettePage from './pages/PalettePage';
import CreatePalettePage from './pages/CreatePalettePage';
import GeneratePage from './pages/GeneratePage';
import FavoritesPage from './pages/FavoritesPage';
import TrendingPage from './pages/TrendingPage';
import NotFoundPage from './pages/NotFoundPage';
import { ThemeProvider } from './context/ThemeContext';
import { PaletteProvider } from './context/PaletteContext';

function App() {
  return (
    <ThemeProvider>
      <PaletteProvider>
        <BrowserRouter>
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 2000,
              style: {
                borderRadius: '8px',
                background: '#333',
                color: '#fff',
              },
            }}
          />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="search" element={<SearchPage />} />
              <Route path="palette/:id" element={<PalettePage />} />
              <Route path="create" element={<CreatePalettePage />} />
              <Route path="generate" element={<GeneratePage />} />
              <Route path="favorites" element={<FavoritesPage />} />
              <Route path="trending" element={<TrendingPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </PaletteProvider>
    </ThemeProvider>
  );
}

export default App;
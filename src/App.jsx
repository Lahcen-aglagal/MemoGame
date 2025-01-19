import { useState } from 'react';
import './App.css';
import { routes } from './routes';
import { Route, Routes } from 'react-router-dom';

function App() {
  const GetRoutes = (routes) => {
    return routes.map((route) => {
      if (route.route) {
        return (
          <Route
            key={route.key}
            path={route.path}
            element={<route.component />}
            exact={route.exact}
          />
        );
      }
      if (route.children) {
        return GetRoutes(route.children);
      }
      return null; 
    });
  };

  return (
    <Routes>
      {GetRoutes(routes)}
      <Route path="*" element={<div>404 - Page Not Found</div>} />
    </Routes>
  );
}

export default App;

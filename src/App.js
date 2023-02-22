import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Home } from './components/Home';
import { ProtectedRoute } from './components/ProtectedRoute';

import { AuthProvider } from './context/AuthContext';
import { TasksContextProvider } from './context/TasksContext';

function App() {
  return (
    <div className='bg-zinc-900 h-screen flex text-white'>
      <AuthProvider>
        <TasksContextProvider>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route
              path='/'
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path='/register' element={<Register />} />
          </Routes>
        </TasksContextProvider>
      </AuthProvider>
    </div>
  );
}

export default App;

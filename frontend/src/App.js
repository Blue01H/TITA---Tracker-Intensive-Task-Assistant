import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Client from './pages/Client';
import Contractor from './pages/Contractor';
import './App.css';

function App() {
  return (
      <Routes>
          <Route path='/' element={
            <Layout>
              <Homepage />
            </Layout>
          }/>
          <Route path='/login' element={
            <Layout>
              <Login />
            </Layout>
          }/>
          <Route path='/client'element={
            <Layout>
              <Client />
            </Layout>
          }/>
          <Route path='/contractor' element={
            <Layout>
              <Contractor />
            </Layout>
          }/>
          <Route path='*' element={
            <Navigate to='/' />
          }/>
        </Routes>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import AllUrls from './components/AllUrls';

const MainRouter = () => (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="admin" element={<AllUrls />} />
          {/* <Route index element={<Home />} /> */}
          {/* <Route path="contact" element={<Contact />} />
          <Route path="user/:userId" element={<User />} /> */}
      </Routes>
    </Router>
);

export default MainRouter;
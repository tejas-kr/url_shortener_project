import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';

const MainRouter = () => (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          {/* <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="user/:userId" element={<User />} /> */}
        </Route>
      </Routes>
    </Router>
);

export default MainRouter;
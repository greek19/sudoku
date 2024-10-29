import {
    Routes,
    Route,
    Link } from 'react-router-dom';
import HomePage from "../pages/HomePage";
import NoMatch from "../pages/NoMatch";

export default function AppLayout() {
  
    return (
      <>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </>
    );
  }
import React, { Fragment } from "react";
import './Searchbar.css';
import { TextField } from '@mui/material';;


const Searchbar = () => {
//   const guestLinks = (
//     <ul>
//       <li>
//         <Link to="/">
//           <Button className="btn btn-primary createNew">Create New</Button>
//         </Link>
//       </li>
//       <li>
//         <Link to="/about">
//           <Button className="btn btn-danger signOut">Sign out</Button>
//         </Link>
//       </li>
//     </ul>
//   );
  return (
    <nav className="navbar">
      <TextField fullWidth id="outlined-basic" label="City Search" variant="outlined" className="searchField"/>
    </nav>
  );
};

export default Searchbar;
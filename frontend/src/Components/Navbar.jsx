import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
function Navbar()
{
  const [search, setSearch] = useState("");
const navigate = useNavigate();
 const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim() !== "") {
        navigate(`/search/${search}`);
    }
};
    return(
        <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <NavLink to='/home' className="navbar-brand fst-italic fw-bold text-primary ">AskAnything</NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavDropdown">
      <ul className="navbar-nav ms-auto">
        <li className="nav-item">
         <NavLink to='/home' className="nav-link text-primary">Home</NavLink>
        </li>
        <li className="nav-item">
         <NavLink to='/questions' className="nav-link text-primary">Ask Questions</NavLink>
        </li>
         <li className="nav-item">
         <NavLink to='/profile' className="nav-link text-primary">Profile</NavLink>
        </li>
        <li className="nav-item dropdown">
           <button className="btn  dropdown-toggle btn-outline-primary me-2" type="button" data-bs-toggle="dropdown" aria-expanded="false">
   Categories
  </button>
          <ul className="dropdown-menu">
            <li className="nav-item"><NavLink to='/categories/1' className="dropdown-item text-primary"  
            className={({ isActive }) =>isActive? "dropdown-item active text-white bg-primary": "dropdown-item text-primary" }> Programming </NavLink></li>
            <li className="nav-item"><NavLink to='/categories/2' className="dropdown-item text-primary"  className={({ isActive }) =>isActive? "dropdown-item active text-white bg-primary": "dropdown-item text-primary" }>Web Development </NavLink></li>
            <li className="nav-item"><NavLink to='/categories/4' className="dropdown-item text-primary"  className={({ isActive }) =>isActive? "dropdown-item active text-white bg-primary": "dropdown-item text-primary" }>Artificial Intelligence</NavLink></li>
            <li className="nav-item"><NavLink to='/categories/8'className="dropdown-item text-primary"  className={({ isActive }) =>isActive? "dropdown-item active text-white bg-primary": "dropdown-item text-primary" }>Career</NavLink></li>
            <li className="nav-item"><NavLink  to='/categories/7'className="dropdown-item text-primary"  className={({ isActive }) =>isActive? "dropdown-item active text-white bg-primary": "dropdown-item text-primary" } >Database</NavLink></li>
            <li className="nav-item"><NavLink  to='/categories/3' className="dropdown-item text-primary"  className={({ isActive }) =>isActive? "dropdown-item active text-white bg-primary": "dropdown-item text-primary" }>Mobille Development</NavLink></li>
          </ul>
        </li>
      </ul>
      <form   onSubmit={handleSearch}className="d-flex" role="search">
        <input  value={search} onChange={(e) => setSearch(e.target.value)} className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button  className="btn btn-outline-primary " type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>
        </>
    )
}
export default Navbar;

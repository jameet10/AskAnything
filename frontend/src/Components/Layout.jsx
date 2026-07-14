import {useLocation } from 'react-router-dom'
import Navbar from "./Navbar"
function Layout({children})
{
      const location = useLocation();
    const hideNavbar= location.pathname==='/';
    return(
    <>
     {!hideNavbar && <Navbar/>}
    <main>{children}</main>
        </>)
}
export default Layout




 

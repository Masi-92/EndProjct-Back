import CameraIndoorOutlinedIcon from "@mui/icons-material/CameraIndoorOutlined";
import FavoriteSharpIcon from "@mui/icons-material/FavoriteSharp";
import LogoutSharpIcon from '@mui/icons-material/LogoutSharp';
import ShoppingCartSharpIcon from "@mui/icons-material/ShoppingCartSharp";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import style from "./Layout.module.scss";

const Layout = () => {
  const location = useLocation();
  
  function handleLogout() {
    localStorage.removeItem("token")
    window.location.reload();
}

  return (
    <div className={style.layout}>
      <header className={style.header}>
        <nav>
          <ul>
            <li>
              <NavLink to="/app/movies" className={location.pathname === "/app/movies" ? style.active : ""}>
                <CameraIndoorOutlinedIcon style={{ color: location.pathname === "/app/movies" ? "#ff0" : "gray" }} />
              </NavLink>
            </li>
            <li>
              <NavLink to="/app/favorites" className={location.pathname === "/app/favorites" ? style.active : ""}>
                <FavoriteSharpIcon style={{ color: location.pathname === "/app/favorites" ? "#ff0" : "gray" }} />
              </NavLink>
            </li>
            <li>
            {/*   <Badge badgeContent={"5"} color="error">
              </Badge> */}
                <NavLink to="/app/buy" className={location.pathname === "/app/buy" ? style.active : ""}>
                  <ShoppingCartSharpIcon style={{ color: location.pathname === "/app/buy" ? "#ff0" : "gray" }} />
                </NavLink>
              <div className={style.logOout}><button className={style.logOoutButoon} onClick={handleLogout}><LogoutSharpIcon/></button></div>
        
            </li>
          </ul>
        </nav>
      </header>
      <main className={style.main}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;

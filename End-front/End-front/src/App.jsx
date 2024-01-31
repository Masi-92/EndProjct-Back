import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import Layout from "./component/layout/Layout";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Movies from "./pages/movies/movies.jsx";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FavMovies from "./pages/favMovies/favMovies.jsx";
import BuyMovie from "./pages/buyMovie/BuyMovie.jsx";
import EditMovie from "./pages/editMovie/editMovie.jsx";

function App() {
// um token in boolean zu ändern  
    // const token = !!localStorage.getItem("token")
    const token = localStorage.getItem("token")

    return (
        <Router>
            <Routes>
                <Route path="/register" element={token ? <Navigate to="/"/> : <Register/>}/>
                <Route path="/login" element={token ? <Navigate to="/"/> : <Login/>}/>
               {/*if token  is ok then to app else <Login/>  */}
                <Route path="/app/*" element={!token ? <Navigate to="/login"/> : <Layout/>}>
                    <Route path="movies" element={<Movies/>}></Route>
                    <Route path="favorites" element={<FavMovies/>}></Route>
                    <Route path="buy" element={<BuyMovie/>}></Route>
                    <Route path="editMovie/:id" element={<EditMovie/>}></Route>
                    <Route path="*" element={<Navigate to="/app/movies"/>}></Route>
                </Route>
                <Route path="*" element={<Navigate to="/app"/>}/>
            </Routes>
            <ToastContainer/>
        </Router>
    );
}

export default App;

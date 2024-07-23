import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import {
    BrowserRouter as Router,
    Route,
    Routes,
    redirect,
} from "react-router-dom";
import { publicRoutes, privateRoutes } from "./routes";

function App() {
    return (
        <Router>
            <div className="  App " style={{ width: "100%", height: "100%" }}>
                <Routes>
                    {publicRoutes.map((route, index) => {
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={<route.component />}
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}
export default App;
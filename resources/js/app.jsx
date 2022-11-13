import "./bootstrap";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import WebRoute from "./routes/WebRoute";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import store from "./app/store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <WebRoute />
            <ToastContainer />
        </BrowserRouter>
    </Provider>
);

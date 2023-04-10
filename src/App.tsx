import "./App.css";
import Home from "./pages/home/PublicHomeComponent";
import Login from "./pages/login/LoginComponent";
import Profile from "./pages/profile/ProfileComponent";
import Search from "./pages/search/SearchComponent";
import Details from "./pages/details/DetailComponent";
import RegisterScreen from "./pages/register/RegisterScreen";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/user-reducer";

function App() {
	const store = configureStore({
		reducer: {
			user: userReducer,
		},
	});

	return (
		<Provider store={store}>
			<div className="container-fluid">
				<BrowserRouter>
					<div className="container">
						<Routes>
							<Route path="/*" element={<Home />} />
							<Route path="/search/*" element={<Search />} />
							<Route path="/details/*" element={<Details />} />
							<Route path="/login/*" element={<Login />} />
							<Route path="/profile/*" element={<Profile />} />
							<Route
								path="/register/*"
								element={<RegisterScreen />}
							/>
						</Routes>
					</div>
				</BrowserRouter>
			</div>
		</Provider>
	);
}

export default App;

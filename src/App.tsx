import "./App.css";
import Home from "./pages/home/PublicHomeComponent";
import Login from "./pages/login/LoginComponent";
import ProfileScreen from "./pages/profile/ProfileScreen";
import SearchScreen from "./pages/search/SearchScreen.js";
import Details from "./pages/details/DetailComponent";
import RegisterScreen from "./pages/register/RegisterScreen";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/user-reducer";
import CourtScreen from "./pages/court/CourtScreen";
import PublicNavBar from "./navbar/PublicNavbar";
import CurrentUserContext from "./components/CurrentUserContext";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
	palette: {
		primary: {
			main: "#55EC55",
		},

		secondary: {
			main: "#00e676",
		},
	},
});

function App() {
	const store = configureStore({
		reducer: {
			user: userReducer,
		},
	});

	return (
		<Provider store={store}>
			<CurrentUserContext>
				<ThemeProvider theme={theme}>
					<div className="container-fluid">
						<BrowserRouter>
							<div className="container">
								<PublicNavBar />
								<Routes>
									<Route path="/*" element={<Home />} />
									<Route
										path="/search/*"
										element={<SearchScreen />}
									/>
									<Route
										path="/details/*"
										element={<Details />}
									/>
									<Route
										path="/login/*"
										element={<Login />}
									/>
									<Route
										path="/profile/*"
										element={<ProfileScreen />}
									/>
									<Route
										path="/register/*"
										element={<RegisterScreen />}
									/>
									<Route
										path="/court/:courtId"
										element={<CourtScreen />}
									/>
								</Routes>
							</div>
						</BrowserRouter>
					</div>
				</ThemeProvider>
			</CurrentUserContext>
		</Provider>
	);
}

export default App;

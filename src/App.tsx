import "./App.css";
import Home from "./pages/home/PublicHomeComponent";
import Login from "./pages/login/LoginComponent";
import ProfileScreen from "./pages/profile/ProfileScreen";
import SearchScreen from "./pages/search/SearchScreen.js";
import Details from "./pages/details/DetailComponent";
import RegisterScreen from "./pages/register/RegisterScreen";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/user-reducer";
import CourtScreen from "./pages/court/CourtScreen";
import PublicNavBar from "./navbar/PublicNavbar";
import CurrentUserContext from "./components/CurrentUserContext";
import PeopleScreen from "./pages/people/PeopleScreen";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MatchRequestScreen from "./pages/matchRequest/MatchRequestScreen";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CourtsScreen from "./pages/court/CourtsScreen";
import MatchesScreen from "./pages/matches/MatchesScreen";

const theme = createTheme({
	palette: {
		primary: {
			main: "#79f281",
		},

		secondary: {
			main: "#15e823",
		},
	},
});

function App() {
	const store = configureStore({
		reducer: {
			users: userReducer,
		},
	});

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
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
											path="/search/:zipCode"
											element={<SearchScreen />}
										/>
										<Route
											path="/search"
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
											path="/profile/:userId"
											element={<ProfileScreen />}
										/>
										<Route
											path="/profile"
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
										<Route
											path="/people"
											element={<PeopleScreen />}
										/>
										<Route
											path="/matchRequest/:username"
											element={<MatchRequestScreen />}
										/>
										<Route
											path="/courts"
											element={<CourtsScreen />}
										/>
										<Route
											path="/matches"
											element={<MatchesScreen />}
										/>
									</Routes>
								</div>
							</BrowserRouter>
						</div>
					</ThemeProvider>
				</CurrentUserContext>
			</Provider>
		</LocalizationProvider>
	);
}

export default App;

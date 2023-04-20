import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { loginThunk } from "../../services/users/users-thunk";
import {
	Grid,
	Button,
	FormControl,
	FormGroup,
	InputLabel,
	TextField,
	Typography,
} from "@mui/material";

function LoginScreen() {
	const { currentUser } = useSelector((state) => state.users);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const handleLogin = async () => {
		try {
			const response = await dispatch(loginThunk({ username, password }));
			const user = response.payload;
			localStorage.setItem("user", JSON.stringify(user));
			// console.log(user);
			navigate(`/`);
		} catch (err) {
			// console.log(err);
		}
	};
	return (
		<Grid container spacing={2} alignItems="center" justifyContent="center">
			<Grid item xs={8}>
				<Typography sx={{ mt: 1 }} variant="h4">
					Sign in
				</Typography>
				<FormGroup>
					<FormControl sx={{ mt: 1 }}>
						<TextField
							label="Username"
							value={username}
							onChange={(e) => {
								setUsername(e.target.value);
							}}
						/>
					</FormControl>
					<FormControl sx={{ mt: 1 }}>
						<TextField
							label="Password"
							value={password}
							onChange={(e) => {
								setPassword(e.target.value);
							}}
						/>
					</FormControl>
					<Button
						variant="contained"
						onClick={handleLogin}
						color="success"
					>
						Login
					</Button>
				</FormGroup>
			</Grid>
		</Grid>
	);
}

export default LoginScreen;

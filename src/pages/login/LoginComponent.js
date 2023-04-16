import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { loginThunk } from "../../services/users/users-thunk";

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
			console.log(user);
			navigate(`/profile/${user.username}`);
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<div>
			<h1>Login</h1>
			<div className="form-group">
				<label>Username</label>
				<input
					type="text"
					className="form-control"
					value={username}
					onChange={(e) => {
						setUsername(e.target.value);
					}}
				/>
			</div>
			<div className="form-group">
				<label>Password</label>
				<input
					type="password"
					className="form-control"
					value={password}
					onChange={(e) => {
						setPassword(e.target.value);
					}}
				/>
			</div>
			<button onClick={handleLogin} className="btn btn-primary">
				Login
			</button>
		</div>
	);
}

export default LoginScreen;

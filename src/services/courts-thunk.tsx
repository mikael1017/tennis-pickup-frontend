import { createAsyncThunk } from "@reduxjs/toolkit";
import * as service from "./courts-service";
import { Court } from "../models/Court";

export const findCourtsByCityThunk = createAsyncThunk(
	"courts/findCourtsByCity",
	async (city: String) => await service.findCourtsByCity(city)
);

export const findCourtsByZipThunk = createAsyncThunk(
	"courts/findCourtsByZip",
	async (zip: Number) => await service.findCourtsByZip(zip)
);

export const findCourtsByStateThunk = createAsyncThunk(
	"courts/findCourtsByState",
	async (state: String) => await service.findCourtsByState(state)
);

export const addCourtThunk = createAsyncThunk(
	"courts/addCourt",
	async (court: Court) => {
		const newCourt = await service.addCourt(court);
		return newCourt;
	}
);

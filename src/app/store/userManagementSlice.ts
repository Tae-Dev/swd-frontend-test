'use client';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum NameTitle {
  Mr = 'Mr.',
  Ms = 'Ms',
  Mrs = 'Mrs.',
}

export enum Gender {
  Male = 'Male',
  Female = 'Female',
  Unisex = 'Unisex',
}

export enum Nationality {
  Thai = 'Thai',
  French  = 'Female',
  American = 'American'
}

export interface CitizenIDState {
  part1: string;
  part2: string;
  part3: string;
  part4: string;
  part5: string;
}

 export interface FormData {
  title: NameTitle | null;
  firstName: string;
  lastName: string;
  birthday: string;
  nationality: Nationality | null;
  citizenId: CitizenIDState | null;
  gender: Gender | null;
  countryCode: number | null;
  mobilePhone: string;
  passportNo: number | null;
  expectedSalary: number | null
}

interface FormState {
  data: FormData[];
}

const initialState: FormState = {
  data: [],
};

const userManagementSlice = createSlice({
  name: "userManagement",
  initialState,
  reducers: {
    addData(state, action: PayloadAction<FormData>) {
      state.data.push(action.payload);
    },
    deleteData(state, action: PayloadAction<number>) {
      state.data.splice(action.payload, 1);
    },
  },
});

export const { addData, deleteData } = userManagementSlice.actions;
export default userManagementSlice.reducer;

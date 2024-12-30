"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum NameTitle {
  Mr = "Mr.",
  Ms = "Ms",
  Mrs = "Mrs.",
}

export enum Gender {
  Male = "Male",
  Female = "Female",
  Unisex = "Unisex",
}

export enum Nationality {
  Thai = "Thai",
  French = "Female",
  American = "American",
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
  expectedSalary: number | null;
}

interface FormState {
  data: FormData;
}

const initialState: FormState = {
  data: {
    title: null,
    firstName: "",
    lastName: "",
    birthday: "",
    nationality: null,
    citizenId: null,
    gender: null,
    countryCode: null,
    mobilePhone: "",
    passportNo: null,
    expectedSalary: null,
  },
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    addData(state, action: PayloadAction<FormData>) {
      state.data = action.payload;
      const existingList = JSON.parse(localStorage.getItem("formList") || "[]");
      const updatedList = [
        ...existingList,
        { ...action.payload, id: Date.now().toString() },
      ];
      localStorage.setItem("formList", JSON.stringify(updatedList));
    },
    removeData(state, action: PayloadAction<number>) {
      const existingList = JSON.parse(localStorage.getItem("formList") || "[]");
      if (existingList) {
        const filterList = existingList.filter(
          (exis: any, i: number) => i !== action.payload
        );
        localStorage.setItem("formList", JSON.stringify(filterList));
      }
    },
  },
});

export const { addData, removeData } = formSlice.actions;
export default formSlice.reducer;

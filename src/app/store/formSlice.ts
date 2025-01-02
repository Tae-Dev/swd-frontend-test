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
  id?: string;
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
    id: undefined,
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
    initData(state, action: PayloadAction) {
      state.data = initialState.data;
    },
    setData(state, action: PayloadAction<FormData>) {
      state.data = { ...action.payload };
    },
    addData(state, action: PayloadAction<FormData>) {
      const newData = { ...action.payload, id: Date.now().toString() };
      const existingList = JSON.parse(localStorage.getItem("formList") || "[]");
      const updatedList = [...existingList, newData];
      localStorage.setItem("formList", JSON.stringify(updatedList));
      state.data = initialState.data;
      alert("Save Success")
    },
    removeData(state, action: PayloadAction<string>) {
      const existingList = JSON.parse(localStorage.getItem("formList") || "[]");
      const filteredList = existingList.filter(
        (item: FormData) => item.id !== action.payload
      );
      localStorage.setItem("formList", JSON.stringify(filteredList));
      alert("Delete Success")
    },
    updateData(state, action: PayloadAction<FormData>) {
      const existingList = JSON.parse(localStorage.getItem("formList") || "[]");
      const updatedList = existingList.map((item: FormData) =>
        item.id == action.payload.id ? { ...item, ...action.payload } : item
      );
      localStorage.setItem("formList", JSON.stringify(updatedList));
      state.data = initialState.data;
      alert("Save Success")
    },
  },
});

export const { initData, setData, addData, updateData, removeData } =
  formSlice.actions;
export default formSlice.reducer;

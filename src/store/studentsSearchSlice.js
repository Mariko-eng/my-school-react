import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  allStudents: [],
  searchResults: [],
  studentsEnroll: [],
  isLoading: true,
  error: "",
  total: 0,
};

export const searchStudent = createAsyncThunk(
  "students/searchStudent",
  async ({ searchterm }, thunkAPI) => {
    console.log(searchterm);
    try {
      const url = `http://localhost:8000/basic/students-search-term-enrolls/${searchterm}/`;
      const resp = await axios.get(url);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const searchStudentByClass = createAsyncThunk(
  "students/searchStudentByClass",
  async ({ studentClass }, thunkAPI) => {
    try {
      const url = `http://localhost:8000/basic/students-search-class-term-enrolls/${studentClass}/`;
      const resp = await axios.get(url);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const searchStudentByClassAndName = createAsyncThunk(
  "students/searchStudentByClassAndName",
  async ({ searchterm, studentClass }, thunkAPI) => {
    try {
      const url = `http://localhost:8000/basic/students-search-class-name-term-enrolls/${searchterm}/${studentClass}/`;
      const resp = await axios.get(url);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const searchStudentByAlpabet = createAsyncThunk(
  "students/searchStudentByAlpabet",
  async (thunkAPI) => {
    try {
      const url = `http://localhost:8000/basic/students-search-sample-term-enrolls/`;
      const resp = await axios.get(url);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const studentsSearchSlice = createSlice({
  name: "studentsSearch",
  initialState,
  reducers: {
    addStudentEnrollList: (state, action) => {
      const newStudent = action.payload;
      // console.log(newStudent)
      if (state.studentsEnroll.length === 0) {
        state.studentsEnroll.push({
          id: newStudent.id,
          key: newStudent.key,
          student_id: newStudent.student_id,
          first_name: newStudent.first_name,
          given_name: newStudent.given_name,
          last_name: newStudent.last_name,
          student_class: newStudent.student_class,
          term_enrolls: newStudent.term_enrolls,
        });
      } else {
        const existingStudent = state.studentsEnroll.find(
          (item) => item.id === newStudent.id
        );
        if (existingStudent) {
          state.studentsEnroll = state.studentsEnroll.filter(
            (item) => item.id !== newStudent.id
          );
        } else {
          if (
            state.studentsEnroll[0].student_class === newStudent.student_class
          ) {
            state.studentsEnroll.push({
              id: newStudent.id,
              key: newStudent.key,
              student_id: newStudent.student_id,
              first_name: newStudent.first_name,
              given_name: newStudent.given_name,
              last_name: newStudent.last_name,
              student_class: newStudent.student_class,
              term_enrolls: newStudent.term_enrolls,
            });
          }
        }
      }
    },
    clearStudentsEnrollList: (state) => {
      state.studentsEnroll = [];
    },
  },
  extraReducers: {
    [searchStudent.pending]: (state) => {
      state.isLoading = true;
    },
    [searchStudent.fulfilled]: (state, action) => {
      state.isLoading = false;
      const data = action.payload;
      console.log(data);
      state.searchResults = data;
    },
    [searchStudent.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    [searchStudentByClass.pending]: (state) => {
      state.isLoadingCategories = true;
    },
    [searchStudentByClass.fulfilled]: (state, action) => {
      state.isLoading = false;
      const data = action.payload;
      state.searchResults = data;
    },
    [searchStudentByClass.rejected]: (state, action) => {
      state.isLoadingCategories = false;
      state.error = action.payload;
    },

    [searchStudentByClassAndName.pending]: (state) => {
      state.isLoadingSuppliers = true;
    },
    [searchStudentByClassAndName.fulfilled]: (state, action) => {
      state.isLoading = false;
      const data = action.payload;
      state.searchResults = data;
    },
    [searchStudentByClassAndName.rejected]: (state, action) => {
      state.isLoadingSuppliers = false;
      state.error = action.payload;
    },
    [searchStudentByAlpabet.pending]: (state) => {
      state.isLoadingSuppliers = true;
    },
    [searchStudentByAlpabet.fulfilled]: (state, action) => {
      state.isLoading = false;
      const data = action.payload;
      state.searchResults = data;
    },
    [searchStudentByAlpabet.rejected]: (state, action) => {
      state.isLoadingSuppliers = false;
      state.error = action.payload;
    },
  },
});

export const { addStudentEnrollList, clearStudentsEnrollList } =
  studentsSearchSlice.actions;

export default studentsSearchSlice.reducer;

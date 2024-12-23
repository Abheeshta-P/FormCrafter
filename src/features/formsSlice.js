import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const getFormsFromLocalStorage = (email) => {
  const storedData = JSON.parse(localStorage.getItem('forms')) || {};
  return storedData[email] || [];
};

const saveFormsToLocalStorage = (email, forms) => {
  const storedData = JSON.parse(localStorage.getItem('forms')) || {};
  storedData[email] = forms;
  localStorage.setItem('forms', JSON.stringify(storedData));
};

const formSlice = createSlice({
  name: 'forms',
  initialState: {
    email: '',
    forms: [], // Array of forms for the logged-in user
  },
  reducers: {
    initializeForms: (state, action) => {
      const { email } = action.payload;
      state.email = email;
      state.forms = getFormsFromLocalStorage(email);
    },
    addForm: (state, action) => {
      const newForm = action.payload;
      const formWithId = { id: uuidv4(), ...newForm }; // Add unique ID to the form
      state.forms.push(formWithId);
      saveFormsToLocalStorage(state.email, state.forms);
    },
    // For future use
    updateForm: (state, action) => {
      const { index, updatedForm } = action.payload;
      state.forms[index] = updatedForm;
      saveFormsToLocalStorage(state.email, state.forms);
    },
    // For future use
    deleteForm: (state, action) => {
      const { index } = action.payload;
      state.forms.splice(index, 1);
      saveFormsToLocalStorage(state.email, state.forms);
    },
    clearForms: (state) => {
      state.forms = [];
      saveFormsToLocalStorage(state.email, []);
    },
  },
});

export const { initializeForms, addForm, updateForm, deleteForm, clearForms } = formSlice.actions;

export default formSlice.reducer;

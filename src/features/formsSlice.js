import { createSlice } from '@reduxjs/toolkit';

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
      state.forms.push(newForm);
      saveFormsToLocalStorage(state.email, state.forms);
    },
    updateForm: (state, action) => {
      const { index, updatedForm } = action.payload;
      state.forms[index] = updatedForm;
      saveFormsToLocalStorage(state.email, state.forms);
    },
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

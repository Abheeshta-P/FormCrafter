const TempFormStorage = {
  // Method to add a field to the temporary form
  addToTempForm: (email, field) => {
    // Get the current temp form for this user (or an empty array if none exists)
    const tempForm = JSON.parse(localStorage.getItem(`tempForm_${email}`)) || [];

    // Add the new field to the form
    tempForm.push(field);

    // Save the updated form back to local storage
    localStorage.setItem(`tempForm_${email}`, JSON.stringify(tempForm));
  },

  // Method to delete a field from the temporary form
  deleteFromTempForm: (email, fieldIndex) => {
    // Get the current temp form
    const tempForm = JSON.parse(localStorage.getItem(`tempForm_${email}`)) || [];

    // Remove the field at the specified index
    tempForm.splice(fieldIndex, 1);

    // Save the updated form back to local storage
    localStorage.setItem(`tempForm_${email}`, JSON.stringify(tempForm));
  },

  // Method to get the temporary form fields for a user
  getTempForm: (email) => {
    // Get the temporary form data for the user
    return JSON.parse(localStorage.getItem(`tempForm_${email}`)) || [];
  },

  // Method to add a form name for the user
  addFormName: (email, formName) => {
    // Set the form name for the user
    localStorage.setItem(`formName_${email}`, formName);
  },

  // Method to delete the form name for the user
  deleteFormName: (email) => {
    // Remove the form name from local storage
    localStorage.removeItem(`formName_${email}`);
  },

  // Method to get the form name for the user
  getFormName: (email) => {
    // Get the stored form name for the user
    return localStorage.getItem(`formName_${email}`) || '';
  },

  // Method to clear the temporary form data (fields and name) for the user
  clearTempForm: (email) => {
    // Remove the temporary form data and name from local storage
    localStorage.removeItem(`tempForm_${email}`);
    localStorage.removeItem(`formName_${email}`);
  }
};

export default TempFormStorage;

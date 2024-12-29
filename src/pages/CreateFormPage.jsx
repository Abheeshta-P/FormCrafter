import React, { useEffect, useState } from 'react';
import { INPUT_FIELD_TYPES } from '../constants';
import { Button, Input, Select } from '../components';
import { addForm } from '../features/formsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { formCreationUtils } from '../util';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';  

function CreateFormPage() {
  const [newField, setNewField] = useState({
    type: '',
    label: '',
    name: '',
    required: false,
    options: [],
    minLength: '',
    maxLength: ''
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userEmail = useSelector(state => state.auth.userData?.email);
  const userForms = useSelector(state => state.forms.forms);
  const tempFormFields = formCreationUtils.getTempForm(userEmail);
  const tempFormName = formCreationUtils.getFormName(userEmail);
  const [fields, setFields] = useState(tempFormFields || []);
  const [formName, setFormName] = useState(tempFormName || '');
  const [options, setOptions ] = useState([]);
  const [stickyScrollerValue, setStickyScrollerValue] = useState(window.scrollY === 0 ? 'Bottom' : 'Top');

  useEffect(() => {
    // Function to update stickyScrollerValue on scroll
    const handleScroll = () => {
      setStickyScrollerValue(window.scrollY === 0 ? 'Bottom' : 'Top');
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    formCreationUtils.addFormName(userEmail,formName);
  },[formName])

  const handleFormCreation = () => {
    if (fields.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Form should contain at least 1 input field',
      });
      return;
    }
    if (!formName) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Form should contain a name',
      });
      return;
    }

    Swal.fire({
      title: 'Are you sure?',
      text: 'Once the form is finalized, it cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, finalize it!',
    }).then((result) => {
      if (result.isConfirmed) {
        // Add the form to backend ( here local storage ) or state
        dispatch(addForm({formName,fields}));

        // Clear temporary form data from local storage
        formCreationUtils.clearTempForm(userEmail);

        // Navigate to the dashboard
        navigate('/dashboard');

        // Show success alert after form creation
        Swal.fire(
          'Finalized!',
          'Your form has been finalized.',
          'success'
        );
      }
    });
  };

  const handleAddField = () => {
    if (!newField.type || !newField.label || !newField.name || ((newField.type === 'radio' || newField.type === 'dropdown' || newField.type === 'checkbox') && options.length === 0)) {
      alert("All fields are required to create a new input field");
      return;
    }
  
    const updatedField = { ...newField, options: options.filter(option => option !== '') };
  
    setNewField(updatedField);  // Update state with options

    // update the local storage to avoid losses of fields on refresh before finishing creation of form
    formCreationUtils.addToTempForm(userEmail, updatedField);
  
    // Update fields array
    setFields(prevFields => [...prevFields, updatedField]);
  
    // Reset form for new input
    setNewField({ type: '', label: '', name: '', required: false, options: [], minLength: '', maxLength: '' });
    setOptions([]);
  };
  
  const handleFormNameChange = (e) => {
    const newFormName = e.target.value;
    
    // Check if the form name already exists in the user's forms
    const isFormNameTaken = userForms.some(form => form.formName.toLowerCase() === newFormName.toLowerCase());
    
    if (isFormNameTaken) {
      // Show a message or an alert indicating the form name is already taken
      alert("This form name is already taken. Please choose a different name.");
    } else {
      // Set the new form name if it's not already taken
      setFormName(newFormName);
    }
  };


  const handleChange = (key, value) => {
    if (key === 'type') {
      // Reset the newField object but retain the type
      setNewField({ type: value, label: '', name: '', required: false, options: [], minLength: '', maxLength: '' });
      setOptions([]);
      return;
    }

    if(key === 'name'){
      const isFieldNameTaken = fields.some(field => field.name.toLowerCase() === value.toLowerCase());
      if (isFieldNameTaken) {
        alert(`This field name "${value}" is already taken. Please choose a different name.`);
        return;
      }
    }
    setNewField({ ...newField, [key]: value });
  };


  const handleAddOptionsFromInput = (value) => {
    if (value.trim() === '') {
      setOptions([]);  // Clear options if input is empty or only spaces
      return;
    }
    if(options.length===0) setOptions(options.push(value));
    const newOptions = value.split(',');
    setOptions(newOptions)
  };

  const removeField = (index) => {
    // Delete the field from the temporary form in local storage
    formCreationUtils.deleteFromTempForm(userEmail, index);
    const updatedFields = fields.filter((_, i) => i !== index);
    setFields(updatedFields);
  };

  const scrollTo = () => {
    // Check if the user is at the top or bottom of the page
    if (window.scrollY === 0) {
      // Scroll to the bottom of the page
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    } else {
      // Scroll to the top of the page
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  

  return (
    <div className="min-h-screen flex flex-col items-center p-8 pt-4">
      {/* Form Name */}
      <div className="w-full max-w-2xl mb-6">
        <Input label='Form Name *' placeholder='Enter form name' value = {formName}   onChange={handleFormNameChange} classNameInput='focus:outline-zinc-900'/>
      </div>

      {/* Form Preview of added fields with its label, type, name and options if applicable */}

      {/* Currently, only the delete option is implemented. 
      TODO: Add functionality for editing and dragging fields .*/}

      <div className="w-full max-w-2xl border p-6 rounded-lg bg-white mb-6">
        {fields.length === 0 ? (
          <p className="text-zinc-500">No fields yet</p>
        ) : (
         <>
          <p className="text-zinc-600 mb-2">Fields Selected</p>
          {
            fields.map((field, index) => (
              <div key={index} className="border p-4 rounded mb-4 relative">
                <p><strong>{field.label}</strong> ({field.type}) {field.required?<span className='text-red-700 ml-3'>Required</span>:null}</p>
                <p className="text-sm text-zinc-500">Name: {field.name}</p>
                {
                field.options.length!=0 ?
                <p  className="text-sm text-zinc-500">Options: {field.options.join(',')}</p>
                : null
                }
                <button onClick={() => removeField(index)} className="absolute top-2 right-2 text-red-700 hover:text-red-700"> Delete </button>
              </div>
            ))
          }
         </>
        )}
      </div>

      {/* Field Builder Section */}

      {/* TODO: Implement functionality to add nested inputs when creating a form. */}
      
      <div className="w-full max-w-2xl border p-6 rounded-lg bg-white shadow-md flex flex-col gap-5 border-black/20">
        <h2 className="text-lg md:text-xl font-semibold">Add New Field</h2>
        <form className="flex flex-col gap-4">
            <Select options={INPUT_FIELD_TYPES} defaultSelect='input type' label='Input Type' value={newField.type} onChange={(e) => handleChange('type', e.target.value)} required/>
            <div className='flex gap-3'>
            <Input label="Label" placeholder="Field Label" value={newField.label} onChange={(e) => handleChange('label', e.target.value)} classNameInput="focus:outline-zinc-900" required/>
            <Input label="Name (key)" placeholder="Unique Name" value={newField.name} onChange={(e) => handleChange('name', e.target.value)} classNameInput="focus:outline-zinc-900" required/>
            </div>
            <Input type='checkbox' label='Required' checked={newField.required} className='w-fit flex gap-2' classNameInput='inline w-5' classNameLabel='mb-0' onChange={(e) => handleChange('required', e.target.checked)} required/>

          {/* If the type of input is text then additional fields like min and max length is needed */}
          {newField.type === 'text' && (
            <div className='flex gap-3'>
              <Input label="Min Length" type="number" value={newField.minLength} onChange={(e) => handleChange('minLength', e.target.value)} classNameInput="focus:outline-zinc-900" placeholder="Minimum text length" required/>
              <Input label="Max Length" type="number" value={newField.maxLength} onChange={(e) => handleChange('maxLength', e.target.value)} classNameInput="focus:outline-zinc-900" placeholder="Maximum text length" required/>
            </div>
          )}

          {/* If the type of input is Radio/Checkbox/Dropdown options are required */}
          {(newField.type === 'radio' || newField.type === 'dropdown' || newField.type === 'checkbox') && (
          <div className="flex flex-col gap-2">
           <div className='flex gap-3 items-end justify-center '>
           <Input label='Options' value={options} onChange={(e) => handleAddOptionsFromInput(e.target.value)} placeholder="Enter options, separated by commas" />
           </div>
            <ul className="list-disc pl-5 mt-2">
              {options?.map((option, i) => (
                <li key={i}>{option}</li>
              ))}
            </ul>
          </div>
          )}
        </form>

        {/* Add the field to the Form */}
        <Button onClick={handleAddField}> Add Field </Button>
      </div>
      <Button onClick={handleFormCreation} className='mt-12' bgColor='bg-green-700'>Finalize form</Button>
      <button onClick={scrollTo} className="fixed bottom-5 right-5 bg-zinc-800 text-white px-2 py-1 text-sm font-semibold rounded-full shadow-lg scroller">Goto {stickyScrollerValue}</button>
    </div>
  );
}

export default CreateFormPage;

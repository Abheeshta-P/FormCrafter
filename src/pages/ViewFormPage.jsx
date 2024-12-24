import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Input, Select, Button, CheckboxGroup, RadioGroup } from '../components';
import Swal from 'sweetalert2';

function ViewFormPage() {
  const { id } = useParams();
  const forms = useSelector((state) => state.forms.forms);
  const form = forms.find(f => f.id === id);
  const { register, handleSubmit, watch, formState: { errors },reset } = useForm();

  const onSubmit = (data) => {
    console.log(JSON.stringify(data, null, 2));
    Swal.fire(
              'Submitted!',
              'Your form has been submitted. Check console!',
              'success'
    ).then(()=>{
      reset();
    })
  };

  // TODO: Improve the design by adding a custom 404 page or similar for better user experience.
  if (!form) return <p className="text-xl sm:text-2xl font-semibold text-zinc-800">Form not found</p>;

  // TODO: Add an option to share the form on the view form page (once backend unique URL is implemented).
  return (
    <div className="max-w-3xl mx-auto p-6 border border-black/10 min-h-[50vh] rounded-lg  bg-white">
      <h1 className="text-3xl sm:text-4xl font-bold text-center text-zinc-900 mb-12">{form.formName}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {form.fields.map((field, index) => (
          <div key={index} className="space-y-2">
            {field.type === 'radio' ? (
              <RadioGroup 
                label = {`${field.label}${field.required?' *':null}`}
                name = {field.name}
                options={field.options.map(opt => ({ label: opt, value: opt }))} 
                {...register(field.name, { required: field.required })} />
            ) : field.type === 'checkbox' ? (
              <CheckboxGroup 
                label = {`${field.label}${field.required?' *':null}`}
                name = {field.name}
                options={field.options.map(opt => ({ label: opt, value: opt }))} 
                {...register(field.name, { required: field.required })} />
            ) : field.type === 'dropdown' ? (
              <Select 
                label = {`${field.label}${field.required?' *':null}`}
                name = {field.name}
                options={field.options.map(opt => ({ label: opt, value: opt }))} 
                {...register(field.name, { required: field.required })} 
                defaultSelect={field.label} 
              />
            ) : field.type === 'text' ? (
              <Input 
                type={field.type} 
                label={`${field.label}${field.required?' *':null}`}
                {...register(field.name, { required: field.required })} 
                placeholder={field.label} 
                minLength = {field.minLength}
                maxLength = {field.maxLength}
                classNameInput="focus:ring-1 focus:ring-zinc-800" 
              />
              ) : field.type === 'email' ? (
                <Input 
                  type={field.type} 
                  label={`${field.label}${field.required?' *':null}`}
                  {...register(field.name, { required: field.required, validate: { matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Email address must be a valid address", } })} 
                  placeholder={field.label} 
                  minLength = {field.minLength}
                  maxLength = {field.maxLength}
                  classNameInput="focus:ring-1 focus:ring-zinc-800" 
                />
              ) :  <Input 
              type={field.type} 
              label={`${field.label}${field.required?' *':null}`}
              {...register(field.name, { required: field.required })} 
              placeholder={field.label} 
              classNameInput="focus:ring-1 focus:ring-zinc-800" 
            />
            }

            {errors[field.name] && (
              <p className="text-sm text-red-500">{field.label} is required</p>
            )}
          </div>
        ))}
        <div className='w-full flex justify-center'>
        <Button type="submit" className='px-6 py-2'>Submit</Button>
        </div>
      </form>
    </div>
  );
}

export default ViewFormPage;
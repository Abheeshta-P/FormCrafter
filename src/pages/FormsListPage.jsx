import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Card, Container, Button } from '../components';

function FormsListPage() {
  const userForms = useSelector(state => state.forms.forms);
  const navigate = useNavigate();

  const handleViewForm = (id) => {
    navigate(`/forms/${id}`);
  };

  return (
    <Container className={'mt-8 sm:mt-12 flex flex-col items-center'}>
      <h1 className="text-3xl sm:text-4xl font-bold text-center text-zinc-900 mb-12">Your Forms</h1>
      
      {/* TODO1: Implement pagination to limit the display to a maximum of 6 forms per page. 
          TODO2: Add an option to share the form (once backend unique URL is implemented). */}
          
      {userForms.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center items-center">
          {userForms.map((form) => {
            // Extracts the labels of the first 3 fields (can be adjusted for more if needed) and joins them with commas for a preview.
            const previewFields = form.fields.slice(0, 3).map(field => field.label).join(', ');
            const hasMoreFields = form.fields.length > 3;
            return (
            <Card key={form.id} className='border border-black/20 w-[400px] sm:w-[300px] h-[200px] flex flex-col justify-evenly'>
              <h2 className="text-xl sm:text-2xl font-semibold text-zinc-800">{form.formName}</h2>
              <p className="text-sm text-gray-600"> {previewFields} {hasMoreFields ? '...' : ''}</p>
              <p className="text-sm text-gray-500">Contains {form.fields.length} Field{form.fields.length > 1 ? 's' : ''}</p> 
              <Button onClick={() => handleViewForm(form.id)} >
                View Form
              </Button>
            </Card>
          )})}
        </div>
      ) : (
        <>
        {/* TODO: Improving the design for better visual appeal and user experience.
        Example: Add styles for spacing, background, or icons to enhance the "No forms created yet" message.*/}
        <p className='text-xl sm:text-2xl font-semibold text-zinc-800'>No forms created yet.</p>
        </>
      )}
    </Container>
  );
}

export default FormsListPage;

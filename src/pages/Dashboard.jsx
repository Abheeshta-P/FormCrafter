import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Button, Card } from '../components';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const user = useSelector((state) => state.authSliceReducer.userData);
  const navigate = useNavigate();

  return (
    <Container className={'-mt-12 sm:mt-0'}>
      <div className="flex flex-col items-center justify-center mt-28">
        <h1 className="text-4xl sm:text-5xl font-bold text-center text-zinc-900">Welcome Back{user ? `, ${user}` : ''}!</h1>
        <p className="mt-3 text-lg sm:text-xl text-center text-zinc-500">Here's what you can do today</p>

        {/* Features List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
          {/* Create New Form Card */}
          <Card>
            <h2 className="text-xl sm:text-2xl font-semibold text-zinc-800">Create New Form</h2>
            <p className="text-zinc-500 mt-2">Start a new form from scratch to collect data.</p>
            <Button className="mt-4 w-full" onClick={() => navigate('/forms/create')}>
              Create Form
            </Button>
          </Card>

          {/* View Existing Forms Card */}
          <Card>
            <h2 className="text-xl sm:text-2xl font-semibold text-zinc-800">View Existing Forms</h2>
            <p className="text-zinc-500 mt-2">Manage and review your previously created forms.</p>
            <Button className="mt-4 w-full" onClick={() => navigate('/forms')}>
              View Forms
            </Button>
          </Card>
        </div>
      </div>
    </Container>
  );
}

export default Dashboard;

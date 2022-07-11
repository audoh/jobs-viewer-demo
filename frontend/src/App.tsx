import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import CreateJobPage from './components/pages/CreateJob';
import ListJobsPage from './components/pages/ListJobs';

const App = () => (
    <BrowserRouter>
        <Routes>
            <Route path='jobs/list' element={<ListJobsPage/>}></Route>
            <Route path='jobs/new' element={<CreateJobPage/>}></Route>
            <Route path='*' element={<Navigate to='/jobs/list' replace />} />
        </Routes>
    </BrowserRouter>
);

export default App;

import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useJobs } from '../../../services/JobService';
import JobList from '../../JobList';

export default function ListJobsPage() {
    const navigate = useNavigate();
    const jobs = useJobs();
    return <>
        <AppBar position='fixed'>
            <Toolbar>
                <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
                    Jobs
                </Typography>
                <IconButton color='inherit' onClick={() => navigate('/jobs/new')}>
                    <AddIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
        <Toolbar/>
        <JobList jobs={jobs || []}/>
    </>;
}
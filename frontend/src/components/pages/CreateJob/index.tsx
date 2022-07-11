import { Toolbar, AppBar, Typography, IconButton, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import JobForm from '../../JobForm';
import { createJob } from '../../../services/JobService';

export default function CreateJobPage() {
    const navigate = useNavigate();
    const [processing, setProcessing] = useState(false);
    return <>
        <AppBar position='fixed'>
            <Toolbar>
                <IconButton color='inherit' onClick={() => navigate('/jobs/list')}>
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
                    New job
                </Typography>
            </Toolbar>
        </AppBar>
        <Toolbar/>
        <JobForm processing={processing} onSubmit={(job) => {
            setProcessing(true);
            createJob(job).then(() => {
                navigate('/jobs/list');
            });
        }} />
    </>;
}
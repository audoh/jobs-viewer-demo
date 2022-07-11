import React from 'react';
import { Divider, List, ListItem, ListItemText } from '@mui/material';
import { ListedJob } from '../../services/JobService';

export interface JobListProps {
    jobs: ListedJob[];
}

export default function JobList({ jobs }: JobListProps) {
    return <List>
        {
            jobs.map((job) => (
            <>
                <ListItem>
                    <ListItemText primary={job.id}sx={{ flexGrow: 0, width: "1rem" }}/>
                    <ListItemText primary={job.status} sx={{ flexGrow: 0, width: "5rem" }}/>
                    <ListItemText primary={job.summary} secondary={job.property.name} sx={{ flexGrow: 1 }}/>
                </ListItem>
                <Divider />
            </>
            ))
        }
    </List>
}
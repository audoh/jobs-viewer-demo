import { FormControl, InputLabel, TextField, Select, MenuItem, Grid, Stack, Button, CircularProgress, LinearProgress } from '@mui/material';
import React, { useState } from 'react';
import { JobUpdatePayload } from '../../services/JobService';
import { useProperties } from '../../services/PropertyService';


export interface JobFormProps {
    onSubmit?: (job: JobUpdatePayload) => void;
    processing?: boolean;
}

export default function JobForm({ onSubmit = () => {}, processing = false }: JobFormProps) {
    const properties = useProperties();

    const [summary, setSummary] = useState("");
    const [description, setDescription] = useState("");
    const [property, setProperty] = useState<number>(undefined);
    return <form onSubmit={(ev) => {
        if (processing) {
            return;
        }
        onSubmit({
            summary,
            description,
            property
        });
        ev.preventDefault();
    }}>
        <Stack spacing={2}>
            <FormControl fullWidth>
                <TextField required variant='outlined' name='summary' label='Summary' value={summary} onChange={(ev) => setSummary(ev.target.value)} />
            </FormControl>
            <FormControl fullWidth>
                <TextField required variant='outlined' name='description' label='Description' value={description} onChange={(ev) => setDescription(ev.target.value)} />
            </FormControl>
            <FormControl fullWidth>
                <TextField required select variant='outlined' name='property' label='Property' value={property == null ? "" : property} onChange={(ev) => setProperty(parseInt(ev.target.value))} >
                    {properties ? 
                        properties.map((property) => <MenuItem value={property.id} key={property.id}>{property.name}</MenuItem>) : 
                        <CircularProgress style={{display: "block", margin: "auto auto"}}/>
                    }
                </TextField>
            </FormControl>
            {processing ? 
                <LinearProgress /> : 
                <Button variant={'contained'} type={'submit'}>
                    Submit
                </Button>
            }
        </Stack>
    </form>;
}
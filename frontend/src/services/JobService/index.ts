import { useEffect, useState } from 'react';

export enum JobStatus {
    OPEN = 'open',
    IN_PROGRESS = 'in-progress',
    COMPLETED = 'completed',
    CANCELLED = 'cancelled'
}

export interface Property {
    id: number;
    name: string;
}

export interface ListedJob {
    id: number;
    summary: string;
    status: JobStatus;
    property: Property;
}

export interface JobUpdatePayload {
    summary: string;
    description: string;
    property: number;
}

export function getUrl(endpoint: string): string {
    return `${process.env.JOB_SERVICE_URL}/${endpoint}`;
}

export async function getJobs(): Promise<ListedJob[]> {
    const resp = await fetch(getUrl('jobs'));
    return await resp.json();
}

export function useJobs(): ListedJob[] | null {
    const [jobs, setJobs] = useState<ListedJob[] | null>(null);
    useEffect(() => {
        getJobs().then((jobs) => {
            setJobs(jobs);
        });
        return () => {};
    }, []);
    
    return jobs;
}

export async function createJob(job: JobUpdatePayload) {
    const resp = await fetch(getUrl('jobs'), {
        method: 'POST',
        body: JSON.stringify(job)
    });
}
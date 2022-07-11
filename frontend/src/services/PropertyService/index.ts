import { useEffect, useState } from "react";

export interface ListedProperty {
    id: number;
    name: string;
}

export function getUrl(endpoint: string): string {
    return `${process.env.PROPERTY_SERVICE_URL}/${endpoint}`;
}

export async function getProperties(): Promise<ListedProperty[]> {
    const resp = await fetch(getUrl('properties'));
    return await resp.json();
}


export function useProperties(): ListedProperty[] | null {
    const [properties, setProperties] = useState<ListedProperty[] | null>(null);
    useEffect(() => {
        getProperties().then((jobs) => {
            setProperties(jobs);
        });
        return () => {};
    }, []);
    
    return properties;
}
type ProjectCreateData = {
    project_name: string;
    project_description: string;
    locationRequired: boolean;
    commercialTimeRequired: boolean;
    timezone: string;
    location: string;
    commercial_time_start: number;
    commercial_time_end: number;
};

export default ProjectCreateData
type ProjectCreateError = {
    project_name: string;
    location_required: string;
    commercial_time_required: string;
    timezone: string;
    location: string;
    commercial_time_start: string;
    commercial_time_end: string;
    project_description: string;
};

export default ProjectCreateError
export type Project = {
  project_name: string;
  project_description: string;
  locationRequired: boolean;
  commercialTimeRequired: boolean;
  timezone: string;
  location: string;
  commercial_time_start: number;
  commercial_time_end: number;
};

export type ProjectError = {
  project_name: string;
  location_required: string;
  commercial_time_required: string;
  timezone: string;
  location: string;
  commercial_time_start: string;
  commercial_time_end: string;
  project_description: string;
};

export type TimezoneOption = {
  label: string;
  value: string;
};

export default interface ProjectUsers {
  user: {
    user_id: number;
    full_name: string;
    email: string;
    cpf: string
  };
  role: string;
  hours_per_week: number;
  user_id: number;
  elapsed_time_sum: number;
}

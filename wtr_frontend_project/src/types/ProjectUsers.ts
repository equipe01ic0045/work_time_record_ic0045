export default interface ProjectUsers {
    user: {
        user_id: number,
        full_name: string,
        email: string
    },
    role: string,
    hours_per_week: number
  }
  
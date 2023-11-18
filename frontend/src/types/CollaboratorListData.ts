export default interface CollaboratorListData {
  user: {
    user_id?: number,
    full_name?: string,
    email?: string,
    cpf?: string
  },
  role?: string,
  hours_per_week?: number

}

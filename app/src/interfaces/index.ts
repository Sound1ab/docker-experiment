export interface IEvent {
  id: number
  description: string
  isDone: boolean
  createdAt: {
    dateLongForm: string
    dayOfWeek: string
    dayOfMonth: number
    month: string
  }
}

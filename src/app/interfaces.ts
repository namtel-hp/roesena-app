export interface appEvent {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  participants: { id: string; amount: number }[];
  authorityLevel: number;
}

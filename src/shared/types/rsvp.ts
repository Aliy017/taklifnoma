export interface RsvpEntry {
  id: string;
  name: string;
  phone?: string;
  attending: boolean;
  guests: number;
  message?: string;
  createdAt: string;
}

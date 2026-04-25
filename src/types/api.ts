export interface ApiType<T> {
  data: T;
  message: string;
  statusCode: number;
  success: boolean;
  timestamp: string;
}
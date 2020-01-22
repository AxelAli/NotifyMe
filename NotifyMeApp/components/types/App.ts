export interface IAppState {
  notifications: INotification[];
}

interface INotification {
  id: string;
  time: Date;
  type: "user" | "server";
  completed: boolean;
}

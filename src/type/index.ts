export type IWebhookAction = {
  _id: string;
  teamId: string;
  name: string;
  listenType: string;
  from: string;
  to: string;
  scriptId: string;
  hostId: string;
  createdAt: string;
  updatedAt: string;
};

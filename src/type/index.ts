export type IAction = {
  listen_type: string;
  from: string;
  to: string;
  action: {
    method: string;
    url: string;
    headers: {
      Accept: string;
      Authorization: string;
    };
  };
};

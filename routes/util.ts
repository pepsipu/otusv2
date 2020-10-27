const createRaiseError = (res: any) => (error: string | string[], statusCode: number) => {
  res.status(statusCode);
  res.send({ error });
  res.end();
};

// eslint-disable-next-line import/prefer-default-export
export { createRaiseError };

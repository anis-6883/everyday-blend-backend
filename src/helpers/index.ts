const transformErrorsToMap = (errors: any[]) => {
  const errorMap: { [key: string]: string } = {};

  errors.forEach((error: { path: string; msg: string }) => {
    const { path, msg } = error;
    errorMap[path] = msg;
  });

  return errorMap;
};

export { transformErrorsToMap };

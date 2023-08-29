import { Prisma } from '@prisma/client';

export const handleLogger: Prisma.Middleware = async (params, next) => {
  console.log(
    `${params.action} ${params.model} ${JSON.stringify(params.args)}`,
  );

  const result = await next(params);

  console.log(result);

  return result;
};

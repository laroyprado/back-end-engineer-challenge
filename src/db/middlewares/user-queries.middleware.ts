import { Prisma } from '@prisma/client';

export const handleUserQueries: Prisma.Middleware = async (params, next) => {
  if (params.model !== 'User') {
    return next(params);
  }

  if (params.action === 'findUnique' || params.action === 'findFirst') {
    return next({
      ...params,
      action: 'findFirst',
      args: {
        ...params.args,
        where: {
          ...params.args?.where,
          isDeleted: false,
        },
      },
    });
  }

  if (params.action === 'findMany') {
    return next({
      ...params,
      args: {
        ...params.args,
        where: {
          ...params.args?.where,
          isDeleted: false,
        },
      },
    });
  }

  return next(params);
};

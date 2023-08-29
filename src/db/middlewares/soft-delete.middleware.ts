import { Prisma } from '@prisma/client';

export const handleUserSoftDelete: Prisma.Middleware = async (params, next) => {
  if (params.model !== 'User') {
    return next(params);
  }
  if (params.action === 'delete') {
    return next({
      ...params,
      action: 'update',
      args: {
        ...params.args,
        data: {
          isDeleted: true,
        },
      },
    });
  }
  return next(params);
};

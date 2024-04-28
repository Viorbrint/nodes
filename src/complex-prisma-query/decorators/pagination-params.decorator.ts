import {
  BadRequestException,
  ExecutionContext,
  createParamDecorator,
} from '@nestjs/common';
import { Request } from 'express';

export interface PaginationOptions {
  page: number;
  limit: number;
}

export const PaginationParams = createParamDecorator(
  (data, ctx: ExecutionContext): PaginationOptions => {
    const req: Request = ctx.switchToHttp().getRequest();
    const page = parseInt(req.query.page as string);
    const limit = parseInt(req.query.limit as string);

    if (isNaN(page) || page < 0 || isNaN(limit) || limit < 0) {
      throw new BadRequestException('Invalid pagination params');
    }

    if (limit > 100) {
      throw new BadRequestException(
        'Invalid pagination params: Max limit is 100',
      );
    }

    return { page, limit };
  },
);

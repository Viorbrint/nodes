import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { Request } from 'express';

export interface SortingOptions {
  property: string;
  direction: string;
}

export const SortingParams = createParamDecorator(
  (fields: string[], ctx: ExecutionContext): SortingOptions => {
    const req: Request = ctx.switchToHttp().getRequest();
    const sort = req.query.sort as string;
    if (!sort) {
      return null;
    }

    const sortPattern = /^([a-zA-Z0-9]+):(asc|desc)$/;
    if (!sort.match(sortPattern)) {
      throw new BadRequestException('Invalid sort parameter');
    }

    const [property, direction] = sort.split(':');
    if (!fields.includes(property)) {
      throw new BadRequestException(`Invalid sort property: ${property}`);
    }

    return { property, direction };
  },
);

import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { Request } from 'express';
import { SortingOptions } from '../../interfaces/sorting-options.interface';

export const SortingParams = createParamDecorator(
  <EntityType>(
    fields: (keyof EntityType)[],
    ctx: ExecutionContext,
  ): SortingOptions => {
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
    if (!fields.includes(property as keyof EntityType)) {
      throw new BadRequestException(`Invalid sort property: ${property}`);
    }

    return { property, direction };
  },
);
export { SortingOptions };

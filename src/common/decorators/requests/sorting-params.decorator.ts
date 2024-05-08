import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { Request } from 'express';
import { SortingOptions } from '../../interfaces/sorting-options.interface';
import { SelectFields } from '@/common/types/select-fields.type';

export const SortingParams = createParamDecorator(
  <EntityType>(
    fields: SelectFields<EntityType>,
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
    if (!Object.keys(fields).includes(property)) {
      throw new BadRequestException(`Invalid sort property: ${property}`);
    }

    return { property, direction };
  },
);
export { SortingOptions };

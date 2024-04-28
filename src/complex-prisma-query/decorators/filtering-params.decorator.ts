import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { Request } from 'express';

export interface FilteringOptions {
  property: string;
  rule: string;
  value: string;
}

// valid filter rules
export enum FilterRule {
  EQUALS = 'equals',
  NOT_EQUALS = 'not',
  GREATER_THAN = 'gt',
  GREATER_THAN_OR_EQUALS = 'gte',
  LESS_THAN = 'lt',
  LESS_THAN_OR_EQUALS = 'lte',
}

export const FilteringParams = createParamDecorator(
  (fields: string[], ctx: ExecutionContext): FilteringOptions => {
    const req: Request = ctx.switchToHttp().getRequest();
    const filter = req.query.filter as string;
    if (!filter) {
      return null;
    }

    if (
      !filter.match(
        /^[a-zA-Z0-9_]+:(equals|not|gt|gte|lt|lte):[a-zA-Z0-9_,]+$/,
      ) &&
      !filter.match(/^[a-zA-Z0-9_]+:(isnull|isnotnull)$/)
    ) {
      throw new BadRequestException('Invalid filter parameter');
    }

    const [property, rule, value] = filter.split(':');
    if (!fields.includes(property)) {
      throw new BadRequestException(`Invalid filter property: ${property}`);
    }
    if (!Object.values(FilterRule).includes(rule as FilterRule)) {
      throw new BadRequestException(`Invalid filter rule: ${rule}`);
    }

    return { property, rule, value };
  },
);

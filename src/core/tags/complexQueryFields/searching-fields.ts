import { SelectFields } from '@/common/types/select-fields.type';
import { Tag } from '../entities/tag.entity';

export const searchingFields: SelectFields<Tag> = {
  name: true,
};

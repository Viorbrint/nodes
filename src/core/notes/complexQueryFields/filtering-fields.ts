import { SelectFields } from '@/common/types/select-fields.type';
import { Note } from '../entities/note.entity';

export const filteringFields: SelectFields<Note> = {
  name: true,
  createdAt: true,
  location: true,
};

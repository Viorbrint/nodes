import { SelectFields } from '@/common/types/select-fields.type';
import { Note } from '../entities/note.entity';

export const searchingFields: SelectFields<Note> = {
  name: true,
  content: true,
  location: true,
};

import { ApiProperty } from '@nestjs/swagger';
import { Tag } from 'src/core/tags/entities/tag.entity';

export class Note {
  @ApiProperty({ example: '42', description: 'Note id' })
  id: number;

  @ApiProperty({ example: 'Shopping list', description: 'Note name' })
  name: string;

  @ApiProperty({
    example: 'Milk, bread, sausages, cheese',
    description: 'Note content',
    required: false,
  })
  content?: string;

  @ApiProperty({
    example: [
      {
        name: 'Shopping',
      },
      {
        name: 'Food',
      },
    ],
    description: 'Keywords / tags',
  })
  tags: Tag[];

  @ApiProperty({
    example: 'Home',
    description: 'Location where the note was created',
  })
  location: string;

  @ApiProperty({
    example: new Date(),
    description: 'Note creation date',
  })
  createdAt: Date;
}

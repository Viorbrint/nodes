import { ApiProperty } from '@nestjs/swagger';

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
    example: ['Shopping', 'Food'],
    description: 'Keywords / tags',
  })
  keywords: string[];

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

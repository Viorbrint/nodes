import { ApiProperty } from '@nestjs/swagger';

export class CreateNoteDto {
  @ApiProperty({ example: 'Shopping list', description: 'Note name' })
  readonly name: string;

  @ApiProperty({
    example: 'Milk, bread, sausages, cheese',
    description: 'Note content',
    required: false,
  })
  readonly content?: string;

  @ApiProperty({
    example: ['Shopping', 'Food'],
    description: 'Keywords / tags',
  })
  readonly keywords: string[];

  @ApiProperty({
    example: 'Home',
    description: 'Location where the note was created',
  })
  readonly location: string;
}

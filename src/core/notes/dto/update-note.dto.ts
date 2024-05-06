import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateNoteDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Shopping list', description: 'Note name' })
  readonly name?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Sneakers, shirt, trousers',
    description: 'Note content',
    required: false,
  })
  readonly content?: string;

  @IsNotEmpty()
  @IsArray()
  @ApiProperty({
    example: ['Shopping', 'Сloth'],
    description: 'Keywords / tags',
  })
  readonly keywords?: string[];

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Work',
    description: 'Location where the note was created',
  })
  readonly location?: string;
}

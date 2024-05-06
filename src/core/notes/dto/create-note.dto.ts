import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateNoteDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Shopping list', description: 'Note name' })
  readonly name: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Milk, bread, sausages, cheese',
    description: 'Note content',
    required: false,
  })
  readonly content?: string;

  @IsNotEmpty()
  @IsArray()
  @ApiProperty({
    example: ['Shopping', 'Food'],
    description: 'Keywords / tags',
  })
  readonly keywords: string[];

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Home',
    description: 'Location where the note was created',
  })
  readonly location: string;
}

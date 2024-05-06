import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateTagDto } from 'src/core/tags/dto/create-tag.dto';

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

  @ValidateNested({ each: true })
  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @Type(() => CreateTagDto)
  @ApiProperty({
    example: [{ name: 'Shopping' }, { name: 'Food' }],
    description: 'Keywords / tags',
    required: false,
  })
  readonly tags?: CreateTagDto[];

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Home',
    description: 'Location where the note was created',
  })
  readonly location: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateTagDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Shopping', description: 'Tag name' })
  @Matches(/^\w+$/)
  readonly name: string;
}

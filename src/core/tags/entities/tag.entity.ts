import { ApiProperty } from '@nestjs/swagger';

export class Tag {
  @ApiProperty({ example: '1', description: 'Tag id' })
  id: number;

  @ApiProperty({ example: 'Shopping', description: 'Tag name' })
  name: string;
}

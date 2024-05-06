import { ApiProperty } from '@nestjs/swagger';

export class AccessToken {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFzZmFzZGZhQGdtYWlsLmNvbSIsInN1YiI6MTIsImlhdCI6MTcxNDQyMDQ3NCwiZXhwIjoxNzE0NTA2ODc0fQ.vMC4iAgTnMesFtkgwxY6hSmrlfE7oBNM2CQqif6Fypg',
  })
  access_token: string;
}

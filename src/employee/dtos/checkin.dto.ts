import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CheckinDto {
  @ApiProperty({
    description: "Employee ID",
    type: String,
    example: '12345',
  })
  @IsNotEmpty()
  @IsString()
  employeeId: string;

  @ApiProperty({
    description: 'Check-in comment',
    type: String,
    example: "Arrived on time",
  })
  @IsNotEmpty()
  @IsString()
  comment: string;
}

import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CheckoutDto {
  @ApiProperty({
    description: 'Employee ID',
    type: String,
    example: '12345',
  })
  @IsNotEmpty()
  @IsString()
  employeeId: string;

  @ApiProperty({
    description: 'Comment for check-out',
    type: String,
    example: 'Work finished for today',
  })
  @IsNotEmpty()
  @IsString()
  checkoutComment: string;
}

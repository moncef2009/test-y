import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDate } from 'class-validator';

export class CreateEmployeeDto {
  @ApiProperty({
    example: 'Doe',
    description: 'The last name of the employee',
  })
  @IsString({ message: 'Last name must be a string' })
  @IsNotEmpty({ message: 'Last name is required' })
  readonly lastName: string;

  @ApiProperty({
    example: 'John',
    description: 'The first name of the employee',
  })
  @IsString({ message: 'First name must be a string' })
  @IsNotEmpty({ message: 'First name is required' })
  readonly firstName: string;

  @ApiProperty({
    example: 'IT',
    description: 'The department of the employee',
  })
  @IsString({ message: 'Department must be a string' })
  @IsNotEmpty({ message: 'Department is required' })
  readonly department: string;
}

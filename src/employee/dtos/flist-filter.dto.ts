import { Transform } from 'class-transformer';
import { IsDateString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FilterEmployeeDto {
  @ApiProperty({
    example: '2023-09-20',
    description: 'Date created in the format YYYY-MM-DD',
    required: false,
  })
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDateString()
  dateCreated: Date;
}

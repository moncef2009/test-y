import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { Employee } from './entities/employee.entity';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dtos/create-employee.dto';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { FilterEmployeeDto } from './dtos/flist-filter.dto';
import { Epointment } from './entities/epointment.entity';
import { CheckinDto } from './dtos/checkin.dto';
import { CheckoutDto } from './dtos/checkout.dto';

@ApiTags('employees')
@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @ApiOperation({ summary: 'Create a new employee' })
  @ApiCreatedResponse({
    description: 'The employee has been created successfully',
    type: Employee,
  })
  @ApiInternalServerErrorResponse({
    description: 'Server error occurred while creating the employee',
  })
  @Post()
  async createEmployee(
    @Body() createEmployeeDto: CreateEmployeeDto,
  ): Promise<Employee> {
    return this.employeeService.createEmployee(createEmployeeDto);
  }

  @ApiOperation({ summary: 'Get employees filtered by dateCreated' })
  @ApiOkResponse({
    description: 'List of employees filtered by dateCreated',
    type: Employee,
    isArray: true,
  })
  @ApiNotFoundResponse({
    description: 'No employees found for the specified date',
  })
  @Get()
  async getEmployeesByDate(
    @Query() filterEmployeeDto: FilterEmployeeDto,
  ): Promise<Employee[]> {
    return this.employeeService.getEmployeesByDate(filterEmployeeDto);
  }

  @ApiOperation({ summary: 'Check in an employee' })
  @ApiOkResponse({
    description: 'Employee has been checked in successfully',
    type: Epointment,
  })
  @ApiInternalServerErrorResponse({
    description: 'Server error occurred while checking in the employee',
  })
  @Post('checkin')
  async checkin(@Body() checkinDto: CheckinDto): Promise<Epointment> {
    return this.employeeService.checkin(
      checkinDto.employeeId,
      checkinDto.comment,
    );
  }

  @ApiOperation({ summary: 'Check out an employee' })
  @ApiInternalServerErrorResponse({
    description: 'Server error occurred while checking out the employee',
  })
  @Post('checkout')
  async checkout(
    @Body() checkoutDto: CheckoutDto,
  ): Promise<{ epointment: Epointment; duration: string }> {
    return this.employeeService.checkout(
      checkoutDto.employeeId,
      checkoutDto.checkoutComment,
    );
  }
}

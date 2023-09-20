import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Employee } from './entities/employee.entity';
import { EmployeeRepository } from './repositories/employee.repository';
import { CreateEmployeeDto } from './dtos/create-employee.dto';
import { FilterEmployeeDto } from './dtos/flist-filter.dto';
import { EpointmentRepository } from './repositories/epointment.repository';
import { Epointment } from './entities/epointment.entity';
import * as moment from 'moment';

@Injectable()
export class EmployeeService {
  constructor(
    private employeeRepository: EmployeeRepository,
    private epointmentRepository: EpointmentRepository,
  ) {}

  async createEmployee(employeeData: CreateEmployeeDto): Promise<Employee> {
    const { firstName, lastName, department } = employeeData;

    try {
      const newEmployee = await this.employeeRepository.create({
        firstName,
        lastName,
        department,
        dateCreated: new Date(),
      });

      return newEmployee;
    } catch (error) {
      return error;
    }
  }

  async getEmployeesByDate(filterDto: FilterEmployeeDto): Promise<Employee[]> {
    try {
      const filtre = {};
      if (filterDto.dateCreated) {
        filtre['dateCreated'] = filterDto.dateCreated;
      }
      const employees = await this.employeeRepository.find(filtre);

      if (!employees || employees.length === 0) {
        throw new HttpException('No employees found', HttpStatus.NOT_FOUND);
      }

      return employees;
    } catch (error) {
      return error;
    }
  }

  async checkin(employeeId: string, comment: string): Promise<Epointment> {
    try {
      const employee = await this.employeeRepository.findOne({
        _id: employeeId,
      });

      if (!employee) {
        throw new HttpException('Employee not found', HttpStatus.NOT_FOUND);
      }

      // Check if a check-in has already been recorded for this employee today
      const today = moment().startOf('day');
      const existingCheckinRecord = await this.epointmentRepository.findOne({
        employee_identifier: employeeId,
        check_in: { $gte: today.toDate() },
      });

      if (existingCheckinRecord) {
        throw new HttpException(
          'A check-in has already been recorded for this employee today',
          HttpStatus.BAD_REQUEST,
        );
      }

      const newCheckinRecord = await this.epointmentRepository.create({
        employee_identifier: employeeId,
        check_in: new Date(),
        comment,
      });

      return newCheckinRecord;
    } catch (error) {
      return error;
    }
  }

  async checkout(
    employeeId: string,
    checkoutComment: string,
  ): Promise<{ epointment: Epointment; duration: string }> {
    try {
      const lastRecord = await this.epointmentRepository.findOne(
        {
          employee_identifier: employeeId,
        },
        { sort: { check_in: -1 } },
      );

      if (!lastRecord) {
        throw new HttpException(
          'No check-in record found for this employee',
          HttpStatus.NOT_FOUND,
        );
      }

      lastRecord.check_out = new Date();
      lastRecord.comment += `, ${checkoutComment}`;

      await lastRecord.save();

      const checkinTime = moment(lastRecord.check_in);
      const checkoutTime = moment(lastRecord.check_out);
      const duration = moment.duration(checkoutTime.diff(checkinTime));
      const hours = duration.hours();
      const minutes = duration.minutes();
      const formattedDuration = `${hours} hours and ${minutes} minutes`;

      return { epointment: lastRecord, duration: formattedDuration };
    } catch (error) {
      return error;
    }
  }
}

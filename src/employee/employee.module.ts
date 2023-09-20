import { Module } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { Employee, EmployeeSchema } from './entities/employee.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeeRepository } from './repositories/employee.repository';
import { Epointment, EpointmentSchema } from './entities/epointment.entity';
import { EpointmentRepository } from './repositories/epointment.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Employee.name, schema: EmployeeSchema },
      { name: Epointment.name, schema: EpointmentSchema },
    ]),
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService, EmployeeRepository,EpointmentRepository],

})
export class EmployeeModule {}

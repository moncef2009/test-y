import { BaseRepository } from 'src/database/entity.repository';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Employee, EmployeeDocument } from '../entities/employee.entity';

export class EmployeeRepository extends BaseRepository<EmployeeDocument> {
  constructor(
    @InjectModel(Employee.name)
    private readonly model: Model<EmployeeDocument>,
  ) {
    super(model);
  }
}

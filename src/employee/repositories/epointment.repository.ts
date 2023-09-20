import { BaseRepository } from 'src/database/entity.repository';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Epointment, EpointmentDocument } from '../entities/epointment.entity';

export class EpointmentRepository extends BaseRepository<EpointmentDocument> {
  constructor(
    @InjectModel(Epointment.name)
    private readonly model: Model<EpointmentDocument>,
  ) {
    super(model);
  }
}

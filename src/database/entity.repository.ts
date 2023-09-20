import {
  Document,
  Model,
  FilterQuery,
  UpdateQuery,
  QueryOptions,
} from 'mongoose';

export abstract class BaseRepository<T extends Document> {
  constructor(protected entityModel: Model<T>) {}

  async findOne(filter: FilterQuery<T>, options?: QueryOptions) {
    return this.entityModel.findOne(filter, null, options);
  }

  async find(filter: FilterQuery<T>) {
    return this.entityModel.find(filter);
  }

  async create(createEntityData: unknown) {
    const entity = new this.entityModel(createEntityData);
    return entity.save();
  }

  async update(filter: FilterQuery<T>, updateEntityData: UpdateQuery<T>) {
    return this.entityModel.findOneAndUpdate(filter, updateEntityData, {
      new: true,
    });
  }

  async delet(filter: FilterQuery<T>) {
    return this.entityModel.findOneAndDelete(filter);
  }
}

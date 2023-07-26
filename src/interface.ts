import { HydratedDocument, Model, QueryWithHelpers, Types } from 'mongoose';

// interface for common fields
export interface ICommon {
  _id: Types.ObjectId;
  deleted_at: Date;
}

// interface for query helpers
export interface IQueryHelpers<T> {
  notDeleted(): QueryWithHelpers<HydratedDocument<T>, HydratedDocument<T>, IQueryHelpers<T>>;
  onlyDeleted(): QueryWithHelpers<HydratedDocument<T>, HydratedDocument<T>, IQueryHelpers<T>>;
  withDeleted(): QueryWithHelpers<HydratedDocument<T>, HydratedDocument<T>, IQueryHelpers<T>>;
}

// interface for model
export interface IModel<IDoc, TQueryHelpers = IQueryHelpers<IDoc>, TInstanceMethods = {}>
  extends Model<IDoc, TQueryHelpers, TInstanceMethods> {
  softDeleteById(_id: Types.ObjectId): IDoc;
  softDelete(): any;
  restoreById(): IDoc;
  restore(): any;
  restoreAll(): any;
  forceDeleteById(): IDoc;
  forceDelete(): IDoc[];
}

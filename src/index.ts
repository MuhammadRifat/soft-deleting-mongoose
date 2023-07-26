import { HydratedDocument, QueryWithHelpers, Schema, SchemaDefinition, SchemaDefinitionType, Types } from 'mongoose';
import { ICommon, IModel, IQueryHelpers } from './interface';

class MongooseSchema<IDoc, IInstanceMethods = {}, QueryHelpers = {}> extends Schema<
  IDoc,
  IModel<IDoc, QueryHelpers, IInstanceMethods>,
  IInstanceMethods,
  IQueryHelpers<IDoc> & QueryHelpers
> {
  constructor(schema: SchemaDefinition<SchemaDefinitionType<IDoc & ICommon>>, timestamps: { timestamps: boolean }) {
    schema.deleted_at = {
      type: Date,
      default: null,
    };

    super(schema, timestamps);
    this.bindSoftDeletingQueryHelpers();
    this.bindSoftDeletingStaticMethods();
  }

  // bind statics methods for soft deleting
  bindSoftDeletingStaticMethods() {
    // soft delete by id
    this.statics.softDeleteById = function (_id: Types.ObjectId) {
      return this.findOneAndUpdate(
        { _id, deleted_at: null },
        {
          $set: {
            deleted_at: new Date(),
          },
        },
        { new: true },
      );
    };

    // soft delete by query
    this.statics.softDelete = function (query: object) {
      return this.updateMany(
        { ...query, deleted_at: null },
        {
          $set: {
            deleted_at: new Date(),
          },
        },
      );
    };

    // soft delete by id
    this.statics.restoreById = function (_id: Types.ObjectId) {
      return this.findByIdAndUpdate(
        _id,
        {
          $set: {
            deleted_at: null,
          },
        },
        { new: true },
      );
    };

    // soft delete by query
    this.statics.restore = function (query: object) {
      return this.updateMany(
        { ...query, deleted_at: { $ne: null } },
        {
          $set: {
            deleted_at: null,
          },
        },
      );
    };

    // soft delete by query
    this.statics.restoreAll = function () {
      return this.updateMany(
        { deleted_at: { $ne: null } },
        {
          $set: {
            deleted_at: null,
          },
        },
      );
    };

    // soft delete by id
    this.statics.forceDeleteById = function (_id: Types.ObjectId) {
      return this.findByIdAndDelete(_id, { new: true });
    };

    // soft delete by query
    this.statics.forceDelete = function (query: object) {
      return this.deleteMany(query, { new: true });
    };
  }

  // bind query helpers for soft deleting
  bindSoftDeletingQueryHelpers() {
    // query helper for soft deleting
    this.query.notDeleted = function notDeleted(
      this: QueryWithHelpers<any, HydratedDocument<IDoc>, IQueryHelpers<IDoc>>,
    ) {
      return this.where({ deleted_at: null });
    };

    // query helper for soft deleting
    this.query.onlyDeleted = function onlyDeleted(
      this: QueryWithHelpers<any, HydratedDocument<IDoc>, IQueryHelpers<IDoc>>,
    ) {
      return this.where({ deleted_at: { $ne: null } });
    };

    // query helper for soft deleting
    this.query.withDeleted = function withDeleted(
      this: QueryWithHelpers<any, HydratedDocument<IDoc>, IQueryHelpers<IDoc>>,
    ) {
      return this.where({ deleted_at: { $exists: true } });
    };
  }
}

export { MongooseSchema };

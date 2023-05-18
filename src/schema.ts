import { HydratedDocument, Model, QueryWithHelpers, Schema, Types } from "mongoose";

interface IQueryHelpers<T> {
    notDeleted(): QueryWithHelpers<
        HydratedDocument<T>,
        HydratedDocument<T>,
        IQueryHelpers<T>
    >;
    deleted(): QueryWithHelpers<
        HydratedDocument<T>,
        HydratedDocument<T>,
        IQueryHelpers<T>
    >;
}

interface ModelInterface<IDoc> extends Model<IDoc, IQueryHelpers<IDoc>> {
    softDelete(query: object): IDoc;
    softDeleteById(_id: Types.ObjectId): IDoc;
    restoreById(_id: Types.ObjectId): IDoc;
    restore(query: object): IDoc;
    restoreAll(query: object): IDoc;
    forceDeleteById(_id: Types.ObjectId): IDoc;
    forceDelete(query: object): IDoc;
}


class MongooseSchema<IDoc, ModelType, IInstanceMethods, QueryHelpers> extends Schema<IDoc, ModelInterface<IDoc> & ModelType, IInstanceMethods, IQueryHelpers<IDoc> & QueryHelpers> {
    constructor(schema: any) {
        schema.deleted_at = {
            type: Boolean,
            default: null
        }

        super(schema);
        this.bindSoftDeletingQueryHelpers();
        this.bindSoftDeletingStaticMethods();
    }

    // bind statics methods for soft deleting
    bindSoftDeletingStaticMethods() {
        // soft delete by id
        this.statics.softDeleteById = function (_id: Types.ObjectId) {
            return this.findByIdAndUpdate(
                _id,
                {
                    $set: {
                        deleted_at: new Date()
                    },
                },
                { new: true }
            );
        };

        // soft delete by query
        this.statics.softDelete = function (query: object) {
            return this.findOneAndUpdate(
                query,
                {
                    $set: {
                        deleted_at: new Date()
                    },
                },
                { new: true }
            );
        };

        // soft delete by id
        this.statics.restoreById = function (_id: Types.ObjectId) {
            return this.findByIdAndUpdate(
                _id,
                {
                    $set: {
                        deleted_at: null
                    },
                },
                { new: true }
            );
        };

        // soft delete by query
        this.statics.restore = function (query: object) {
            return this.findOneAndUpdate(
                query,
                {
                    $set: {
                        deleted_at: null
                    },
                },
                { new: true }
            );
        };

        // soft delete by query
        this.statics.restoreAll = function (query: object) {
            return this.updateMany(
                query,
                {
                    $set: {
                        deleted_at: null
                    },
                }
            );
        };

        // soft delete by id
        this.statics.forceDeleteById = function (_id: Types.ObjectId) {
            return this.findByIdAndDelete(_id, { new: true });
        };

        // soft delete by query
        this.statics.forceDelete = function (query: object) {
            return this.findOneAndDelete(query, { new: true });
        };
    }

    // bind query helpers for soft deleting
    bindSoftDeletingQueryHelpers() {

        // query helper for soft deleting
        this.query.notDeleted = function notDeleted(
            this: QueryWithHelpers<any, HydratedDocument<IDoc>, IQueryHelpers<IDoc>>
        ) {
            return this.where({ deleted_at: null });
        };

        // query helper for soft deleting
        this.query.deleted = function deleted(
            this: QueryWithHelpers<any, HydratedDocument<IDoc>, IQueryHelpers<IDoc>>
        ) {
            return this.where({ deleted_at: { $ne: null } });
        };
    }
}

export { MongooseSchema };
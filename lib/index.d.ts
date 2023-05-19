import { HydratedDocument, Model, QueryWithHelpers, Schema, Types } from 'mongoose';
export interface IQueryHelpers<T> {
    notDeleted(): QueryWithHelpers<HydratedDocument<T>, HydratedDocument<T>, IQueryHelpers<T>>;
    onlyDeleted(): QueryWithHelpers<HydratedDocument<T>, HydratedDocument<T>, IQueryHelpers<T>>;
    withDeleted(): QueryWithHelpers<HydratedDocument<T>, HydratedDocument<T>, IQueryHelpers<T>>;
}
export interface ModelInterface<IDoc> extends Model<IDoc, IQueryHelpers<IDoc>> {
    softDelete(query: object): unknown;
    softDeleteById(_id: Types.ObjectId): IDoc;
    restoreById(_id: Types.ObjectId): IDoc;
    restore(query: object): unknown;
    restoreAll(): unknown;
    forceDeleteById(_id: Types.ObjectId): IDoc;
    forceDelete(query: object): unknown;
}
declare class MongooseSchema<IDoc, ModelType, IInstanceMethods, QueryHelpers> extends Schema<IDoc, ModelInterface<IDoc>, IInstanceMethods, IQueryHelpers<IDoc>> {
    constructor(schema: any);
    bindSoftDeletingStaticMethods(): void;
    bindSoftDeletingQueryHelpers(): void;
}
export { MongooseSchema };

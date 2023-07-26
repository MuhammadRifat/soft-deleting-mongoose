import { HydratedDocument, Model, QueryWithHelpers, Schema, SchemaDefinition, SchemaDefinitionType, Types } from 'mongoose';
export interface ICommon {
    _id: Types.ObjectId;
    deleted_at: Date;
}
export interface IQueryHelpers<T> {
    notDeleted(): QueryWithHelpers<HydratedDocument<T>, HydratedDocument<T>, IQueryHelpers<T>>;
    onlyDeleted(): QueryWithHelpers<HydratedDocument<T>, HydratedDocument<T>, IQueryHelpers<T>>;
    withDeleted(): QueryWithHelpers<HydratedDocument<T>, HydratedDocument<T>, IQueryHelpers<T>>;
}
export interface IModel<IDoc, TQueryHelpers = IQueryHelpers<IDoc>, TInstanceMethods = {}> extends Model<IDoc, TQueryHelpers, TInstanceMethods> {
    softDeleteById(_id: Types.ObjectId): IDoc;
    softDelete(): any;
    restoreById(): IDoc;
    restore(): any;
    restoreAll(): any;
    forceDeleteById(): IDoc;
    forceDelete(): IDoc[];
}
declare class MongooseSchema<IDoc, IInstanceMethods = {}, QueryHelpers = {}> extends Schema<IDoc, IModel<IDoc, QueryHelpers, IInstanceMethods>, IInstanceMethods, IQueryHelpers<IDoc> & QueryHelpers> {
    constructor(schema: SchemaDefinition<SchemaDefinitionType<IDoc & ICommon>>, timestamps: {
        timestamps: boolean;
    });
    bindSoftDeletingStaticMethods(): void;
    bindSoftDeletingQueryHelpers(): void;
}
export { MongooseSchema };

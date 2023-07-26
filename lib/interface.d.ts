import { HydratedDocument, Model, QueryWithHelpers, Types } from "mongoose";
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

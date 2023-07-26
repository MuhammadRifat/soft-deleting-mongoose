import { Schema, SchemaDefinition, SchemaDefinitionType } from "mongoose";
import { ICommon, IModel, IQueryHelpers } from "./interface";
declare class MongooseSchema<IDoc, IInstanceMethods = {}, QueryHelpers = {}> extends Schema<IDoc, IModel<IDoc, QueryHelpers, IInstanceMethods>, IInstanceMethods, IQueryHelpers<IDoc> & QueryHelpers> {
    constructor(schema: SchemaDefinition<SchemaDefinitionType<IDoc & ICommon>>, timestamps: {
        timestamps: boolean;
    });
    bindSoftDeletingStaticMethods(): void;
    bindSoftDeletingQueryHelpers(): void;
}
export { MongooseSchema };

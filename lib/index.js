"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongooseSchema = void 0;
const mongoose_1 = require("mongoose");
class MongooseSchema extends mongoose_1.Schema {
    constructor(schema) {
        schema.deleted_at = {
            type: Date,
            default: null,
        };
        super(schema);
        this.bindSoftDeletingQueryHelpers();
        this.bindSoftDeletingStaticMethods();
    }
    // bind statics methods for soft deleting
    bindSoftDeletingStaticMethods() {
        // soft delete by id
        this.statics.softDeleteById = function (_id) {
            return this.findByIdAndUpdate(_id, {
                $set: {
                    deleted_at: new Date(),
                },
            }, { new: true });
        };
        // soft delete by query
        this.statics.softDelete = function (query) {
            return this.findOneAndUpdate(query, {
                $set: {
                    deleted_at: new Date(),
                },
            }, { new: true });
        };
        // soft delete by id
        this.statics.restoreById = function (_id) {
            return this.findByIdAndUpdate(_id, {
                $set: {
                    deleted_at: null,
                },
            }, { new: true });
        };
        // soft delete by query
        this.statics.restore = function (query) {
            return this.updateMany(query, {
                $set: {
                    deleted_at: null,
                },
            });
        };
        // soft delete by query
        this.statics.restoreAll = function () {
            return this.updateMany({ deleted_at: { $ne: null } }, {
                $set: {
                    deleted_at: null,
                },
            });
        };
        // soft delete by id
        this.statics.forceDeleteById = function (_id) {
            return this.findByIdAndDelete(_id, { new: true });
        };
        // soft delete by query
        this.statics.forceDelete = function (query) {
            return this.findOneAndDelete(query, { new: true });
        };
    }
    // bind query helpers for soft deleting
    bindSoftDeletingQueryHelpers() {
        // query helper for soft deleting
        this.query.notDeleted = function notDeleted() {
            return this.where({ deleted_at: null });
        };
        // query helper for soft deleting
        this.query.onlyDeleted = function onlyDeleted() {
            return this.where({ deleted_at: { $ne: null } });
        };
        // query helper for soft deleting
        this.query.withDeleted = function withDeleted() {
            return this.where({ deleted_at: { $exists: true } });
        };
    }
}
exports.MongooseSchema = MongooseSchema;

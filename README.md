# soft-deleting-mongoose

This is a simple, easy-to-understand soft deleting package for MongoDB using Mongoose ODM. This package gives you all functionality to soft delete any Mongodb document. So let's start soft deleting...

## Installation
`npm install soft-deleting-mongoose`

## Usage

#### Defining schema

Firstly import **MongooseSchema** and create a schema.

```js
const userSchema = new MongooseSchema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "user"
    },
    password: String
});
```

#### Creating a model

```js
const User = mongoose.model('User', userSchema);
```

#### Delete a user by using soft deleting

```js
app.delete("/user/:_id", async (req, res, next) => {
    try {
        const _id = req.params._id;
        const user = await User.softDeleteById(_id);

        return res.status(200).json({ success: true, data: user });
    } catch (error) {
        next(error);
    }
});
```

### Provided the following query helpers for soft deleting.

- .notDeleted()
- .onlyDeleted()
- .withDeleted()

### Provided the following static functions for soft deleting.

- Model.softDelete(query)
- Model.softDeleteById(_id)
- Model.restoreById(_id)
- Model.restore(query)
- Model.restoreAll()
- Model.forceDeleteById(_id)
- Model.forceDelete(query)

## Usage Example of query helpers

In the above, I have declared a model named **User**. Now I am giving examples using the **User** model.

#### .notDeleted()
- Get not deleted documents

```js
User.find({}).notDeleted();
```

#### .onlyDeleted()
- Get only deleted documents

```js
User.find({}).onlyDeleted();
```
#### .withDeleted()
- Get both types of documents (deleted + not deleted)

```js
User.find({}).withDeleted();
```

## Usage Example of static functions

In the above, I have declared a model named **User**. Now I am giving examples using the **User** model.

#### Model.softDelete(query)
- Soft delete the matched documents by query

```js
User.softDelete({ role: "user" });
```

#### Model.softDeleteById(_id)
- Soft delete the document by _id

```js
const _id = "6405d153a208cbfd7b88b0c5";
User.softDeleteById(_id);
```

#### Model.restoreById(_id)
- Restore the deleted document by _id

```js
const _id = "6405d153a208cbfd7b88b0c5";
User.restoreById(_id);
```

#### Model.restore(query)
- Restore the matched deleted documents by query

```js
const _id = "6405d153a208cbfd7b88b0c5";
User.restoreById(_id);
```

#### Model.restoreAll()
- Restore all deleted documents

```js
User.restoreAll();
```

#### Model.forceDeleteById(_id)
- Permanently delete a document by _id

```js
const _id = "6405d153a208cbfd7b88b0c5";
User.forceDeleteById(_id);
```

#### Model.forceDelete(query)
- Permanently delete the matched documents by query

```js
User.forceDeleteById({ role: "sub-admin" });
```

## Usage Example in TypeScript

#### Creating a model

```js
const User = mongoose.model<IUserDoc, Model<IUserDoc, IQueryHelpers<IUserDoc>>>('User', userSchema);
```

Heder, **IUserDoc** is the interface of user, **Model** is imported from mongoose, and **IQueryHelpers** is imported from **soft-deleting-mongoose** package.
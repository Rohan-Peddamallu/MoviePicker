import { InferSchemaType, Schema, model } from "mongoose";

const UserSchema = new Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},

},
{timestamps: true}
);

type User = InferSchemaType<typeof UserSchema>;

export default model<User>('User', UserSchema);
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true, collection: 'users' })
export class User {
  @Prop({ required: true, type: mongoose.Schema.Types.String })
  name: string;

  @Prop({ required: true, type: mongoose.Schema.Types.String, unique: true })
  email: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

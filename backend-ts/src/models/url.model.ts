import mongoose, { Document, Schema, Types } from 'mongoose';

interface UrlDocument extends Document {
  original_url: string;
  short_id: string;
  expiration_date?: Date;
  starting_date: Date;
  app_id?: Types.ObjectId;
  title?: string;
  description?: string;
  status: 'active' | 'expired' | 'draft';
  stats: { total_visitor: number };
  createdAt: Date;
  updatedAt: Date;
}

const urlSchema: Schema<UrlDocument> = new Schema(
  {
    original_url: { type: String, required: true },
    short_id: { type: String, required: true, unique: true },
    expiration_date: { type: Date },
    starting_date: { type: Date, default: Date.now() },
    app_id: { type: Types.ObjectId },
    title: String,
    description: String,
    status: {
      type: String,
      enum: ['active', 'expired', 'draft'],
      default: 'active',
    },
    stats: { total_visitor: { type: Number, default: 0 } },
  },
  { timestamps: true }
);

const UrlModel = mongoose.model<UrlDocument>('urls', urlSchema);

export default UrlModel;

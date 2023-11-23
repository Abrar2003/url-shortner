// import mongoose, { Schema, Document, Types } from "mongoose";

// interface AccessLog extends Document {
//   url_id: Types.ObjectId;
//   ip_address: string;
//   visit_time: Date;
// }

// const accessLogSchema: Schema<AccessLog> = new Schema({
//   url_id: { type: mongoose.Schema.Types.ObjectId, ref: "urls" },
//   ip_address: { type: String, required: true },
//   visit_time: { type: Date },
// });

// export default mongoose.model<AccessLog>("logs", accessLogSchema);


import mongoose, { Document, Schema, Types } from 'mongoose';

interface AccessLogDocument extends Document {
  url_id: Types.ObjectId | string;
  ip_address: string;
  visit_time?: Date;
  referrer: string;
}

const accessLogSchema: Schema<AccessLogDocument> = new Schema({
  url_id: { type: mongoose.Schema.Types.ObjectId, ref: 'urls' },
  ip_address: { type: String, required: true },
  visit_time: { type: Date },
  referrer: { type: String }
});

const AccessLogModel = mongoose.model<AccessLogDocument>('logs', accessLogSchema);

export default AccessLogModel;

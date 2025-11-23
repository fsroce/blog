import mongoose, { Document, Schema } from 'mongoose';

export interface IPost extends Document {
  title: string;
  content: string;
  excerpt: string;
  author: mongoose.Types.ObjectId;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const postSchema = new Schema<IPost>({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  excerpt: {
    type: String,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  published: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

postSchema.index({ author: 1 });
postSchema.index({ createdAt: -1 });

export default mongoose.model<IPost>('Post', postSchema);

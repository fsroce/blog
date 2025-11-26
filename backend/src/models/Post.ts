import mongoose, { Document, Schema } from 'mongoose';

export interface IPost extends Document {
  title: string;
  content: string;
  excerpt: string;
  author: mongoose.Types.ObjectId;
  published: boolean;
  tags: string[];
  likes: mongoose.Types.ObjectId[];
  viewCount: number;
  coverImage?: string;
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
  tags: {
    type: [String],
    default: [],
    index: true,
  },
  likes: {
    type: [Schema.Types.ObjectId],
    ref: 'User',
    default: [],
  },
  viewCount: {
    type: Number,
    default: 0,
  },
  coverImage: {
    type: String,
  },
}, {
  timestamps: true,
});

postSchema.index({ author: 1 });
postSchema.index({ createdAt: -1 });
postSchema.index({ tags: 1 });

export default mongoose.model<IPost>('Post', postSchema);

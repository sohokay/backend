import mongoose from 'mongoose';
import {generateUUID} from '../../middleware/uuid';
const AlbumSchema = new mongoose.Schema(
    {
      _id: {type: String, default: generateUUID(),},
      name: {type: String, required: true,},
      coverImage: {type: String, required: true,},
      createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true,},
      created_at: {type: Date, default: Date.now,},
      updated_at: {type: Date, default: Date.now,},
      description: {type: String,},
      articles: [{type: mongoose.Schema.Types.ObjectId, ref: 'Article',},],
    },
    {
      toJSON: {virtuals: true},
      toObject: {virtuals: true},
    }
);
AlbumSchema.pre('save', function (next) {
  const now = Date.now();

  if (!this.created_at) {
    this.created_at = now;
  }

  this.updated_at = now;

  next();
});

const Album = mongoose.model('Album', AlbumSchema);
export default Album;

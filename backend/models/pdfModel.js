import mongoose from 'mongoose';

const pdfSchema = new mongoose.Schema({
  filename: String,
  uploadDate: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const PDF = mongoose.model('PDF', pdfSchema);

export default PDF;
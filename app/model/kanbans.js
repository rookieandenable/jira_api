module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
 
  const KanbansSchema = new Schema({
    id: {
      type: Number
    },
    name: { type: String },
    sort: { type: Number },
    projectId: { type: Number },
    children: {
      type: [{
        created: {
          type: Number,
          default: Date.now()
        },
        id: { type: Number },
        sort: { type: Number },
        name: { type: String },
        typeId: { type: Number }
      }],
      default: []
    } 
  });
 
  return mongoose.model('kanbans', KanbansSchema, 'kanbans')
}
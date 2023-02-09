module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
 
  const EpicSchema = new Schema({
    id: {
      type: Number
    },
    created: {
      type: Number,
      default: Date.now()
    },
    end: {
      type: Number,
      default: Date.now()
    },
    name: { type: String },
    projectId: { type: Number }      
  });
 
  return mongoose.model('epics', EpicSchema, 'epics')
}
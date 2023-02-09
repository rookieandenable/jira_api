module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
 
  const CounterSchema = new Schema({
    projectsId: { type: Number  },
    epicsId: { type: Number },
    kanbanGroupId: { type: Number },
    kanbanId: { type: Number },
  });
 
  return mongoose.model('counter', CounterSchema, 'counter')
}
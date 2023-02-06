module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
 
  const ProjectsSchema = new Schema({
    name: { type: String  },
    personId: { type: Number  },
    organization: { type: String },
    id: { type: Number },
    created: { type: Number, default: Date.now() },
    ownerId: { type: Number, default: 3809310837 },
    enshrine: { type: Boolean, default: false },
  });
 
  return mongoose.model('projects', ProjectsSchema, 'projects')
}
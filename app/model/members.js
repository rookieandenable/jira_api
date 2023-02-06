module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
 
  const MembersSchema = new Schema({
    name: { type: String  },
    organization: { type: String },
    id: { type: Number },
    ownerId: { type: Number },
  });
 
  return mongoose.model('members', MembersSchema, 'members')
}
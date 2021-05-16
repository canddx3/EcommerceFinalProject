const mongoose = require('mongoose');

const { Schema } = mongoose;

const OrderSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  address: String,
  state: String,
  country: String,
  zip: String,
  items: [{ type: Schema.Types.ObjectId, ref: 'Product'}]
});

module.exports = mongoose.model('Order', OrderSchema);
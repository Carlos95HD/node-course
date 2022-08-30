const { Schema, model, SchemaTypes } = require('mongoose');

const CategoriaSchema = Schema({
  nombre: {
    type: String,
    require:[true, 'El nombre es obligatorio'],
    unique: true,
  },
  estado: {
    type: Boolean,
    default: true,
    require: true
  },
  usuario : {
    type: SchemaTypes.ObjectId,
    ref: 'Usuario',
    required: true
  }
});

CategoriaSchema.methods.toJSON = function () {
  const { __v, estado, ...data } = this.toObject();
  return data;
}

module.exports = model('Categoria', CategoriaSchema);
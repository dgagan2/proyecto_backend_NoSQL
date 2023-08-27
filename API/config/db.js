const mongoose = require('mongoose')
const connectDB =async()=>{
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB Connected: ${connection.connection.host} `)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}
const disconnectDB = ()=>{
    mongoose.disconnect()
    .then(() => {
        console.log('Conexión a la base de datos cerrada');
      })
      .catch(err => {
        console.error('Error al cerrar la conexión:', err);
      })
}
module.exports={ connectDB, disconnectDB}
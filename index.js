import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors';
import fileupload from 'express-fileupload';


import conectarDB from './config/db.js'
import usuariosRoutes from './routes/usuarioRoutes.js'
import peliculasRoutes from './routes/peliculasRoutes.js'
import comentariosRoutes from './routes/comentariosRoutes.js'
import puntajeRoutes from './routes/puntajeRoutes.js'
import horarioRoute from './routes/horariosRoutes.js'
import reservacionRoutes from './routes/reservacionRoutes.js'
import cinemaRoutes from './routes/cinemaRoutes.js'

const port = process.env.port || 4000;
dotenv.config();

const app = express();
app.use(express.json());

app.use(fileupload({
    useTempFiles: true,
    tempFileDir: './files'
}))

conectarDB();

// const whitelist = ['http://127.0.0.1:5173']

// app.use(cors({
//     origin: whitelist
// }));


const dominiosPermitidos = [process.env.FRONTEND_URL];
const corsOptions = {
          origin: function(origin, callback){
          if(dominiosPermitidos.indexOf(origin) !== -1){
//El origen del Request esta permitido
          callback(null, true);
         }else{
           callback(new Error('No permitido por CORS'));
     }
      }
  };

app.use(cors(corsOptions)); 

//GESTION USUARIOS
app.use('/api/usuarios', usuariosRoutes);

//GESTION Productos
app.use('/api/peliculas', peliculasRoutes);

//GESTION Ventas
app.use('/api/reservacion', reservacionRoutes);

//GESTION COMENTRAIOS
app.use('/api/comentarios', comentariosRoutes);

//Gestion Puntuaciones
app.use('/api/puntaje', puntajeRoutes);

//Gestio Horarios
app.use('/api/horarios', horarioRoute);

//GESTION CINEMAS
app.use('/api/cinemas', cinemaRoutes)


app.listen(port, () => {
    console.log(`El servidor esta funcionando holiwi`)
});

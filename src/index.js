// Importamos las dependencias necesarias
import express from 'express';
import morgan from 'morgan';
import { engine } from 'express-handlebars';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

import clientesRoutes from './routes/clientes.routes.js'

// Inicialización
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

// Configuraciones (Settings)
app.set('port', process.env.PORT || 3000);
app.set('views', join(__dirname, 'views'));  // Configurando carpeta para las vistas

// Configuramos el motor de plantillas (Handlebars)
app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutsDir: join(app.get('views'), 'layouts'),
    partialsDir: join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

// Middlewares
app.use(morgan('dev'));  // Utilizamos morgan para registrar las solicitudes HTTP

// Utilizaremos express para trabajar con interfaces y formularios
app.use(express.urlencoded({ extended: false }));

// Utilizaremos express para trabajar con archivos tipo JSON
app.use(express.json());

// Rutas
app.get('/', (req, res) => {
    res.render('index');
});

app.use(clientesRoutes);

// Public Files
// Usamos express.static para servir archivos estáticos como imágenes, CSS, y JavaScript desde la carpeta 'public'
app.use(express.static(join(__dirname, 'public')));

// Arrancar el servidor
app.listen(app.get('port'), () => {
    console.log('Cargando el puerto', app.get('port'));
});

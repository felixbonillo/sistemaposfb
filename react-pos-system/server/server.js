process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';


//Express para crear el servidor
const express = require('express');

//Axios para hacer peticiones HTTP
const axios = require('axios');

//Cheerio para analizar el HTML
const cheerio = require('cheerio');

//Cors para permitir peticiones desde el front-end
const cors= require('cors');

const app = express();
const PORT = 3001;

//Middleware para permitir peticiones CORS
app.use(cors());
//Habilitamos el uso del JSON para el uso de las peticiones
app.use(express.json());

//Definimos URL de la pagina del BCV que contiene la tasa del dolar
const BCV_URL = 'https://www.bcv.org.ve/';

//Creamos endpoint de API para obtener la tasa real
app.get('/api/rate', async (req, res) => {
    try {
        //1. Hacemos una peticion HTTP a la pagina del BCV usando Axios
        console.log('Iniciando web scraping de la pagina del BCV...');
        const { data } = await axios.get(BCV_URL);

        //2. Cargamos el HTML de la pagina en Cheerio para poder analizarlo
        const $ = cheerio.load(data);

        //3. Buscamos el elemento HTML que contiene la tasa del dolar
        //Nota: Si el BCV cambia su HTML, este selector fallara

        const usdRateElement = $('#dolar').find('strong').text();

        //4. Limpiamos el texto extraido (Quitamos las comas y los espacios)
        const cleanedRate = usdRateElement.replace(',', '.');
        const rateValue = parseFloat(cleanedRate);

        //5. Verificamos que el valor sea un numero valido
        if (isNaN(rateValue)) {
            console.error('No se pudo encontrar la tasa de cambio en la pagina del BCV');
            return res.status(500).json({ error: 'No se pudo extraer la tasa de cambio del BCV'}); 
        }

        console.log(`Tasa de cambio obtenida: ${rateValue}`);

        //6. Enviamos la tasa en formato JSON al frontend
        res.json({
            rate: rateValue,
            source: BCV_URL,
            lastUpdated: new Date().toISOString()
        })

    } catch (error) {
        console.error('Error durante el web scraping:', error.message);
        //Enviamos una respuesta de error si algo sale mal
        res.status(500).json({ error: 'Error al obtener la tasa de BCV', details: error.message})
    }
});

//Iniciamos el servidor
app.listen(PORT, () => {
    console.log(`Servidor de la API corriendo en http://localhost:${PORT}`);
});
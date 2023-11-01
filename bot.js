const qrcode = require('qrcode-terminal');
const {  OpenAI } = require("openai");
//const OPENAI_API_KEY= require("api.py")

/*Crea una sesión con whatsapp-web y la guarda localmente para autenticarse 
solo una vez por QR*/
const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const client = new Client({
    authStrategy: new LocalAuth()
});


// OPEN AI
OPENAI_API_KEY= "ingrese_aqui_su_api_key";

const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
  });
//   const openai = new OpenAIApi(configuration);

  


//instanciar el cliente de OpenAI

let isFirstTime = true;
//? ante la duda, otra flag
let isChattingWithBot = false;

//Genera el código qr para conectarse a whatsapp-web
client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

//Si la conexión es exitosa muestra el mensaje de conexión exitosa
client.on('ready', () => {
    console.log('servidor conectado :)');
});




//! INICIO DEL CHATBOT
client.on('message',async msg => {
    

    /*
    **guardamos el mensaje del usuario en una variable que lo convierte en minuscula
    */
    console.log({isFirstTime})
    var lower_msg = msg.body.toLowerCase(); 

    console.log(msg.body);
    if(msg.from === "595991588094@c.us") {

    /*
    ** El primer mensaje - 
    */
    if (!isChattingWithBot && isFirstTime && lower_msg != '') {
        client.sendMessage(msg.from, `Hola soy 🌸Ripple🌸 soy un bot programado para orientar tanto a mujeres como hombres a través de diversos temas relacionados con la brecha de desigualdad que presenta Paraguay en cuanto al género
        Te puedo guiar por diversos temas relacionados:
        1. Noticias y Estadísticas: ¡Conocer y comprender la realidad actual es el primer paso para el cambio!
        2. Mujeres Inspiradoras: Buscas inspiración? a pesar de todo el estigma social estas mujeres son símbolo de superación.
        3. Fundaciones: El apoyo entre mujeres es esencial para romper con las dificultades que se presentan, te muestro algunas de las fundaciones de mujeres para mujeres. 
        4. Talleres: ¡Únicamente aprendiendo más sobre el mundo podemos entenderlo y cambiarlo!
        5. Hacer preguntas directas a nuestra bot!

    Responda con 1, 2, 3, 4 o 5
    _Para finalizar responda con "salir_"
        `)
        
        isFirstTime = false; //?FINALIZA EL SALUDO
        
    }


    /*
    ** PRIMER CUADRO => NOTICIAS Y ESTADISTICAS
    */ 
    else if (!isChattingWithBot && !isFirstTime && lower_msg === '1') {
        client.sendMessage(msg.from, `Elige entre:
    - EQUIDAD: Desafíos de la mujer paraguaya
    - BRECHA: Mundo Digital
    - CONEXION: Observatorio de mujeres
        
    Responde con "EQUIDAD", "BRECHA", o "CONEXION".
    _Para finalizar responda con "salir" o 0 para volver al inicio_`)

    } 

    /*
    ** OPCIONES
    */
    else if (!isChattingWithBot && !isFirstTime && lower_msg === 'equidad') {
    client.sendMessage(msg.from, `Puedes elegir una de estas opciones:
    a) Brecha salarial
    b) Acceso a la atención médica
    c) Acceso a la educación

    Responde con a, b o c 
    _Para finalizar responda con "salir" o 0 para volver al inicio_`)

        } 
        /*
        ** MAS OPCIONES
        */
        else if (!isChattingWithBot && !isFirstTime && lower_msg === "a") {
        client.sendMessage(msg.from, `Las mujeres a menudo ganan menos que los hombres por el mismo trabajo o trabajos de igual valor. La brecha salarial de género es un desafío significativo.
        Para eso debemos fomentar la participación de las mujeres en la economía formal y apoyar el emprendimiento femenino es esencial para la igualdad económica.
        
    _Para finalizar responda con "salir" o 0 para volver al inicio_`)
        } 

        else if (!isChattingWithBot && !isFirstTime && lower_msg === "b") {
        client.sendMessage(msg.from, `Garantizar que las mujeres tengan acceso a servicios de salud de calidad, incluyendo salud reproductiva, es fundamental para su bienestar.
        
    _Para finalizar responda con "salir" o 0 para volver al inicio_`)
        } 

        else if (!isChattingWithBot && !isFirstTime && lower_msg === "c") {
        client.sendMessage(msg.from, `Aunque ha habido mejoras en el acceso a la educación, las mujeres rurales y de bajos recursos todavía enfrentan desafíos para acceder a una educación de calidad.
        
     _Para finalizar responda con "salir" o 0 para volver al inicio_`)


    } else if (!isChattingWithBot && !isFirstTime && lower_msg === 'brecha') {
    client.sendMessage(msg.from, `Según la UNESCO, los hombres tienen 25% más probabilidad de contar con los conocimientos y habilidades para usar la tecnología que las mujeres.
    Asímismo, según la CEPAL en América Latina, 40% de las mujeres no están conectadas o no pueden costear el acceso al Internet.
    En el mundo laboral, un estudio de la organización Women who Tech, las mujeres que deciden entrar en el mundo de la tecnología a menudo se enfrentan a un entorno abiertamente hostil, con una notable brecha salarial (21 %) y tasas de promoción considerablemente inferiores (52 mujeres por cada 100 hombres).
    Casi la mitad (48 %) afirma haber sufrido acoso en el lugar de trabajo. Y un escalofriante 22% afirma haber valorado la posibilidad de dejar el trabajo debido al trato recibido en el sector.
    
    _Para finalizar responda con "salir" o 0 para volver al inicio_`)

    } 
    
    else if (!isChattingWithBot && !isFirstTime && lower_msg === 'conexion') {
    client.sendMessage(msg.from, `Es una herramienta que hace posible que datos relacionados a violencia contra las mujeres estén sistematizados, visibilizados y contribuyan a mejorar las políticas públicas de prevención y de cuidado.
    1. Generar una red de información interinstitucional con todos los servicios de atención y protección a las mujeres en situación de violencia pública o privada;
    2. Establecer relaciones con otros Observatorios y redes sobre violencia hacia las mujeres;
    3. Realizar estudios e investigaciones sobre la violencia contra las mujeres en coordinación con instituciones públicas y organizaciones no gubernamentales; y,
    4. Presentar informes periódicos al Ministerio de la Mujer.
    
    _Para finalizar responda con "salir" o 0 para volver al inicio_`)}


    /*
    ** SEGUNDO CUADRO => MUJERES INSPIRADORAS
    */
    else if(!isChattingWithBot && !isFirstTime && lower_msg === '2') {
        client.sendMessage(msg.from, `=> Mujeres Inspiradoras:
        - CAMBIO: Pamela Boveda
        - CIENCIA: Alejandra Fresco
        - ARTE: Berta Rojas
        
        Para saber mas responda con "CAMBIO", "CIENCIA", "ARTE" o 0 para volver al inicio
        _Para finalizar responda con "salir" o 0 para volver al inicio_`);

    }
    /*
    **OPCIONES
    */
    else if (!isChattingWithBot && !isFirstTime && lower_msg === 'cambio') {
        client.sendMessage(msg.from, ` CAMBIO: Pamela Boveda
        Ingeniera aeronáutica y artemarcialista, se describe a sí misma como una persona persistente y con objetivos claros, quien busca adaptarse a los cambios en el afán de mejorar continuamente tanto en lo deportivo como profesional y personal.
        
    _Para finalizar responda con "salir" o 0 para volver al inicio_`);
    
    } else if(!isChattingWithBot && !isFirstTime && lower_msg === 'ciencia') {
        client.sendMessage(msg.from, `CIENCIA: Alejandra Fresco
        Es científica investigadora, astrónoma y actualmente trabaja en el ámbito de estas disciplinas en el Instituto Max Planck de Alemania. “Básicamente, trabajo estudiando el universo”, recalca.
        
     _Para finalizar responda con "salir" o 0 para volver al inicio_`);
    
    }  else if(!isChattingWithBot && !isFirstTime && lower_msg === 'arte') {
        client.sendMessage(msg.from, `ARTE: Berta Rojas
        No necesita mayor presentación: “Soy música, guitarrista, concertista. Me considero una persona trabajadora, que intenta ser agradecida con la vida, alguien que intenta dar gracias por la hermosa vida que tiene y, a través de la música, intento retribuir en parte tanto de lo que recibo.
        
    _Para finalizar responda con "salir" o 0 para volver al inicio_`)
   
    } 



    /*
    ** TERCER CUADRO => QUIERO SABER MAS
    */
    else if(!isChattingWithBot && !isFirstTime && lower_msg === '3') {
        client.sendMessage(msg.from, `=> QUIERO SABER MAS:
        - COMUNIDAD: Ciudad Mujer
        - MINISTERIO: Ministerio de la mujer
        - EPEP: Asociación Paraguaya de Empresarias

        Para saber mas responda con "COMUNIDAD", "MINISTERIO", "EPEP"
    _Para finalizar responda con "salir" o 0 para volver al inicio_`);

    }
    /*
    **OPCIONES
    */
    else if(!isChattingWithBot && !isFirstTime && lower_msg === 'comunidad') {
        client.sendMessage(msg.from, `COMUNIDAD: Ciudad Mujer
        Ciudad Mujer busca promover el empoderamiento y la autonomía real de las mujeres  a través de servicios de salud sexual y reproductiva, apoyo para el empleo y para empezar o mejorar emprendimientos propios, además de asesoramiento, contención y asistencia ante cualquier caso de violencia contra la  mujer.
        
        _Para finalizar responda con "salir" o 0 para volver al inicio_`)
    } else if(!isChattingWithBot && !isFirstTime && lower_msg === 'ministerio') {
        client.sendMessage(msg.from, `Ministerio de la mujer
        Cual es la funcion del ministerio de la mujer?
        Tiene como misión brindar servicios públicos confiables y con una cálida atención, dirigidos exclusivamente a las mujeres, contribuyendo a su desarrollo, autonomía y crecimiento personal en todos los ámbitos de la vida
        
        _Para finalizar responda con "salir" o 0 para volver al inicio_`);

    
    } else if(!isChattingWithBot && !isFirstTime && lower_msg === 'apep') {
        client.sendMessage(msg.from, `APEP: Asociación Paraguaya de Empresarias
        Asociación Paraguaya de Empresarias, Ejecutivas y Profesionales-APEP, una entidad civil, apolítica, sin fines de lucro que obtiene su personería Jurídica Decreto N° 16851/93 el 18 de mayo. 
        Así, gracias al esfuerzo y compromiso de este grupo de mujeres visionarias, APEP es hoy referente nacional e internacional en los ámbitos empresarial, profesional, cultural y económico-social.
        
        _Para finalizar responda con "salir" o 0 para volver al inicio_`);

    }


    /*
    ** TERCER CUADRO => TALLERES
    */
    else if(!isChattingWithBot && !isFirstTime && lower_msg === '4') {
        client.sendMessage(msg.from, `=> TALLERES:
        - AUTONOMIA: Ciudad Mujer
        - SNPP: Servicio Nacional de Promoción Profesional

        Para saber mas responda con "AUTONOMIA", "SNPP" 
        _Para finalizar responda con "salir" o 0 para volver al inicio_`);

    }
    /*
    **OPCIONES
    */
    else if(!isChattingWithBot && !isFirstTime && lower_msg === 'autonomia') {
        client.sendMessage(msg.from, `AUTONOMIA: Ciudad Mujer
        (Empoderamiento economico) Este Módulo es coordinado por el Ministerio de Trabajo, Empleo y Seguridad Social y busca promover la generación de ingresos propios, mejorando las competencia para el empleo y acompañando la generación de emprendimientos productivos. 
        
     _Para finalizar responda con "salir" o 0 para volver al inicio_`);

    }

    else if(!isChattingWithBot && !isFirstTime && lower_msg === 'snpp') {
        client.sendMessage(msg.from, `SNPP: Servicio Naciononal de Promocion Profesional 
        Los cursos van dirigidos a personas  diferentes niveles y sectores de la economía, abarcando todo el territorio nacional a través de su sede central, las regionales, subregionales, centros colaboradores y unidades móviles que permiten llegar a cualquierde punto del país en modalidad presencial y virtual
        
     _Para finalizar responda con "salir" o 0 para volver al inicio_`);

    }

    //?RESPUESTA NUMERO 5
    else if(!isChattingWithBot && !isFirstTime && lower_msg === '5') {
        client.sendMessage(msg.from, `¡Hola! 🌸 Estoy aquí para hablar sobre la brecha de género y fomentar la comprensión. Si tienes curiosidad o preguntas sobre este tema, por favor, siéntete libre de preguntar. Estoy aquí para ayudarte en lo que necesites.
        `);
        isChattingWithBot = true;
    }

    //?RESPUESTA DE LA IA
    else if (isChattingWithBot) {
        if (msg.body === 'salir'){
        

        //!MENSAJE PARA SALIR DE LA IA
        
            isChattingWithBot = false;
        } else{
            await runCompletion(msg.body.substring(1)).then(result => msg.reply(result));
       
            client.sendMessage(msg.from, `_Para finalizar responda con "salir"_`);
        }
    }

    /*
    ** Volver al inicio
    */
   else if(!isFirstTime && lower_msg === '0') {
    client.sendMessage(msg.from, `Te puedo guiar por diversos temas relacionados. Sobre que te gustaría conocer?
    1. Noticias y Estadísticas: ¡Conocer la situación actual en cuanto a cifras y el impacto que tienen nuestras acciones es el primer paso para el cambio!
    2. Mujeres Inspiradoras: Buscas inspiración? a pesar de todo el estigma social estas mujeres son símbolo de superación.
    3. Fundaciones: El apoyo entre mujeres es esencial para romper con las dificultades que se presentan, te muestro algunas de las fundaciones de mujeres para mujeres. 
    4. Talleres: ¡Unicamente aprendiendo mas sobre el mundo podemos entenderlo y cambiarlo!
    5. Hacer preguntas directas a nuestra bot!

    Responda con 1, 2, 3, 4 o 5
    _Para finalizar responda con "salir"_
    `)
   }

 
   //?DESPEDIDA
   if(!isChattingWithBot &&!isFirstTime && lower_msg === 'salir'){
    client.sendMessage(msg.from, `Cada conversación nos acerca a un mundo más inclusivo. ¡Hasta pronto!`);
    
   }
}
});


async function runCompletion (message) {
    const completion = await openai.chat.completions.create({
        messages: [{role:'user', content: message}],
        model: 'gpt-3.5-turbo'
    });
    console.log(JSON.stringify(completion))
    return completion.choices[0].message.content;
}

//! Enviar imagenes desde URL's
/*let url = "https://wwebjs.dev/logo.png";
const media = await MessageMedia.fromUrl(url);
media.mimetype = "image/png";
media.filename = "cosito.png";
client.sendMessage(msg.from, media, {caption: "Image"}); 
//! Enviar imagenes desde archivo
let filePath = "./assets/Jk5JBkOw_400x400.jpg";
const mediaDesdePath = MessageMedia.fromFilePath(filePath);
media.mimetype = "image/jpg";
media.filename = "gatofumandoPorro.jpg";
client.sendMessage(msg.from, mediaDesdePath, {caption: "Image"});

*/


client.initialize();
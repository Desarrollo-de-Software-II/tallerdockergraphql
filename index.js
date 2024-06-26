const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const path = require('path'); 

// Define el esquema de GraphQL
const typeDefs = gql`
  type Query {
    hello(message: String!): String 
    AboutYhanC: String
    AboutKevinV: String
    AboutMorenoMiguelAngel: String
    AboutJuanCifuentes: String
    AboutDavidUrrego: String
    AboutEmanuelRivas : String
    AboutSantiagoDuque : String
    AboutAndresZapata: String
  }
`;

// Define los resolvers de GraphQL
const resolvers = {
  Query: {
    hello: (_, { message }) => {
        return `¡Hola, ${message}! Un saludo por parte del profe `;
      },
    AboutYhanC: () => {
        return `Soy Yhan Carlos Trujillo, me gusta el baloncesto, mi saga favorita es Harry Potter, me encanta el anime, no me gustan las redes sociales, 
        me encanta aprender cosas nuevas, mi sueño frustado es ser fisico y me apasionan los robots y la IA, me gusta el arte pero
        lamentablemente no sé dibujar a mano alzada y mi pintor favorito es Vincent van Gogh`;
      }, 
    AboutKevinV: () => {
        return `Soy Kevin Velez y en mi tiempo suelo jugar Ajedrez. Mis juegos digitales favoritos son Terraria y Brawl Stars`;
      },
    AboutMorenoMiguelAngel: () => {
        return `Mi nombre es Moreno Miguel, suelo decir mucho "gente madrugadora", 
        me gusta la bioinformática, y el único deporte que me gusta es patinaje`;
      },
    AboutJuanCifuentes: () => {
        return `Mi nombre es Juan Cifuentes, y llevo 10 semestres en esta universidad, 
        me gusta jugar LOL (mentiras, lo odio)`;
      },
      AboutDavidUrrego: () => {
        return `Mi nombre es David Urrego, bebo unas diez tazas de café al día, me gustan los juegos de
        estrategia desde ajedrez hasta Age of Empires o Total War; Disfruto charlar sobre historia
        y filosofía`;
      },
      AboutEmanuelRivas: () => {
        return `¡Hola, Soy Emanuel A. Rivas, de pequeño me rompí la cabeza jugando jasja. En mi tiempo libre me gusta leer sobre filosofía y música, mis autores favoritos son Kafka, Camus y Dostoesvky`;
      },
      AboutSantiagoDuque: () => {
        return `Hola, soy Santiago Duque. Me gustan mucho los videojuegos, aunque no tengo un género preferido muy claro. Algunos de mis juegos
        favoritos son Hollow Knight y XCOM 2. También me gusta mucho la música, especialmente las canciones de Kendrick Lamar y Kanye West.
        Fuera de la ingeniería de sistemas, me llaman mucho la atención la Física y la Química`;
      },
      AboutAndresZapata: () => {
        return `Mi nombre es Andrés, mi pasatiempo favorito es bailar salsa, actualmente pertenezco a la selección de salsa de la 
      Universidad donde hemos ganado regionales y nacionales. Hice un semestre en la tecnología de sistemas y al siguiente me 
      pasé a la ingeniería, lo cual era mi sueño. :)`;
      },
  },
};

async function startApolloServer() {
  // Crea la instancia de Apollo Server
  const server = new ApolloServer({ typeDefs, resolvers });

  // Inicia el servidor Apollo
  await server.start();

  // Crea la aplicación Express
  const app = express();

  // Aplica el middleware de Apollo Server a la aplicación Express
  server.applyMiddleware({ app, path: '/graphql' });

  // Sirve la aplicación de React desde la carpeta "saludofront-app"
   const reactAppPath = path.join(__dirname, 'saludofront-app', 'dist');
    app.use(express.static(reactAppPath));
    app.get('*', (req, res) => {
    res.sendFile(path.join(reactAppPath, 'index.html'));
    });

  // Inicia el servidor
  const PORT = 4000;
  app.listen(PORT, () => {
    console.log(`Servidor GraphQL ejecutándose en http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startApolloServer();


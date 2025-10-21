import { Faker } from "k6/x/faker"

/**
 * Generador de data aleatoria
 * Más detalles aquí https://github.com/szkiba/xk6-faker/blob/master/docs/classes/faker.md
 * @example
  faker.digitN(2); // Ejemplo: "47" o "01"
  faker.uuid(); // Ejemplo: "8b068b56-0707-49e3-b07e-2c4a9a2b1e8d"
  faker.name(); // Ejemplo: "John Doe"
  faker.address().street; // Ejemplo: "123 Calle Falsa, Springfield"
  faker.phone(); // Ejemplo: "(555) 123-4567"
  faker.email(); // Ejemplo: "johndoe@example.com"
  faker.ipv4Address(); // Ejemplo: "192.168.10.1"
  faker.price(1.00,100.00); // Ejemplo: "60.56"
  faker.date(); // Ejemplo: "1943-10-15T05:22:31.371304898Z"
  faker.sentence(10); // Ejemplo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
  faker.paragraph(2,3,10," "); // Ejemplo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
  faker.hexColor(); // Ejemplo: "#6c84a8"
  faker.username(); // Ejemplo: "johndoe123"
  faker.url(); // Ejemplo: "http://www.example.com"
  faker.company(); // Ejemplo: "ACME Corporation"
  faker.jobTitle(); // Ejemplo: "Senior Developer"
 */
const faker = new Faker();


export default faker;


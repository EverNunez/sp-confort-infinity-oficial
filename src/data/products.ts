// =============================================================
//  CATÁLOGO DE PRODUCTOS (datos reales del cliente)
//  Fuente del seed (prisma/seed.ts) y fallback público.
//  TODOS los productos tienen foto real en /public/products.
//  Categorías fijas (v1) alineadas a lo que maneja el cliente.
// =============================================================

export type CategoryId =
  | "inodoros"
  | "bachas"
  | "griferias-lavatorio"
  | "griferias-cocina"
  | "griferias-ducha"
  | "termocalefones"
  | "motores";

export interface Category {
  id: CategoryId;
  label: string;
}

export type StockStatusValue = "IN_STOCK" | "ON_REQUEST" | "OUT_OF_STOCK";

export const CATEGORIES: Category[] = [
  { id: "inodoros", label: "Inodoros" },
  { id: "bachas", label: "Bachas" },
  { id: "griferias-lavatorio", label: "Griferías para lavatorio" },
  { id: "griferias-cocina", label: "Griferías para cocina" },
  { id: "griferias-ducha", label: "Griferías para ducha" },
  { id: "termocalefones", label: "Termocalefones" },
  { id: "motores", label: "Motores" },
];

export interface Product {
  id: string;
  name: string;
  category: CategoryId;
  categoryLabel: string;
  brand?: string;
  shortDescription: string;
  details: string;
  benefits: string[];
  price?: string; // opcional — si se omite se muestra "Consultar precio"
  image: string; // ruta dentro de /public (siempre foto real)
  stockStatus?: StockStatusValue;
}

const categoryLabel = (id: CategoryId) =>
  CATEGORIES.find((c) => c.id === id)?.label ?? "";

function p(data: Omit<Product, "categoryLabel">): Product {
  return { ...data, categoryLabel: categoryLabel(data.category) };
}

export const PRODUCTS: Product[] = [
  // ---------------- INODOROS ----------------
  p({
    id: "inodoro-celite-elite",
    name: "Inodoro Celite Elite Blanco",
    category: "inodoros",
    brand: "Celite",
    shortDescription:
      "Kit completo de inodoro Celite Elite blanco, listo para instalar.",
    details:
      "Solución completa Celite Elite: inodoro con mochila acoplada, tapa, accesorios de fijación y conexión. Loza blanca esmaltada de alta resistencia y descarga eficiente.",
    benefits: [
      "Kit completo listo para instalar",
      "Descarga eficiente",
      "Loza esmaltada fácil de limpiar",
    ],
    image: "/products/celite-elite-blanco.jpg",
  }),
  p({
    id: "inodoro-incepa-avant", // slug estable
    name: "Inodoro Roca Nexo",
    category: "inodoros",
    brand: "Roca",
    shortDescription:
      "Kit de inodoro Roca Nexo con mochila acoplada, fácil y práctico.",
    details:
      "Kit de inodoro Roca Nexo con mochila acoplada, tapa y accesorios. Líneas modernas, gran prestación y el respaldo de la marca Roca para baños actuales.",
    benefits: [
      "Marca Roca de prestigio",
      "Kit completo con accesorios",
      "Líneas modernas y limpias",
    ],
    image: "/products/roca-nexo.jpg",
  }),
  p({
    id: "juego-sanitario-celite-smart", // slug estable
    name: "Inodoro Celite Smart",
    category: "inodoros",
    brand: "Celite",
    shortDescription:
      "Kit completo de inodoro Celite Smart, loza esmaltada de calidad.",
    details:
      "Inodoro Celite Smart con mochila acoplada, tapa y accesorios de instalación. Loza esmaltada con terminaciones finas y líneas modernas para baños actuales.",
    benefits: [
      "Kit completo Celite Smart",
      "Loza esmaltada de calidad",
      "Terminaciones finas y modernas",
    ],
    image: "/products/celite-smart.jpg",
  }),

  // ---------------- BACHAS ----------------
  p({
    id: "lavatorio-apoyo-ovalado", // slug estable
    name: "Bacha Roca Inspira Round Blanco",
    category: "bachas",
    brand: "Roca",
    shortDescription:
      "Bacha de apoyo redonda Roca Inspira en blanco, diseño premium.",
    details:
      "Bacha de apoyo redonda de la línea Roca Inspira, en acabado blanco. Una pieza sofisticada que se luce sobre mesadas y muebles, ideal con griferías altas o de pared.",
    benefits: [
      "Diseño redondo premium",
      "Marca Roca de prestigio",
      "Combina con griferías altas",
    ],
    image: "/products/roca-inspira-round.jpg",
  }),
  p({
    id: "bacha-apoyo-rectangular", // slug estable
    name: "Bacha Incepa Platinum P4 Negro",
    category: "bachas",
    brand: "Incepa",
    shortDescription:
      "Bacha de apoyo cuadrada Incepa Platinum en negro mate, look moderno.",
    details:
      "Bacha de apoyo cuadrada de la línea Incepa Platinum (P4) en negro mate. Líneas rectas y aspecto contemporáneo, perfecta para baños minimalistas de diseño.",
    benefits: [
      "Acabado negro mate elegante",
      "Líneas rectas contemporáneas",
      "Pieza protagonista sobre la mesada",
    ],
    image: "/products/incepa-platinum-negro.jpg",
  }),
  p({
    id: "incepa-platinum-rosa",
    name: "Bacha Incepa Platinum P6 Rosa",
    category: "bachas",
    brand: "Incepa",
    shortDescription:
      "Bacha de apoyo cuadrada Incepa Platinum en rosa, tendencia y diseño.",
    details:
      "Bacha de apoyo cuadrada Incepa Platinum (P6) en delicado tono rosa. Una pieza de tendencia que aporta personalidad y calidez a baños de diseño.",
    benefits: [
      "Color rosa de tendencia",
      "Líneas rectas contemporáneas",
      "Loza de alta resistencia",
    ],
    image: "/products/incepa-platinum-rosa.jpg",
  }),
  p({
    id: "incepa-platinum-gris",
    name: "Bacha Incepa Platinum P5 Gris",
    category: "bachas",
    brand: "Incepa",
    shortDescription:
      "Bacha de apoyo cuadrada Incepa Platinum en gris, sobria y elegante.",
    details:
      "Bacha de apoyo cuadrada Incepa Platinum (P5) en gris. Tono neutro y sobrio que combina con cualquier mesada, para baños elegantes y atemporales.",
    benefits: [
      "Tono gris neutro y sobrio",
      "Diseño cuadrado moderno",
      "Combina con cualquier ambiente",
    ],
    image: "/products/incepa-platinum-gris.jpg",
  }),
  p({
    id: "roca-ohtake-cafe",
    name: "Bacha Roca Ohtake Café",
    category: "bachas",
    brand: "Roca",
    shortDescription:
      "Bacha de autor Roca by Ruy Ohtake en tono café, pieza exclusiva.",
    details:
      "Bacha de apoyo de diseño de autor, línea Roca by Ruy Ohtake, en cálido tono café. Formas orgánicas y acabado mate que la convierten en una pieza exclusiva y de lujo.",
    benefits: [
      "Diseño de autor (Ruy Ohtake)",
      "Cálido tono café mate",
      "Pieza exclusiva y premium",
    ],
    image: "/products/roca-ohtake-cafe.jpg",
  }),

  // ---------------- GRIFERÍAS PARA LAVATORIO ----------------
  p({
    id: "fani-cromo-lavatorio-alto", // slug estable
    name: "Fani Retta Lavatorio Alto Cromado",
    category: "griferias-lavatorio",
    brand: "Fani",
    shortDescription:
      "Monocomando alto de líneas rectas para bachas de apoyo, cromado.",
    details:
      "Fani Retta en versión alta, de líneas rectas y acabado cromado espejado. Su altura es ideal para bachas de apoyo, con cierre cerámico preciso y durable.",
    benefits: [
      "Altura ideal para bachas de apoyo",
      "Diseño recto contemporáneo",
      "Acabado cromado espejado",
    ],
    image: "/products/fani-retta-cromado.jpg",
  }),
  p({
    id: "fani-monocomando-lavatorio", // slug estable
    name: "FV Iguazú Lavatorio Alto",
    category: "griferias-lavatorio",
    brand: "FV",
    shortDescription:
      "Monocomando alto FV Iguazú para bachas de apoyo, calidad reconocida.",
    details:
      "Grifería FV Iguazú en versión alta para lavatorios y bachas de apoyo. Respaldada por el prestigio de FV, combina diseño ergonómico con un cierre cerámico de larga vida.",
    benefits: [
      "Marca FV de calidad reconocida",
      "Altura para bachas de apoyo",
      "Cierre cerámico antigoteo",
    ],
    image: "/products/fv-iguazu-alto.jpg",
  }),
  p({
    id: "griferia-pared-lavatorio", // slug estable
    name: "FV Coty Lavatorio Negro",
    category: "griferias-lavatorio",
    brand: "FV",
    shortDescription:
      "Monocomando de lavatorio FV Coty en negro mate, diseño moderno.",
    details:
      "Grifería FV Coty para lavatorio en acabado negro mate. Una pieza de diseño actual que realza baños modernos y minimalistas, con la confiabilidad de FV.",
    benefits: [
      "Acabado negro mate antihuellas",
      "Diseño moderno y sobrio",
      "Marca FV de calidad reconocida",
    ],
    image: "/products/fv-coty-negro.jpg",
  }),
  p({
    id: "deca-lavatorio",
    name: "Deca Monocomando Lavatorio",
    category: "griferias-lavatorio",
    brand: "Deca",
    shortDescription:
      "Monocomando compacto de lavatorio, acabado cromado prolijo.",
    details:
      "Grifería Deca para lavatorio, de diseño compacto y acabado cromado. Manejo monocomando que regula caudal y temperatura, ideal para baños de uso diario.",
    benefits: [
      "Diseño compacto y limpio",
      "Mezcla de temperatura precisa",
      "Acabado cromado resistente",
    ],
    image: "/products/deca-lavatorio.jpg",
  }),
  p({
    id: "celite-saveiro-lavatorio",
    name: "Celite Saveiro Lavatorio",
    category: "griferias-lavatorio",
    brand: "Celite",
    shortDescription:
      "Monocomando de lavatorio Celite Saveiro, cromado y ergonómico.",
    details:
      "Grifería monocomando Celite línea Saveiro para lavatorio, de altura estándar, manija ergonómica y acabado cromado. Combina funcionalidad y estética para baños actuales.",
    benefits: [
      "Manija ergonómica de un toque",
      "Acabado cromado espejado",
      "Aireador que ahorra agua",
    ],
    image: "/products/celite-saveiro-lavatorio.jpg",
  }),

  // ---------------- GRIFERÍAS PARA COCINA ----------------
  p({
    id: "fani-bold-cocina",
    name: "Fani Bold Monocomando Cocina",
    category: "griferias-cocina",
    brand: "Fani",
    shortDescription:
      "Monocomando de cocina con caño alto giratorio, acabado cromado.",
    details:
      "Grifería Fani Bold para cocina, con caño alto giratorio que facilita el lavado de ollas y recipientes grandes. Cierre cerámico preciso y acabado cromado de larga duración.",
    benefits: [
      "Caño alto giratorio",
      "Cierre cerámico antigoteo",
      "Acabado cromado resistente",
    ],
    image: "/products/fani-bold-cocina.jpg",
  }),
  p({
    id: "fani-domus-cocina",
    name: "Fani Domus Monocomando Cocina",
    category: "griferias-cocina",
    brand: "Fani",
    shortDescription:
      "Monocomando de cocina de silueta curva y manejo de un solo toque.",
    details:
      "Fani Domus combina una silueta curva elegante con un manejo monocomando preciso que regula caudal y temperatura con un solo movimiento. Ideal para cocinas modernas.",
    benefits: [
      "Apertura y mezcla con un solo toque",
      "Silueta curva contemporánea",
      "Aireador que optimiza el consumo de agua",
    ],
    image: "/products/fani-domus-cocina.jpg",
  }),
  p({
    id: "fv-temple-cocina", // slug estable
    name: "Docol Monocomando Cocina Negro",
    category: "griferias-cocina",
    brand: "Docol",
    shortDescription:
      "Monocomando de cocina negro mate con caño alto y función mezclador.",
    details:
      "Grifería de cocina Docol en negro mate, con caño alto giratorio y función mezclador. Diseño sobrio y moderno que aporta carácter a cocinas de estilo actual.",
    benefits: [
      "Acabado negro mate elegante",
      "Caño alto giratorio",
      "Función mezclador (agua fría/caliente)",
    ],
    image: "/products/docol-cocina-negro.jpg",
  }),
  p({
    id: "fani-gourmet-cocina-flexible", // slug estable
    name: "Docol Cocina Gourmet Flexible",
    category: "griferias-cocina",
    brand: "Docol",
    shortDescription:
      "Grifería gastronómica con caño flexible extensible, estilo profesional.",
    details:
      "Grifería de cocina Docol tipo gastronómica, con caño flexible extensible que ofrece total libertad de movimiento sobre la pileta. Perfecta para quienes cocinan a diario.",
    benefits: [
      "Caño flexible extensible",
      "Estilo gastronómico profesional",
      "Amplio rango de movimiento",
    ],
    image: "/products/docol-cocina-flexible.jpg",
  }),

  // ---------------- GRIFERÍAS PARA DUCHA ----------------
  p({
    id: "ducha-lluvia-cuadrada", // slug estable
    name: "Celite Saveiro Ducha Embutida",
    category: "griferias-ducha",
    brand: "Celite",
    shortDescription:
      "Monocomando de ducha embutido Celite Saveiro, estética minimalista.",
    details:
      "Monocomando de ducha embutido (de empotrar) línea Celite Saveiro, con desviador. Libera la pared y aporta una estética minimalista y limpia al baño.",
    benefits: [
      "Instalación embutida (de empotrar)",
      "Desviador para ducha/teléfono",
      "Acabado cromado de larga duración",
    ],
    image: "/products/ducha-celite-saveiro-embutida.jpg",
  }),
  p({
    id: "ducha-electrica", // slug estable
    name: "Celite Saveiro Ducha Externa",
    category: "griferias-ducha",
    brand: "Celite",
    shortDescription:
      "Monocomando de ducha externo Celite Saveiro con ducha de mano.",
    details:
      "Monocomando de ducha externo línea Celite Saveiro, incluye ducha de mano y flexible. Instalación práctica a la vista, con manejo de un solo comando.",
    benefits: [
      "Incluye ducha de mano y flexible",
      "Manejo monocomando práctico",
      "Acabado cromado resistente",
    ],
    image: "/products/ducha-celite-saveiro-externa.jpg",
  }),

  // ---------------- TERMOCALEFONES ----------------
  p({
    id: "termocalefon-ariston-80",
    name: "Termocalefón Ariston 80L Horizontal",
    category: "termocalefones",
    brand: "Ariston",
    shortDescription:
      "Termocalefón eléctrico Ariston de 80 litros, instalación horizontal.",
    details:
      "Termocalefón eléctrico Ariston de 80 litros para instalación horizontal. Calienta y conserva el agua de forma eficiente, con el respaldo y la garantía de la marca Ariston.",
    benefits: [
      "80 litros de capacidad",
      "Instalación horizontal",
      "Marca Ariston con garantía",
    ],
    image: "/products/termocalefon-ariston-80-horizontal.jpg",
  }),
  p({
    id: "termocalefon-ferroli-80",
    name: "Termocalefón Ferroli 80L Vertical",
    category: "termocalefones",
    brand: "Ferroli",
    shortDescription:
      "Termocalefón eléctrico Ferroli de 80 litros, instalación vertical.",
    details:
      "Termocalefón eléctrico Ferroli de 80 litros para instalación vertical, con termostato regulable. Solución confiable de agua caliente para el hogar.",
    benefits: [
      "80 litros de capacidad",
      "Instalación vertical",
      "Termostato regulable",
    ],
    image: "/products/termocalefon-ferroli-80-vertical.jpg",
  }),

  // ---------------- MOTORES ----------------
  p({
    id: "motor-valco-casalinga",
    name: "Motor Valco Casalinga 0.5HP",
    category: "motores",
    brand: "Valco",
    shortDescription:
      "Motobomba periférica Valco Casalinga de 0.5 HP para uso doméstico.",
    details:
      "Motobomba periférica Valco Casalinga de 0.5 HP, ideal para presurizar el agua en viviendas. Cuerpo robusto y funcionamiento confiable para el día a día.",
    benefits: [
      "0.5 HP de potencia",
      "Ideal para uso doméstico",
      "Cuerpo resistente",
    ],
    image: "/products/motor-valco-casalinga-05hp.jpg",
  }),
  p({
    id: "motor-valco-irrigua",
    name: "Motor Valco Irrigua C3 1HP",
    category: "motores",
    brand: "Valco",
    shortDescription:
      "Motobomba periférica Valco Irrigua C3 de 1 HP, mayor caudal y presión.",
    details:
      "Motobomba periférica Valco Irrigua C3 de 1 HP, con mayor caudal y presión. Apta para viviendas más grandes y exigencias de riego o presurización.",
    benefits: [
      "1 HP de potencia",
      "Mayor caudal y presión",
      "Uso doméstico e industrial liviano",
    ],
    image: "/products/motor-valco-irrigua-c3-1hp.jpg",
  }),
  p({
    id: "motor-valco-jeet",
    name: "Motor Valco Jet 148",
    category: "motores",
    brand: "Valco",
    shortDescription:
      "Motobomba autocebante Valco Jet 148, ideal para pozos y tanques.",
    details:
      "Motobomba autocebante Valco Jet 148, ideal para extraer agua de pozos, aljibes y tanques. Construcción robusta y autocebado para una puesta en marcha sencilla.",
    benefits: [
      "Autocebante (sistema jet)",
      "Ideal para pozos y aljibes",
      "Construcción robusta",
    ],
    image: "/products/motor-valco-jeet-148.jpg",
  }),
];

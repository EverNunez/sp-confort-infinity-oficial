// =============================================================
//  CATÁLOGO DE PRODUCTOS
//  Editá / agregá productos aquí. Para usar fotos reales,
//  colocá la imagen en /public/products con el nombre indicado
//  en el campo `image` (ej: /products/fani-bold.jpg).
// =============================================================

export type CategoryId =
  | "sanitarios"
  | "inodoros"
  | "griferias-cocina"
  | "griferias-bano"
  | "duchas"
  | "lavatorios"
  | "bachas"
  | "accesorios"
  | "muebles";

export interface Category {
  id: CategoryId;
  label: string;
}

export const CATEGORIES: Category[] = [
  { id: "sanitarios", label: "Sanitarios" },
  { id: "inodoros", label: "Inodoros" },
  { id: "griferias-cocina", label: "Griferías de cocina" },
  { id: "griferias-bano", label: "Griferías de baño" },
  { id: "duchas", label: "Duchas" },
  { id: "lavatorios", label: "Lavatorios" },
  { id: "bachas", label: "Bachas" },
  { id: "accesorios", label: "Accesorios" },
  { id: "muebles", label: "Muebles de baño" },
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
  image: string; // ruta dentro de /public
}

const categoryLabel = (id: CategoryId) =>
  CATEGORIES.find((c) => c.id === id)?.label ?? "";

function p(data: Omit<Product, "categoryLabel">): Product {
  return { ...data, categoryLabel: categoryLabel(data.category) };
}

export const PRODUCTS: Product[] = [
  // ---------------- GRIFERÍAS DE COCINA ----------------
  p({
    id: "fani-bold-cocina",
    name: "Fani Bold Monocomando Cocina",
    category: "griferias-cocina",
    brand: "Fani",
    shortDescription:
      "Monocomando de cocina con caño alto giratorio y líneas firmes.",
    details:
      "La grifería Fani Bold aporta carácter a la cocina con un caño alto giratorio que facilita el lavado de ollas y recipientes grandes. Cartucho cerámico de alta precisión para un cierre suave y sin goteos, en acabado cromado de larga duración.",
    benefits: [
      "Caño alto giratorio 360°",
      "Cartucho cerámico de larga vida útil",
      "Acabado cromado resistente a la corrosión",
    ],
    price: "Consultar precio",
    image: "/products/griferia-cocina-oro.jpg",
  }),
  p({
    id: "fani-domus-cocina",
    name: "Fani Domus Monocomando Cocina",
    category: "griferias-cocina",
    brand: "Fani",
    shortDescription:
      "Monocomando de cocina con silueta curva y manejo de un solo toque.",
    details:
      "Fani Domus combina una silueta curva elegante con un manejo monocomando preciso que regula caudal y temperatura con un solo movimiento. Ideal para cocinas modernas que buscan funcionalidad y estética en igual medida.",
    benefits: [
      "Apertura y mezcla con un solo toque",
      "Silueta curva contemporánea",
      "Aireador que optimiza el consumo de agua",
    ],
    price: "Consultar precio",
    image: "/products/fani-domus.jpg",
  }),
  p({
    id: "fani-gourmet-cocina-flexible",
    name: "Fani Gourmet Cocina Flexible",
    category: "griferias-cocina",
    brand: "Fani",
    shortDescription:
      "Grifería de cocina con caño flexible extensible tipo gastronómico.",
    details:
      "La Fani Gourmet incorpora un caño flexible extensible tipo resorte que ofrece total libertad de movimiento sobre la pileta. Perfecta para quienes cocinan a diario y buscan la practicidad de una grifería profesional en casa.",
    benefits: [
      "Caño flexible extensible tipo resorte",
      "Amplio rango de movimiento sobre la pileta",
      "Estilo gastronómico profesional",
    ],
    price: "Consultar precio",
    image: "/products/fani-gourmet.jpg",
  }),
  p({
    id: "fv-temple-cocina",
    name: "FV Temple Monocomando Cocina",
    category: "griferias-cocina",
    brand: "FV",
    shortDescription:
      "Monocomando FV Temple, calidad reconocida para la cocina del hogar.",
    details:
      "FV Temple es sinónimo de confiabilidad. Grifería monocomando con tecnología de cierre cerámico y un diseño atemporal que se adapta a todo tipo de cocina, respaldada por el prestigio de la marca FV.",
    benefits: [
      "Marca FV de calidad reconocida",
      "Cierre cerámico antigoteo",
      "Diseño atemporal y versátil",
    ],
    price: "Consultar precio",
    image: "/products/fv-temple.jpg",
  }),

  // ---------------- GRIFERÍAS DE BAÑO ----------------
  p({
    id: "fani-cromo-lavatorio-alto",
    name: "Fani Cromo Lavatorio Alto",
    category: "griferias-bano",
    brand: "Fani",
    shortDescription:
      "Grifería alta cromada para lavatorios y bachas de apoyo.",
    details:
      "Fani Cromo en versión alta es la elección perfecta para bachas de apoyo. Su acabado cromado espejado realza cualquier lavatorio y su altura facilita el uso diario, con un cierre cerámico preciso y duradero.",
    benefits: [
      "Altura ideal para bachas de apoyo",
      "Acabado cromado espejado",
      "Aireador que ahorra agua",
    ],
    price: "Consultar precio",
    image: "/products/fani-cromo.jpg",
  }),
  p({
    id: "fani-monocomando-lavatorio",
    name: "Fani Monocomando Lavatorio",
    category: "griferias-bano",
    brand: "Fani",
    shortDescription:
      "Monocomando compacto para lavatorios, mezcla precisa de agua.",
    details:
      "Grifería monocomando Fani para lavatorio, de altura estándar y diseño limpio. Regula temperatura y caudal con un solo movimiento, ideal para baños modernos y de uso intensivo.",
    benefits: [
      "Mezcla de temperatura precisa",
      "Diseño compacto y limpio",
      "Instalación sencilla",
    ],
    price: "Consultar precio",
    image: "/products/griferia-bano-oro.jpg",
  }),
  p({
    id: "griferia-pared-lavatorio",
    name: "Grifería de Pared para Lavatorio",
    category: "griferias-bano",
    shortDescription:
      "Grifería de empotrar a pared, estética minimalista y sofisticada.",
    details:
      "Grifería de pared para lavatorio que libera la mesada y aporta un aire minimalista y sofisticado al baño. Su caño prolongado se luce sobre bachas de apoyo y mesadas de diseño.",
    benefits: [
      "Instalación empotrada a pared",
      "Libera espacio en la mesada",
      "Estética minimalista premium",
    ],
    price: "Consultar precio",
    image: "/products/griferia-pared.jpg",
  }),

  // ---------------- INODOROS ----------------
  p({
    id: "inodoro-celite-elite",
    name: "Inodoro Celite Elite",
    category: "inodoros",
    brand: "Celite",
    shortDescription:
      "Inodoro Celite Elite con descarga eficiente y diseño sobrio.",
    details:
      "El inodoro Celite Elite ofrece una descarga potente y eficiente de doble acción, con un diseño sobrio que combina con cualquier baño. Loza de alta resistencia y acabado esmaltado que facilita la limpieza diaria.",
    benefits: [
      "Descarga eficiente de doble acción",
      "Loza esmaltada fácil de limpiar",
      "Diseño sobrio y atemporal",
    ],
    price: "Consultar precio",
    image: "/products/inodoro-suite.jpg",
  }),
  p({
    id: "inodoro-incepa-avant",
    name: "Inodoro Incepa Avant",
    category: "inodoros",
    brand: "Incepa",
    shortDescription:
      "Inodoro Incepa Avant de líneas modernas y gran prestación.",
    details:
      "Incepa Avant destaca por sus líneas modernas y su excelente prestación. Una pieza que aporta estilo contemporáneo al baño manteniendo la máxima funcionalidad y un consumo de agua optimizado.",
    benefits: [
      "Líneas modernas y limpias",
      "Marca Incepa de prestigio",
      "Óptimo rendimiento de descarga",
    ],
    price: "Consultar precio",
    image: "/products/inodoro-incepa.jpg",
  }),
  p({
    id: "inodoro-mochila-acoplada",
    name: "Inodoro con Mochila Acoplada",
    category: "inodoros",
    shortDescription:
      "Inodoro con mochila acoplada y doble descarga, ahorro de agua.",
    details:
      "Inodoro con mochila acoplada y sistema de doble descarga (3/6 litros) para un uso responsable del agua. Diseño compacto que se adapta a baños de cualquier tamaño con una instalación práctica.",
    benefits: [
      "Doble descarga 3/6 litros",
      "Ahorro de agua",
      "Instalación práctica y compacta",
    ],
    price: "Consultar precio",
    image: "/products/inodoro-mochila.jpg",
  }),

  // ---------------- SANITARIOS ----------------
  p({
    id: "combo-sanitario-completo",
    name: "Combo Sanitario Completo",
    category: "sanitarios",
    shortDescription:
      "Conjunto de inodoro y lavatorio a juego para renovar el baño.",
    details:
      "Combo sanitario que incluye inodoro y lavatorio diseñados para combinar perfectamente entre sí. La forma más simple y elegante de renovar el baño por completo con piezas a juego.",
    benefits: [
      "Piezas diseñadas para combinar",
      "Renovación integral del baño",
      "Excelente relación calidad-precio",
    ],
    price: "Consultar precio",
    image: "/products/combo-sanitario.jpg",
  }),
  p({
    id: "juego-sanitario-celite-smart",
    name: "Juego Sanitario Celite Smart",
    category: "sanitarios",
    brand: "Celite",
    shortDescription:
      "Juego sanitario Celite de loza blanca con terminaciones finas.",
    details:
      "Juego sanitario Celite Smart en loza blanca esmaltada, con terminaciones finas y líneas modernas. Un conjunto que combina higiene, durabilidad y estética para baños actuales.",
    benefits: [
      "Loza blanca esmaltada de calidad",
      "Terminaciones finas y modernas",
      "Marca Celite reconocida",
    ],
    price: "Consultar precio",
    image: "/products/juego-celite.jpg",
  }),

  // ---------------- DUCHAS ----------------
  p({
    id: "ducha-electrica",
    name: "Ducha Eléctrica",
    category: "duchas",
    shortDescription:
      "Ducha eléctrica con regulación de temperatura y bajo consumo.",
    details:
      "Ducha eléctrica de instalación práctica con varios niveles de temperatura. Solución eficiente para agua caliente al instante, sin necesidad de termotanque, ideal para optimizar el consumo energético.",
    benefits: [
      "Agua caliente instantánea",
      "Varios niveles de temperatura",
      "Instalación práctica y eficiente",
    ],
    price: "Consultar precio",
    image: "/products/ducha-electrica.jpg",
  }),
  p({
    id: "ducha-lluvia-cuadrada",
    name: "Ducha de Lluvia Cuadrada",
    category: "duchas",
    shortDescription:
      "Regadera tipo lluvia de gran formato para una experiencia spa.",
    details:
      "Ducha de lluvia cuadrada de gran formato que recrea una experiencia de spa en casa. Su caudal envolvente y su acabado cromado aportan confort y un toque de lujo al baño moderno.",
    benefits: [
      "Caudal envolvente tipo lluvia",
      "Gran formato cuadrado",
      "Acabado cromado de lujo",
    ],
    price: "Consultar precio",
    image: "/products/ducha-lluvia.jpg",
  }),

  // ---------------- LAVATORIOS ----------------
  p({
    id: "lavatorio-apoyo-ovalado",
    name: "Lavatorio de Apoyo Ovalado",
    category: "lavatorios",
    shortDescription:
      "Bacha de apoyo ovalada en loza blanca para baños elegantes.",
    details:
      "Lavatorio de apoyo de forma ovalada en loza blanca esmaltada. Una pieza sofisticada que se luce sobre mesadas y muebles, ideal para combinar con griferías altas o de pared.",
    benefits: [
      "Loza blanca esmaltada",
      "Forma ovalada elegante",
      "Combina con griferías altas",
    ],
    price: "Consultar precio",
    image: "/products/lavatorio-vessel.jpg",
  }),
  p({
    id: "bacha-apoyo-rectangular",
    name: "Bacha de Apoyo Rectangular",
    category: "lavatorios",
    shortDescription:
      "Bacha de apoyo rectangular de líneas rectas y look contemporáneo.",
    details:
      "Bacha de apoyo rectangular en loza blanca, de líneas rectas y aspecto contemporáneo. Perfecta para baños minimalistas que buscan una pieza protagonista sobre la mesada.",
    benefits: [
      "Líneas rectas contemporáneas",
      "Loza de alta resistencia",
      "Ideal para baños minimalistas",
    ],
    price: "Consultar precio",
    image: "/products/bacha-rectangular.jpg",
  }),

  // ---------------- BACHAS (COCINA) ----------------
  p({
    id: "bacha-cocina-acero",
    name: "Bacha de Cocina Acero Inoxidable",
    category: "bachas",
    shortDescription:
      "Bacha de acero inoxidable resistente, ideal para cocinas modernas.",
    details:
      "Bacha de cocina en acero inoxidable de alta resistencia, fácil de limpiar e higiénica. Su acabado satinado disimula las marcas de uso y resiste el día a día. Disponible en distintas medidas.",
    benefits: [
      "Acero inoxidable de alta resistencia",
      "Higiénica y fácil de limpiar",
      "Acabado satinado anti-marcas",
    ],
    price: "Consultar precio",
    image: "/products/bacha-cocina.jpg",
  }),
  p({
    id: "bacha-doble-cocina",
    name: "Bacha Doble de Cocina",
    category: "bachas",
    shortDescription:
      "Bacha doble de acero inoxidable para mayor capacidad de trabajo.",
    details:
      "Bacha doble de acero inoxidable que ofrece más espacio y practicidad para lavar y enjuagar al mismo tiempo. Ideal para cocinas con alto uso diario que requieren máxima funcionalidad.",
    benefits: [
      "Dos cubetas para más capacidad",
      "Acero inoxidable resistente",
      "Mayor practicidad de trabajo",
    ],
    price: "Consultar precio",
    image: "/products/bacha-doble.jpg",
  }),

  // ---------------- ACCESORIOS ----------------
  p({
    id: "kit-sevilla-negro-mate",
    name: "Kit Sevilla Negro Mate",
    category: "accesorios",
    shortDescription:
      "Set de accesorios de baño en acabado negro mate, elegante y resistente.",
    details:
      "Kit completo de accesorios Sevilla en negro mate: combina a la perfección con ambientes modernos y minimalistas. Incluye piezas coordinadas con acabado antihuellas y materiales de alta durabilidad para uso diario.",
    benefits: [
      "Acabado negro mate antihuellas",
      "Piezas coordinadas para todo el baño",
      "Fijación firme y duradera",
    ],
    price: "Consultar precio",
    image: "/products/kit-sevilla-negro-mate.jpg",
  }),
  p({
    id: "agarradero-bano",
    name: "Agarradero de Seguridad para Baño",
    category: "accesorios",
    shortDescription:
      "Barra de apoyo y seguridad para baño, fijación firme y acabado fino.",
    details:
      "Agarradero de seguridad pensado para brindar apoyo en el baño con la máxima firmeza. Su acabado elegante combina seguridad y estética, sin descuidar el diseño del ambiente.",
    benefits: [
      "Brinda apoyo y seguridad",
      "Fijación firme a la pared",
      "Acabado resistente a la humedad",
    ],
    price: "Consultar precio",
    image: "/products/agarradero-bano.jpg",
  }),
  p({
    id: "toallero-cromado",
    name: "Toallero Cromado",
    category: "accesorios",
    shortDescription:
      "Toallero de barra en acabado cromado, terminación brillante y sólida.",
    details:
      "Toallero de barra en acabado cromado brillante, con terminación sólida y fijación segura. Un accesorio funcional que completa el baño con un detalle pulcro y duradero.",
    benefits: [
      "Acabado cromado brillante",
      "Estructura sólida y estable",
      "Fijación segura a la pared",
    ],
    price: "Consultar precio",
    image: "/products/toallero-cromado.jpg",
  }),

  // ---------------- MUEBLES DE BAÑO ----------------
  p({
    id: "mueble-bano-suspendido",
    name: "Mueble de Baño Suspendido",
    category: "muebles",
    shortDescription:
      "Mueble de baño suspendido con bacha integrada y amplio guardado.",
    details:
      "Mueble de baño suspendido que optimiza el espacio y aporta un look moderno y liviano. Incluye bacha integrada y cajones de gran capacidad con cierre suave para una experiencia premium.",
    benefits: [
      "Bacha integrada",
      "Cajones con cierre suave",
      "Diseño suspendido que amplía el espacio",
    ],
    price: "Consultar precio",
    image: "/products/lavatorio-marmol-oro.jpg",
  }),
  p({
    id: "mueble-bano-espejo",
    name: "Mueble de Baño con Espejo",
    category: "muebles",
    shortDescription:
      "Conjunto de mueble con bacha y espejo a juego para el baño.",
    details:
      "Conjunto de mueble de baño con bacha y espejo a juego, pensado para renovar el baño con un set completo y coordinado. Combina guardado, estética y funcionalidad en una sola solución.",
    benefits: [
      "Mueble, bacha y espejo coordinados",
      "Set completo listo para instalar",
      "Guardado funcional y elegante",
    ],
    price: "Consultar precio",
    image: "/products/mueble-espejo.jpg",
  }),
];

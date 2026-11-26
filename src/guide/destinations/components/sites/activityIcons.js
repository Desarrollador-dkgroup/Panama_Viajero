import {
  LuBike,
  LuBinoculars,
  LuBird,
  LuCamera,
  LuCoffee,
  LuCompass,
  LuFish,
  LuLandmark,
  LuMapPinned,
  LuMountain,
  LuShipWheel,
  LuSparkles,
  LuStore,
  LuTent,
  LuTreePalm,
  LuTrees,
  LuUtensilsCrossed,
  LuWaves,
} from 'react-icons/lu'
import { FaUmbrellaBeach } from 'react-icons/fa6'
import { IoBoat } from 'react-icons/io5'

// Iconos que se eligen en pv_admin para cada actividad (columna icon_key). Las mismas claves
// están en el panel (activity-icon.tsx), en la página oficial (activity-icons.ts) y en la base.
const ICONS = {
  playa: FaUmbrellaBeach,
  agua: LuWaves,
  bote: IoBoat,
  pesca: LuFish,
  bicicleta: LuBike,
  comida: LuUtensilsCrossed,
  cafe: LuCoffee,
  montana: LuMountain,
  bosque: LuTrees,
  camping: LuTent,
  estrellas: LuSparkles,
  fotografia: LuCamera,
  binoculares: LuBinoculars,
  aves: LuBird,
  recorrido: LuMapPinned,
  cultura: LuLandmark,
  compras: LuStore,
  isla: LuTreePalm,
  costa: LuShipWheel,
  exploracion: LuCompass,
}

// Si no se eligió icono, se decide por el nombre con las mismas reglas del panel y la web.
const RULES = [
  [/(playa|playas)/, 'playa'],
  [/(aguas?\s*termales?|termales?|termal)/, 'agua'],
  [/(nataci|nado|nadar|swim|surf|snorkel|buce|kayak|mar|arrecife)/, 'agua'],
  [/(paseo(?:s)? en lancha|lancha|bote|boat)/, 'bote'],
  [/(pesca)/, 'pesca'],
  [/(ciclismo|patinaje|ruta|bicicleta)/, 'bicicleta'],
  [/(gastron|comida|restaur|sabores|culin)/, 'comida'],
  [/(senderismo|monta|trek)/, 'montana'],
  [/(bosque|naturaleza|parque)/, 'bosque'],
  [/(estrella|estrellas)/, 'estrellas'],
  [/(avistamiento|observaci).*(rana|ranas).*(roja|rojas)/, 'fotografia'],
  [/(avistamiento|observaci).*(delfin|delfines)/, 'binoculares'],
  [/(avistamiento|observaci).*(ballena|tortuga|marin|medusa|pez|peces)/, 'agua'],
  [/(avistamiento|observaci).*(coral|arrecife|manta|raya|manglar)/, 'agua'],
  [/(avistamiento|observaci|aves|pajar)/, 'aves'],
  [/(canal|tour|recorrido|museo|hist|casco|ciudad|urbano|paseo|visitas)/, 'recorrido'],
  [/(isla|islote)/, 'isla'],
  [/(costa|costera|marino)/, 'costa'],
  [/(fotograf|paisaje|foto|mirador)/, 'fotografia'],
]

export function normalizeActivityName(activityName) {
  return activityName
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
}

// Icono de una actividad: el elegido en el panel (iconKey) o, si no hay, el que corresponde
// al nombre. Devuelve { Icon } para que los componentes lo usen como <Icon />.
export function getActivityIcon(activityName, iconKey) {
  if (iconKey && ICONS[iconKey]) return { Icon: ICONS[iconKey] }
  const normalized = normalizeActivityName(activityName)
  const key = RULES.find(([test]) => test.test(normalized))?.[1] ?? 'exploracion'
  return { Icon: ICONS[key] }
}

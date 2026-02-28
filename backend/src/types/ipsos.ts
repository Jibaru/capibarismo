// TypeScript types generated from ipsos_schema.json

export interface IpsosEncuesta {
  encuesta: Encuesta;
}

export interface Encuesta {
  titulo: string;
  fecha: string;
  ficha_tecnica: FichaTecnica;
  resultados: Resultados;
  evolucion_historica: EvolucionHistorica[];
  desagregado_ambito: DesagregadoAmbito;
  desagregado_region: DesagregadoRegion;
  desagregado_nse: DesagregadoNSE;
  desagregado_genero_edad: DesagregadoGeneroEdad;
}

export interface FichaTecnica {
  encuestadora: string;
  cliente: string;
  numero_registro: string;
  fecha_aplicacion: string[];
  muestra: number;
  cobertura: {
    departamentos: number;
    provincias_especiales: string[];
  };
  universo: string;
  margen_error: number;
  nivel_confianza: number;
  modalidad: string;
  sistema_muestreo: string;
  contacto: {
    web: string;
    email: string;
  };
}

export interface Resultados {
  febrero_2_2026: ResultadoMedicion;
  febrero_1_2026: ResultadoMedicion;
  enero_2026: ResultadoMedicion;
}

export interface ResultadoMedicion {
  fecha_medicion: string;
  candidatos: CandidatoBase[];
  otros: number;
  blanco_viciado_ninguno: number;
  no_precisa: number;
}

export interface CandidatoBase {
  nombre: string;
  partido: string;
  porcentaje: number;
}

export interface EvolucionHistorica {
  periodo: string;
  lopez_aliaga: number | null;
  keiko_fujimori: number | null;
  carlos_alvarez: number | null;
  mario_vizcarra: number | null;
  cesar_acuna: number | null;
  alfonso_lopez_chau: number | null;
  blanco_viciado_ninguno: number;
}

export interface DesagregadoAmbito {
  fecha_medicion: string;
  candidatos: CandidatoAmbito[];
  otros: DistribucionAmbito;
  blanco_viciado_ninguno: DistribucionAmbito;
  no_precisa: DistribucionAmbito;
  base_real: {
    total: number;
    lima: number;
    interior: number;
  };
  distribucion_ponderada_pct: DistribucionAmbito;
}

export interface CandidatoAmbito {
  nombre: string;
  total: number;
  lima: number;
  interior: number;
}

export interface DistribucionAmbito {
  total: number;
  lima: number;
  interior: number;
}

export interface DesagregadoRegion {
  fecha_medicion: string;
  candidatos: CandidatoRegion[];
  base_real: DistribucionRegion;
  distribucion_ponderada_pct: DistribucionRegion;
}

export interface CandidatoRegion {
  nombre: string;
  total: number;
  norte: number;
  centro: number;
  sur: number;
  oriente: number;
  urbano: number;
  rural: number;
}

export interface DistribucionRegion {
  total: number;
  urbano: number;
  rural: number;
  norte: number;
  centro: number;
  sur: number;
  oriente: number;
}

export interface DesagregadoNSE {
  fecha_medicion: string;
  candidatos: CandidatoNSE[];
  blanco_viciado_ninguno: DistribucionNSE;
  no_precisa: DistribucionNSE;
  base_real: DistribucionNSE;
  distribucion_ponderada_pct: DistribucionNSE;
}

export interface CandidatoNSE {
  nombre: string;
  total: number;
  A: number;
  B: number;
  C: number;
  D: number;
  E: number;
}

export interface DistribucionNSE {
  total: number;
  A: number;
  B: number;
  C: number;
  D: number;
  E: number;
}

export interface DesagregadoGeneroEdad {
  fecha_medicion: string;
  candidatos: CandidatoGeneroEdad[];
  blanco_viciado_ninguno: DistribucionGeneroEdad;
  no_precisa: DistribucionGeneroEdad;
  base_real: DistribucionGeneroEdad;
  distribucion_ponderada_pct: DistribucionGeneroEdad;
}

export interface CandidatoGeneroEdad {
  nombre: string;
  total: number;
  masculino: number;
  femenino: number;
  edad_18_25: number;
  edad_26_42: number;
  edad_43_mas: number;
}

export interface DistribucionGeneroEdad {
  total: number;
  masculino: number;
  femenino: number;
  edad_18_25: number;
  edad_26_42: number;
  edad_43_mas: number;
}

// Service DTOs
export interface ExtractIpsosRequest {
  pdfPath: string;
}

export interface ExtractIpsosResponse {
  success: boolean;
  data?: IpsosEncuesta;
  outputPath?: string;
  error?: string;
}

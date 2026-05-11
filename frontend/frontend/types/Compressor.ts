export type Compressor = {
  compressorId: number;
  modelo: string;
  marca: string;
  voltagemNacional?: number;
  frequencia?: number;
  corrente?: number;
  correnteMotorY?: number;
  correnteMotorYY?: number;
  volumeDeslocamento?: number;
  rotacao?: number;
  dataCadastro?: string;
};
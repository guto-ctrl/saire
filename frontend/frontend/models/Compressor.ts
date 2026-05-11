export interface Compressor {
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

  dataCadastro: string;
}

export type CreateCompressorDto = {
  modelo: string;
  marca: string;

  voltagemNacional?: number;
  frequencia?: number;

  corrente?: number;
  correnteMotorY?: number;
  correnteMotorYY?: number;

  volumeDeslocamento?: number;
  rotacao?: number;
};

export type UpdateCompressorDto = Partial<CreateCompressorDto>;
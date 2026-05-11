"use client";

export type CompressorFormData = {
  modelo: string;
  marca: string;
  voltagemNacional?: string;
  frequencia?: string;
  corrente?: string;
  correnteMotorY?: string;
  correnteMotorYY?: string;
  volumeDeslocamento?: string;
  rotacao?: string;
};

interface Props {
  form: CompressorFormData;
  onChange: (data: CompressorFormData) => void;
}

export function CompressorForm({ form, onChange }: Props) {

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    onChange({
      ...form,
      [name]: value,
    });
  }

  return (
    <div className="form">

      {/* IDENTIFICAÇÃO */}
      <div className="section">
        <h4>Identificação</h4>

        <div className="grid">
          <div className="form-group">
            <label>Modelo *</label>
            <input
              type="text"
              name="modelo"
              value={form.modelo}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Marca *</label>
            <input
              type="text"
              name="marca"
              value={form.marca}
              onChange={handleChange}
              required
            />
          </div>
        </div>
      </div>

      {/* DADOS TÉCNICOS */}
      <div className="section">
        <h4>Dados Técnicos</h4>

        <div className="grid">

          <div className="form-group">
            <label>Voltagem (V)</label>
            <input
              type="number"
              name="voltagemNacional"
              value={form.voltagemNacional ?? ""}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Frequência (Hz)</label>
            <input
              type="number"
              name="frequencia"
              value={form.frequencia}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Corrente (A máx)</label>
            <input
              type="number"
              step="0.1"
              name="corrente"
              value={form.corrente}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Motor Bloq (Y)</label>
            <input
              type="number"
              step="0.1"
              name="correnteMotorY"
              value={form.correnteMotorY}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Motor Bloq (YY)</label>
            <input
              type="number"
              step="0.1"
              name="correnteMotorYY"
              value={form.correnteMotorYY}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Vazão (m³/h)</label>
            <input
              type="number"
              name="volumeDeslocamento"
              value={form.volumeDeslocamento}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Rotação (RPM)</label>
            <input
              type="number"
              name="rotacao"
              value={form.rotacao}
              onChange={handleChange}
            />
          </div>

        </div>
      </div>

    </div>
  );
}
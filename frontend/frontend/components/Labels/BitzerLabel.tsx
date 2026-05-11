import "./styles/BitzerLabel.css";
import { Compressor } from "../../models/Compressor";

interface BitzerLabelProps {
    compressor: Compressor;
    serialNumber: string;
}

export default function BitzerLabel({
    compressor,
    serialNumber,
}: BitzerLabelProps) {

    return (
        <div className="bitzer-label">

            {/* Lado esquerdo */}
            <div className="bitzer-left-side">

                {/* ROIG */}
                <div className="roig-section">

                    <img
                        src="/logo/logo-roig.png"
                        alt="ROIG"
                        className="roig-logo"
                    />

                    <div className="roig-info">
                        <p>Via de Acesso João de Góes, 2355</p>
                        <p>www.roigrefrigeracao.com.br</p>
                    </div>

                </div>

                {/* Green Point */}
                <div className="greenpoint-section">

                    <img
                        src="/logo/greenpoint-logo.png"
                        alt="Green Point"
                        className="greenpoint-logo"
                    />

                </div>

                {/* Bitzer */}
                <div className="bitzer-brand-section">

                    <img
                        src="/logo/bitzer-logo.png"
                        alt="Bitzer"
                        className="bitzer-brand-logo"
                    />

                </div>

            </div>

            {/* Lado direito */}
            <div className="bitzer-right-side">

                {/* Topo */}
                <div className="bitzer-top-infos">

                    <div className="compressor-main-info">

                        <div className="info-row">
                            <span className="info-title">
                                Modelo:
                            </span>

                            <span className="info-value">
                                {compressor.modelo}
                            </span>
                        </div>

                        <div className="info-row">
                            <span className="info-title">
                                Nº Série:
                            </span>

                            <span className="info-value">
                                {serialNumber || "-"}
                            </span>
                        </div>

                    </div>

                    {/* QRCode */}
                    <div className="qrcode-section">

                        <img
                            src="/qrcode/example-qrcode.png"
                            alt="QRCode"
                            className="qrcode-image"
                        />

                    </div>

                </div>

                {/* Grid compressor */}
                <div className="compressor-table-container">

                    <div className="compressor-grid">

                        <div className="compressor-item">
                            <span className="item-title">
                                Modelo
                            </span>

                            <span className="item-value">
                                {compressor.modelo}
                            </span>
                        </div>

                        <div className="compressor-item">
                            <span className="item-title">
                                Marca
                            </span>

                            <span className="item-value">
                                {compressor.marca}
                            </span>
                        </div>

                        <div className="compressor-item">
                            <span className="item-title">
                                Voltagem
                            </span>

                            <span className="item-value">
                                {compressor.voltagemNacional ?? "-"}V
                            </span>
                        </div>

                        <div className="compressor-item">
                            <span className="item-title">
                                Frequência
                            </span>

                            <span className="item-value">
                                {compressor.frequencia ?? "-"}Hz
                            </span>
                        </div>

                        <div className="compressor-item">
                            <span className="item-title">
                                Corrente
                            </span>

                            <span className="item-value">
                                {compressor.corrente ?? "-"}A
                            </span>
                        </div>

                        <div className="compressor-item">
                            <span className="item-title">
                                Rotação
                            </span>

                            <span className="item-value">
                                {compressor.rotacao ?? "-"} RPM
                            </span>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}
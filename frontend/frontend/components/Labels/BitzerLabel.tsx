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
                            src="/qr-code/qrcode.png"
                            alt="QRCode"
                            className="qrcode-image"
                        />

                    </div>

                </div>

                {/* Grid compressor */}
                <div className="compressor-table-container">
                    <table className="compressor-table-horizontal">
                        <tbody>
                            <tr className="spec-header">
                                <td>VOLT. NACIONAL</td>
                                <td>FREQU.</td>
                                <td>CORRENTE</td>
                                <td>CORR. MOTOR Y</td>
                                <td>CORR. MOTOR YY</td>
                                <td>VOL. DES.</td>
                                <td>ROTAÇÃO</td>
                            </tr>

                            <tr className="spec-unit-row">
                                <td>V</td>
                                <td>Hz</td>
                                <td>A</td>
                                <td>A</td>
                                <td>A</td>
                                <td>m³/h</td>
                                <td>rpm</td>
                            </tr>

                            <tr className="spec-value-row">
                                <td>{compressor.voltagemNacional ?? "-"}</td>
                                <td>{compressor.frequencia ?? "-"}</td>
                                <td>{compressor.corrente ?? "-"}</td>
                                <td>{compressor.correnteMotorY ?? "-"}</td>
                                <td>{compressor.correnteMotorYY ?? "-"}</td>
                                <td>{compressor.volumeDeslocamento ?? "-"}</td>
                                <td>{compressor.rotacao ?? "-"}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>

        </div>
    );
}
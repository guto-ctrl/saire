"use client";

interface HeaderProps {
    onOpenNewModal: () => void;
    onOpenSelectModal: () => void;
}

export default function Header({
    onOpenNewModal,
    onOpenSelectModal
}: HeaderProps) {

    return (
        // Informações Saire
        <div className="header">

            <div className="header-program-infos">

                <img src='/logo/saire-icon-big.png' className="logo-programa" />

                <div>
                    <h2>Saire</h2>
                    <p>Gerador de etiquetas</p>
                </div>

            </div>

            {/* Ações */}
            <div className="header-actions">

                <button className="btn-select" onClick={() => {
                    onOpenSelectModal();
                }}
                    
                >

                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        className="lucide lucide-menu-icon lucide-menu">
                        <path d="M4 5h16" />
                        <path d="M4 12h16" />
                        <path d="M4 19h16" />
                    </svg>

                    Selecionar Compressor

                </button>

                <button className="new-btn" onClick={() => {
                    onOpenNewModal();
                }}>

                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-list-plus-icon lucide-list-plus"><path d="M16 5H3" /><path d="M11 12H3" /><path d="M16 19H3" /><path d="M18 9v6" /><path d="M21 12h-6" /></svg>

                    Novo Compressor

                </button>

            </div>

        </div>
    );
}
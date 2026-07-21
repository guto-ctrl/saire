"use client";

import { useCallback, useRef } from "react";

export interface PrintLabelOptions {
  /** Largura física do rótulo em milímetros */
  widthMm: number;
  /** Altura física do rótulo em milímetros */
  heightMm: number;
}

/**
 * Hook que imprime APENAS o conteúdo referenciado por `printRef` em uma
 * janela dedicada, com tamanho de página exato para impressoras de etiqueta.
 *
 * Vantagens sobre window.print() direto:
 * - Nenhum outro elemento da página aparece na impressão
 * - O @page size corresponde exatamente ao rótulo físico
 * - Aguarda todas as imagens carregarem antes de disparar o diálogo
 * - Fontes e CSS são injetados programaticamente
 */
export function usePrintLabel({ widthMm, heightMm }: PrintLabelOptions) {
  const printRef = useRef<HTMLDivElement>(null);

  const print = useCallback(() => {
    const node = printRef.current;
    if (!node) return;

    // Abre uma janela auxiliar minúscula e invisível
    const win = window.open(
      "",
      "_blank",
      "width=1,height=1,left=-9999,top=-9999,menubar=no,toolbar=no,location=no,status=no"
    );
    if (!win) {
      console.error(
        "[usePrintLabel] Pop-up bloqueado. Permita pop-ups para este site."
      );
      return;
    }

    // Base URL para resolver caminhos relativos (/logo/..., /fonts/..., etc.)
    const base = window.location.origin;

    // CSS da etiqueta em tamanho de impressão real (sem escala)
    const printCss = `
      @font-face {
        font-family: 'Google Sans';
        src: url('${base}/fonts/Google_Sans/static/GoogleSans_17pt-Regular.ttf') format('truetype');
        font-weight: 400;
        font-style: normal;
      }

      @page {
        size: ${widthMm}mm ${heightMm}mm;
        margin: 0;
      }

      *, *::before, *::after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }

      html, body {
        width: ${widthMm}mm;
        height: ${heightMm}mm;
        font-family: 'Google Sans', sans-serif;
        overflow: hidden;
        background: #fff;
      }

      /* ── Etiqueta ocupa exatamente o rótulo ── */
      .bitzer-label {
        width: ${widthMm}mm;
        height: ${heightMm}mm;
        padding: 5px 8px;
        border: none;
        border-radius: 0;
        display: flex;
        gap: 12px;
        background: white;
        box-sizing: border-box;
      }

      /* ── Lado esquerdo ── */
      .bitzer-left-side {
        width: 70px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
      }

      .roig-section {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }

      .roig-logo       { width: 80px; }
      .greenpoint-logo { width: 80px; }
      .bitzer-brand-logo { width: 65px; }

      .roig-info {
        font-size: 5px;
        font-weight: bold;
        color: #168447;
        line-height: 1.3;
      }

      /* ── Lado direito ── */
      .bitzer-right-side {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }

      .bitzer-top-infos {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
      }

      .info-row {
        display: flex;
        align-items: center;
        gap: 6px;
      }

      .info-title {
        font-size: 11px;
        font-weight: bold;
      }

      .info-value {
        font-size: 11px;
      }

      /* QR Code */
      .qrcode-image {
        width: 50px;
        height: 50px;
      }

      /* ── Tabela ── */
      .compressor-table-container {
        width: 100%;
      }

      .compressor-table-horizontal {
        width: 100%;
        table-layout: fixed;
        border-collapse: separate;
        border-spacing: 0;
        border: 2px solid #4a4a4a;
        border-radius: 6px;
        overflow: hidden;
        background: white;
      }

      .compressor-table-horizontal td {
        border-right: 1px solid #555;
        border-bottom: 1px solid #555;
        text-align: center;
        padding: 2px 2px;
      }

      .compressor-table-horizontal tr td:last-child { border-right: none; }
      .compressor-table-horizontal tr:last-child td { border-bottom: none; }

      .spec-header td {
        font-size: 5px;
        font-weight: 700;
        letter-spacing: 0.2px;
        text-transform: uppercase;
        height: 14px;
      }

      .spec-unit-row td {
        font-size: 6px;
        font-weight: 700;
        height: 12px;
      }

      .spec-value-row td {
        font-size: 10px;
        font-weight: 800;
        height: 18px;
      }
    `;

    win.document.write(`<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <base href="${base}/">
  <title>Etiqueta</title>
  <style>${printCss}</style>
</head>
<body>
  ${node.innerHTML}
</body>
</html>`);

    win.document.close();

    // Aguarda o carregamento de todas as imagens antes de imprimir
    const images = Array.from(
      win.document.querySelectorAll<HTMLImageElement>("img")
    );

    const doPrint = () => {
      win.focus();
      win.print();
      // Fecha a janela auxiliar após o diálogo de impressão
      win.addEventListener("afterprint", () => win.close());
      // Fallback: fecha após 60 s se o evento não disparar (alguns browsers)
      setTimeout(() => win.close(), 60_000);
    };

    if (images.length === 0) {
      setTimeout(doPrint, 150);
    } else {
      let remaining = images.length;
      const onSettled = () => {
        remaining--;
        if (remaining <= 0) setTimeout(doPrint, 150);
      };
      images.forEach((img) => {
        if (img.complete) {
          onSettled();
        } else {
          img.addEventListener("load", onSettled, { once: true });
          img.addEventListener("error", onSettled, { once: true });
        }
      });
    }
  }, [widthMm, heightMm]);

  return { printRef, print };
}

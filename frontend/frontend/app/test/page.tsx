"use client";

import { useEffect } from "react";
import api from "../../services/api";
import BitzerLabel from "../../components/Labels/BitzerLabel";

export default function Test() {
  useEffect(() => {
    async function load() {
      const res = await api.get("/Compressores");
      console.log(res.data);
    }

    load();
  }, []);

  const _c = {
    model: "TESTE-MODEL",
    serialNumber: "SN-2025-0001",
  }

  return(
    <main>
        {/* <h1>Etiqueta logo abaixo</h1> */}
        <BitzerLabel 
            compressor={_c}
        />
    </main>
  )
}
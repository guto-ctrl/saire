"use client";

import { useEffect } from "react";
import api from "../../services/api";

export default function Test() {
  useEffect(() => {
    async function load() {
      const res = await api.get("/Compressores");
      console.log(res.data);
    }

    load();
  }, []);

  return <div>Testando API... olha o console</div>;
}
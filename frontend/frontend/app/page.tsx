"use client";

import { useState } from "react";

import Header from "../components/Header/Header";
import { NewCompressorModal } from "../modals/NewCompressorModal/NewCompressor";
// import { EditCompressorModal } from "../modals/EditCompressorModal/EditCompressorModal";

export default function Home() {
  const [isNewModalOpen, setIsNewModalOpen] =
    useState(false);

  // const [isEditModalOpen, setIsEditModalOpen] =
  //   useState(false);

  return (

    <div className="container-main">
      <Header
        onOpenNewModal={() =>
          setIsNewModalOpen(true)
        }
      />

      <button
        style={{
          background: "blue",
          position: "relative",
          zIndex: 9999
        }}
        onClick={() => {
          alert("clicou");
          console.log("PAGE");
        }}      >
        TESTE
      </button>
      {/* <NewCompressorModal
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
      /> */}

      {/* <EditCompressorModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      /> */}

    </div>
  );
}

"use client";

import { useState } from "react";

import Header from "../components/Header/Header";
import { NewCompressorModal } from "../modals/NewCompressorModal/NewCompressor";
import { SelectCompressorModal } from "../modals/SelectCompressorModal/SelectCompressorModal";
import { EditCompressorModal } from "../modals/EditCompressorModal/EditCompressorModal";

export default function Home() {
  const [isNewModalOpen, setIsNewModalOpen] =
    useState(false);

  const [isSelectModalOpen, setIsSelectModalOpen] =
    useState(false);

  const [editingId, setEditingId] =
    useState<number | null>(null);
  const [isEditOpen, setIsEditOpen] =
    useState(false);

  return (

    <div className="container-main">
      <Header
        onOpenNewModal={() =>
          setIsNewModalOpen(true)
        }
        onOpenSelectModal={() =>
          setIsSelectModalOpen(true)
        }
      />

      <SelectCompressorModal
        isOpen={isSelectModalOpen}
        onClose={() => setIsSelectModalOpen(false)}
        onSelect={(c) => {
          setEditingId(c.compressorId);
          setIsEditOpen(true);
        }}
        onEdit={(c) => {
          setEditingId(c.compressorId);
          setIsEditOpen(true);
        }}
      />

      <EditCompressorModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        compressorId={editingId}
      />

      <NewCompressorModal
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
      />

      {/* <EditCompressorModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      /> */}

    </div>
  );
}

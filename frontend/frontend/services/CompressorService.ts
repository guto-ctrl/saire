import api from "./api";
import { Compressor, CreateCompressorDto, UpdateCompressorDto } from "@/models/Compressor";

export async function getCompressores(): Promise<Compressor[]> {
  const res = await api.get<Compressor[]>("/Compressores");
  return res.data;
}

export async function getCompressorById(id: number): Promise<Compressor> {
  const res = await api.get<Compressor>(`/Compressores/${id}`);
  return res.data;
}

export async function createCompressor(
  data: CreateCompressorDto
): Promise<Compressor> {
  const res = await api.post<Compressor>("/Compressores", data);
  return res.data;
}

export async function updateCompressor(
  id: number,
  data: UpdateCompressorDto
): Promise<Compressor> {
  const res = await api.patch<Compressor>(`/Compressores/${id}`, data);
  return res.data;
}

export async function deleteCompressor(id: number): Promise<void> {
  await api.delete(`/Compressores/${id}`);
}
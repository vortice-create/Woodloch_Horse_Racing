export const TRACK_LENGTH = 12; // Start + 10 steps + Finish

export interface HorseDef {
  id: number;
  color: string;
  borderColor: string;
  textColor: string;
  name: string;
}

export const HORSES: HorseDef[] = [
  { id: 1, name: "One", color: "#FFFFFF", borderColor: "#2E4A3D", textColor: "#2E4A3D" },
  { id: 2, name: "Two", color: "#1A2B49", borderColor: "#1A2B49", textColor: "#FFFFFF" }, // Navy
  { id: 3, name: "Three", color: "#E8B923", borderColor: "#B8860B", textColor: "#2E4A3D" }, // Mustard
  { id: 4, name: "Four", color: "#B7410E", borderColor: "#8B0000", textColor: "#FFFFFF" }, // Rust
  { id: 5, name: "Five", color: "#2E4A3D", borderColor: "#1B2E24", textColor: "#FFFFFF" }, // Forest
  { id: 6, name: "Six", color: "#000000", borderColor: "#000000", textColor: "#FFFFFF" }, // Black
];

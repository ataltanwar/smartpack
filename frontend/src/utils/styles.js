export function getLevelBadge(val) {
  const s = String(val || "").trim().toLowerCase();
  if (["high", "very high", "suitable", "yes"].includes(s)) {
    return "bg-[#F0F7F0] text-[#4F7A52] border-[#C8DEC9]";
  }
  if (["medium", "limited", "conditional", "optimal"].includes(s)) {
    return "bg-[#F7EFE3] text-[#70452C] border-[#E4D8C8]";
  }
  if (["low", "very low", "no"].includes(s)) {
    return "bg-[#F4ECE1] text-[#786E64] border-[#E4D8C8]";
  }
  return "bg-[#FCF9F4] text-[#17221C] border-[#E4D8C8]";
}

export function getDotRating(val) {
  const s = String(val || "").trim().toLowerCase();
  if (s === "very high") return 5;
  if (s === "high" || s === "yes" || s === "suitable") return 4;
  if (s === "medium" || s === "moderate" || s === "conditional") return 3;
  if (s === "low" || s === "limited") return 2;
  if (s === "very low" || s === "no") return 1;
  return 3;
}

/**
 * Soft light behind a section: two large blurred pastel blobs, so the white
 * ground never reads as flat. Static, so the blur is rasterised once. The
 * parent section must be `relative overflow-hidden`; put the content in a
 * `relative z-10` wrapper so it paints above the glow.
 */
export function SectionGlow({ side = "left" }: { side?: "left" | "right" }) {
  const primary =
    side === "left" ? "left-[-10%] top-[10%]" : "right-[-10%] top-[10%]";
  const secondary =
    side === "left" ? "right-[-5%] bottom-[-10%]" : "left-[-5%] bottom-[-10%]";

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
      <div
        className={`absolute h-[420px] w-[420px] rounded-full bg-[var(--blob-peach)] blur-[130px] ${primary}`}
      />
      <div
        className={`absolute h-[360px] w-[360px] rounded-full bg-[var(--blob-rose)] blur-[120px] ${secondary}`}
      />
    </div>
  );
}

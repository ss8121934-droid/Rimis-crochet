/**
 * Ambient page backdrop.
 *
 * Sits behind every page and gives the whole site its "warm paper" feel:
 * a fine uncoated-stock grain, two slowly drifting colour clouds (fired clay
 * + dried sage) and barely-there editorial grid lines. Everything here is
 * decorative and inert, so it is hidden from assistive technology and never
 * intercepts pointer events.
 */
export function PageBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* drifting colour clouds */}
      <div
        className="absolute -left-[12%] -top-[10%] h-[46rem] w-[46rem] animate-drift rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle at center, rgba(188, 91, 44, 0.18), transparent 62%)' }}
      />
      <div
        className="absolute -right-[14%] top-[8%] h-[40rem] w-[40rem] animate-drift-reverse rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle at center, rgba(119, 133, 106, 0.2), transparent 64%)' }}
      />
      <div
        className="absolute bottom-[-18%] left-[24%] h-[38rem] w-[38rem] animate-drift rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle at center, rgba(194, 137, 43, 0.16), transparent 66%)' }}
      />

      {/* faint editorial grid */}
      <div className="grid-lines absolute inset-0 opacity-60" />

      {/* uncoated-paper grain */}
      <div className="bg-grain absolute inset-0 opacity-[0.05] mix-blend-multiply" />
    </div>
  )
}

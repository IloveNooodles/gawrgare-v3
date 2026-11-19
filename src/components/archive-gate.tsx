import { useEffect, useRef, useState } from "react";
import { useSite } from "./site-layout";

export function ArchiveGate() {
  const { t } = useSite();
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    if (open && !element.open) element.showModal();
    if (!open && element.open) element.close();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <>
      <button
        ref={trigger}
        className="archive-trigger"
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        {t.archiveTrigger}
      </button>
      <dialog
        ref={dialog}
        className="archive-gate"
        aria-labelledby="archive-title"
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
        onClose={() => {
          setOpen(false);
          trigger.current?.focus();
        }}
      >
        <div className="archive-panel">
          <div className="archive-heading">
            <div>
              <p className="eyebrow">{t.archiveEyebrow}</p>
              <h2 id="archive-title">{t.archiveTitle}</h2>
            </div>
            <button className="archive-close" type="button" onClick={() => dialog.current?.close()}>
              {t.archiveClose}
            </button>
          </div>
          <p className="archive-hint">{t.archiveHint}</p>
          <div className="archive-doors">
            <a
              className="archive-door"
              href="https://v1.mgarebaldhie.com"
              target="_blank"
              rel="noreferrer"
            >
              <span className="door-number" aria-hidden="true">
                V1
              </span>
              <strong>{t.archiveVersion1}</strong>
              <span>{t.archiveVersion1Note}</span>
            </a>
            <a
              className="archive-door"
              href="https://v2.mgarebaldhie.com"
              target="_blank"
              rel="noreferrer"
            >
              <span className="door-number" aria-hidden="true">
                V2
              </span>
              <strong>{t.archiveVersion2}</strong>
              <span>{t.archiveVersion2Note}</span>
            </a>
          </div>
        </div>
      </dialog>
    </>
  );
}

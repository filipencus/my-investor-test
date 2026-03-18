import type { ModalProps } from "../../../../models/funds.model";
import { useEffect, useRef } from "react";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import "./Generic-dialog.styles.css";

export function GenericDialog({ open, title, onClose, children }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    dialogRef.current?.[open ? "showModal" : "close"]?.();
  }, [open]);

  return (
    <dialog ref={dialogRef} className="generic-dialog" role="dialog" aria-modal="true">
      <header className="header-dialog">
        <h2 id="generic-dialog-title">{title}</h2>

        <IconButton onClick={onClose} aria-label={`Close ${title} dialog`} autoFocus>
          <CloseIcon aria-hidden="true" />
        </IconButton>
      </header>
      <div>{children}</div>
    </dialog>
  );
}

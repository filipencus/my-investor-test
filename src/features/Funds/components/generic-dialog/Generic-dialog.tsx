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
    <dialog ref={dialogRef} className="generic-dialog">
      <header className="header-dialog">
        <h2>{title}</h2>

        <IconButton onClick={onClose} aria-label="close">
          <CloseIcon />
        </IconButton>
      </header>
      <div>{children}</div>
    </dialog>
  );
}

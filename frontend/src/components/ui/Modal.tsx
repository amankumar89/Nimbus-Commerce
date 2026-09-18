"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children, footer }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-navy-950/50 backdrop-blur-sm animate-in fade-in"
      />

      {/* Panel */}
      <div className="relative flex max-h-[85vh] w-full flex-col rounded-t-2xl border border-(--color-border) bg-(--color-bg) shadow-2xl animate-in slide-in-from-bottom sm:max-w-md sm:rounded-2xl sm:slide-in-from-bottom-4">
        <div className="flex items-center justify-between border-b border-(--color-border) px-5 py-4">
          <h2 className="text-base font-semibold text-(--color-text)">{title}</h2>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-(--color-text-muted) transition-colors hover:bg-(--color-surface)"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">{children}</div>

        {footer && (
          <div className="border-t border-(--color-border) px-5 py-4">{footer}</div>
        )}
      </div>
    </div>
  );
}
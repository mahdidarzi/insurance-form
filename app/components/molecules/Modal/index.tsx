import React, { ReactNode } from "react";
import { Typography } from "../../atoms";
import Button from "../Button";

interface ModalProps {
  title?: string;
  children: ReactNode;
  onClose: () => void;
  isOpen: boolean;
  hasHeader?: boolean;
  hasLoading?: boolean;
  hasSingleButton?: boolean;
  disabledConfirm?: boolean;
  singleButtonTitle?: string;
  onSingleButtonClick?: () => void;
  primaryButtonTitle?: string;
  onPrimaryButtonClick?: () => void;
  secondaryButtonTitle?: string;
  onSecondaryButtonClick?: () => void;
}

export default function Modal({
  title,
  children,
  onClose,
  isOpen,
  hasHeader = true,
  hasLoading = false,
  hasSingleButton = false,
  disabledConfirm = true,
  singleButtonTitle='انتخاب',
  onSingleButtonClick,
  primaryButtonTitle='تایید',
  onPrimaryButtonClick,
  secondaryButtonTitle='بازگشت',
  onSecondaryButtonClick

}: ModalProps) {
  if (!isOpen) return null;

  return (
    // Overlay with bg blur and 70% black opacity
    <div
      dir="rtl"
      className="fixed inset-0 z-50 flex items-end justify-center bg-[#000000B2]  backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="relative w-full max-w-md bg-white shadow-lg max-h-[90vh] flex flex-col">
        {/* Conditionally render Header */}
        {hasHeader && (
          <header className="flex items-center justify-between h-[56px] border-b border-[#E0E0E0]">
            <Typography variant={"text-medium-16-100"} className="mx-3">
              {title}
            </Typography>

            <button
              onClick={onClose}
              aria-label="بستن"
              className="text-[#C2C2C2] w-4 h-4 flex items-center justify-center  mx-3"
              type="button"
            >
              {/* Simple close icon (X) */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 14 14"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="1" y1="1" x2="13" y2="13" />
                <line x1="13" y1="1" x2="1" y2="13" />
              </svg>
            </button>
          </header>
        )}

        {/* Content */}
        <section className="flex-1 overflow-y-auto px-3">
          <div className="mt-2 mb-2">{children}</div>
        </section>

        {/* Footer sticky box */}
        <footer className="sticky bottom-0 bg-white shadow-[0_3px_15px_3px_rgba(34,34,34,0.1)] flex justify-center items-center h-[69px]">
          {hasSingleButton ? (
            <div className="mx-auto">
              <Button onClick={onSingleButtonClick} variant="primary" className="!w-[340px] !h-[49px]" disabled={disabledConfirm}>
                {singleButtonTitle}
              </Button>
            </div>
          ) : (
            <div className="mx-auto flex gap-2.5">
              <Button onClick={onPrimaryButtonClick} loading={hasLoading} variant="primary" className={`!w-[165px] !h-[47px] ${disabledConfirm ? '!bg-[#ACACAC] !text-[#525252]' : ''}`} disabled={disabledConfirm}>
                {primaryButtonTitle}
              </Button>
              <Button onClick={onSecondaryButtonClick} variant="outline-filled" className="!w-[165px] !h-[47px] !border !font-medium" disabled={disabledConfirm}>
                {secondaryButtonTitle}
              </Button>
            </div>
          )}
        </footer>
      </div>
    </div>
  );
}

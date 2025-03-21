"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { MdClose } from "react-icons/md";

type ModalProps = {
  show: boolean;
  onClose: () => void;
  metadata: {
    title: string;
    submit: string;
    redirectTo: string;
  };

  children: React.ReactNode;
};

export default function Modal({
  show,
  onClose,
  metadata: { title, redirectTo, submit },
  children,
}: ModalProps) {
  const modalRef = useRef<null | HTMLDialogElement>(null);

  useEffect(() => {
    if (show) {
      modalRef.current?.showModal();
    }
  }, [show]);

  //close by clicking outside - consider us
  // useEffect(() => {
  //   const handleClickOutside = (e: MouseEvent) => {
  //     const target = e.target as HTMLElement;
  //     if (modalRef.current && target.dataset.type === "modal") {
  //       closeModal();
  //     }
  //   };
  //   document.addEventListener("click", handleClickOutside);

  //   return () => document.removeEventListener("click", handleClickOutside);
  // }, []);

  const closeModal = () => {
    modalRef.current?.close();
    onClose();
  };

  return (
    <dialog
      ref={modalRef}
      role="dialog"
      // data-type="modal"
      className="fixed top-50 left-50 -translate-y-50 z-10 rounded backdrop:bg-gray-800/50 bg-red-500"
    >
      <div className="w-[480px] max-w-full bg-white flex flex-col z-15">
        <div className="flex flex-row justify-between items-start bg-blue-200">
          <h1 className="text-2xl pl-4 py-3">{title}</h1>
          <button onClick={closeModal} className="p-1">
            <MdClose size={20} />
          </button>
        </div>
        <div className="px-4 my-4">
          {children}
          <div className="flex flex-row justify-end mt-6">
            <button className="px-6 py-2 rounded-md text-white transition duration-200 bg-blue-500 hover:bg-blue-600">
              <Link href={redirectTo}>{submit}</Link>
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}

import {
  Dialog,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "../ui/dialog";
import Image from "next/image";
import { CopyToClipboard } from "./copyToClipboard";
import { ReactNode } from "react";

export const DonationModal = ({
  children,
  isDonationModalOpen,
  setIsDonationModalOpen,
}: {
  isDonationModalOpen: boolean;
  setIsDonationModalOpen: (value: boolean) => void;
  children: ReactNode;
}) => {
  return (
    <Dialog open={isDonationModalOpen} onOpenChange={setIsDonationModalOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">Faça uma doação</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col items-center space-y-4">
            <div className="p-2 bg-white rounded-lg border border-gray-200">
              <Image
                src="/images/pix-qrcode.png"
                alt="QR Code PIX"
                width={200}
                height={200}
                className="w-full max-w-[200px] h-auto"
              />
            </div>
            <div className="w-full">
              <p className="text-sm font-medium text-center mb-2">
                Chave PIX (Email):
              </p>
              <div className="flex items-center justify-center gap-2">
                <code className="bg-gray-100 px-3 py-1 rounded text-sm">
                  projetobonny@gmail.com
                </code>
                <CopyToClipboard text="projetobonny@gmail.com" />
              </div>
            </div>
            <div className="text-center text-sm text-gray-600 mt-4">
              <p>Toda doação nos ajuda a resgatar mais animais!</p>
              <p className="mt-1">Projeto Bonny - CNPJ: 47.641.646/0001-11</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

"use client";
import { Button } from "@/components/ui/button";
import {
  DialogFooter,
  DialogHeader,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogClose,
  DialogTitle,
} from "@/components/ui/dialog";
import { ReactElement } from "react";

export default function MessageModal({
  children,
  title,
  onClose,
  open,
  buttonText,
}: {
  children: ReactElement;
  title: string;
  onClose: () => void;
  open: boolean;
  buttonText?: string;
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle />
          <DialogDescription>{title}</DialogDescription>
        </DialogHeader>
        <div>{children}</div>
        <DialogFooter className="flex justify-center sm:justify-center">
          <DialogClose asChild>
            <Button size="lg" type="button">
              {buttonText ?? "Ok"}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

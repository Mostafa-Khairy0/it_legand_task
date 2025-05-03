"use client";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  Button,
} from "@/components";
import { FileText } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export const PdfDialog = ({ pdfUrl }: { pdfUrl: string }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="border-border border-2 w-[40px] h-[40px] rounded-full flex justify-center items-center"
        >
          <FileText size={20} className="text-ring" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[80vw] h-[90vh] p-0 rounded-none">
        <VisuallyHidden>
          <DialogTitle>PDF Material</DialogTitle>
        </VisuallyHidden>
        <div className="w-full h-full">
          <iframe title="PDF Viewer" src={pdfUrl} width="100%" height="100%" />
        </div>
      </DialogContent>
    </Dialog>
  );
};

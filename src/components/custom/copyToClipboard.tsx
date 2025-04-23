"use client";

import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast"; // Importando o hook corretamente

export const CopyToClipboard = ({ text }: { text: string }) => {
  const { toast } = useToast(); // Usando o hook para acessar a função toast

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiado!",
      description: "Chave PIX copiada para a área de transferência",
    });
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-8 w-8"
      onClick={copyToClipboard}
    >
      <Copy className="h-4 w-4" />
    </Button>
  );
};

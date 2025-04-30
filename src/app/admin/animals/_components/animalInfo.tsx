"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Pencil, Check, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { toast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { editAnimal } from "../_lib/editAnimal";
import { useRouter } from "next/navigation";
import { Animal } from "../_lib/listAnimals";
import { DogFell, DogSize, GenderEnum } from "@/types/enums";

interface AnimalInfoProps {
  animal: Animal;
}

export default function AnimalInfo({ animal }: AnimalInfoProps) {
  const router = useRouter();
  const [editField, setEditField] = useState<string | null>(null);
  const { register, handleSubmit, reset } = useForm<Partial<Animal>>();

  const handleEdit = (field: string) => {
    setEditField(field);
    reset({ [field]: animal[field as keyof Animal] });
  };

  const handleCancel = () => {
    setEditField(null);
  };

  const onSubmit = async (data: Partial<Animal>) => {
    try {
      await editAnimal(animal._id, data);

      toast({
        title: "Sucesso",
        description: "Informações do animal atualizadas com sucesso",
      });

      setEditField(null);
      router.refresh();
    } catch {
      toast({
        title: "Erro",
        description: "Falha ao atualizar informações do animal",
        variant: "destructive",
      });
    }
  };

  const renderField = (
    label: string,
    field: keyof Animal,
    type: "text" | "number" | "textarea" | "boolean" | "select" = "text",
    options?: { value: string; label: string }[],
  ) => {
    const isEditing = editField === field;

    // Function to get label for enum values
    const getValueLabel = (value: string) => {
      if (!options) return value;
      const option = options.find((opt) => opt.value === value);
      return option ? option.label : value;
    };

    return (
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
          <span className="font-medium text-gray-700">{label}:</span>
          {!isEditing && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleEdit(field as string)}
              className="h-8 w-8 p-0"
            >
              <Pencil className="h-4 w-4" />
              <span className="sr-only">Editar {label}</span>
            </Button>
          )}
        </div>

        {isEditing ? (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex items-center gap-2"
          >
            {type === "textarea" ? (
              <Textarea
                {...register(field)}
                defaultValue={animal[field] as string}
                className="flex-1 min-h-[100px]"
              />
            ) : type === "boolean" ? (
              <Switch
                {...register(field)}
                defaultChecked={animal[field] as boolean}
              />
            ) : type === "select" && options ? (
              <Select
                defaultValue={animal[field] as string}
                onValueChange={(value) => {
                  reset({ ...animal, [field]: value });
                }}
              >
                <SelectTrigger className="flex-1">
                  <SelectValue
                    placeholder={`Selecione ${label.toLowerCase()}`}
                  />
                </SelectTrigger>
                <SelectContent>
                  {options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Input
                type={type}
                {...register(field)}
                defaultValue={animal[field] as string | number}
                className="flex-1"
              />
            )}
            <Button
              type="submit"
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0"
            >
              <Check className="h-4 w-4" />
              <span className="sr-only">Salvar</span>
            </Button>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={handleCancel}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Cancelar</span>
            </Button>
          </form>
        ) : type === "boolean" ? (
          <div className="pl-1">
            <Badge variant={animal[field] ? "default" : "outline"}>
              {animal[field] ? "Disponível" : "Não Disponível"}
            </Badge>
          </div>
        ) : type === "select" ? (
          <div className="pl-1 break-words">
            {getValueLabel(animal[field] as string)}
          </div>
        ) : (
          <div className="pl-1 break-words">{animal[field]}</div>
        )}
      </div>
    );
  };

  return (
    <div className="mb-10 space-y-6">
      <h3 className="text-xl font-bold mb-6 border-b pb-2">
        Informações do Animal
      </h3>

      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4">Informações Básicas</h4>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          {renderField("Nome", "name")}
          {renderField("Idade", "age", "number")}
        </div>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          {renderField("Gênero", "gender", "select", [
            { value: GenderEnum.MALE, label: "Macho" },
            { value: GenderEnum.FEMALE, label: "Fêmea" },
          ])}
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {renderField("Raça", "breed")}
          {renderField("Tamanho", "size", "select", [
            { value: DogSize.SMALL, label: "Pequeno" },
            { value: DogSize.MEDIUM, label: "Médio" },
            { value: DogSize.BIG, label: "Grande" },
          ])}
        </div>
      </div>

      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4">Aparência</h4>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          {renderField("Cor da Pelagem", "fellColor")}
          {renderField("Tipo de Pelagem", "fell", "select", [
            { value: DogFell.SHORT, label: "Curta" },
            { value: DogFell.LONG, label: "Longa" },
          ])}
        </div>
        {renderField("Temperamento", "temperament")}
      </div>

      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4">Informações de Histórico</h4>
        <div className="mb-4">{renderField("Situação Atual", "situation")}</div>
        {renderField("Histórico", "history", "textarea")}
      </div>

      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4">Imagens</h4>
        <div className="mb-6">
          <div className="font-medium text-gray-700 mb-2">
            Imagem de Perfil:
          </div>
          <div className="relative aspect-square w-full max-w-[300px] overflow-hidden rounded-lg">
            <Image
              src={
                animal.imageProfile || "/placeholder.svg?height=300&width=300"
              }
              alt={animal.name}
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div>
          <div className="font-medium text-gray-700 mb-2">
            Imagens Adicionais:
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {animal.images?.map((img, index) => (
              <div
                key={index}
                className="relative aspect-square w-full overflow-hidden rounded-lg"
              >
                <Image
                  src={img || "/placeholder.svg?height=150&width=150"}
                  alt={`${animal.name} - imagem ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4">Disponibilidade</h4>
        <div className="flex items-start space-x-3">
          <div className="flex-1">
            {renderField("Disponível para Adoção", "available", "boolean")}
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from "@/components/ui/select";
import { UserRole } from "@/constants/permissions";
import { toast } from "@/hooks/use-toast";
import { Check, Pencil, X } from "lucide-react";
import { useState } from "react";
import { updateUserRole } from "../_lib/updateUserRole";
import { useRouter } from "next/navigation";

const userRoleLabel: Record<UserRole, { label: string; value: UserRole }> = {
  [UserRole.USER]: {
    label: "Usuário",
    value: UserRole.USER,
  },
  [UserRole.VOLUNTEER]: {
    label: "Voluntário",
    value: UserRole.VOLUNTEER,
  },
  [UserRole.ADMIN]: {
    label: "Administrador",
    value: UserRole.ADMIN,
  },
};

export const RoleSelect = ({
  currentRole,
  userId,
}: {
  currentRole: string;
  userId: string;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedRole, setSelectedRole] = useState(currentRole);
  const route = useRouter();

  const onChangeRole = (value: string) => {
    setSelectedRole(value);
  };

  const updateRole = async () => {
    try {
      await updateUserRole(selectedRole, userId);
      route.refresh();
      setIsEditing(false);
      toast({
        title: "O cargo do usuário foi atualizado com sucesso!",
      });
    } catch {
      toast({
        title: "Erro",
        description:
          "Houve um problema ao atualizar o cargo. Por favor, tente novamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <span className="font-medium text-gray-700">Cargo:</span>{" "}
        <span>{userRoleLabel[currentRole as UserRole].label}</span>
        {!isEditing && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsEditing(true)}
            className="h-8 w-8 p-0"
          >
            <Pencil className="h-4 w-4" />
            <span className="sr-only">Editar Cargo:</span>
          </Button>
        )}
      </div>

      {isEditing && (
        <>
          <Select
            defaultValue={currentRole}
            value={selectedRole}
            onValueChange={onChangeRole}
          >
            <SelectTrigger className="flex-1">
              <SelectValue placeholder={`Selecione o cargo`} />
            </SelectTrigger>
            <SelectContent>
              {(Object.keys(userRoleLabel) as UserRole[]).map(
                (option: UserRole) => (
                  <SelectItem key={option} value={userRoleLabel[option].value}>
                    {userRoleLabel[option].label}
                  </SelectItem>
                ),
              )}
            </SelectContent>
          </Select>
          <Button
            type="submit"
            size="sm"
            variant="ghost"
            className="h-8 w-8 p-0"
            onClick={updateRole}
          >
            <Check className="h-4 w-4" />
            <span className="sr-only">Salvar</span>
          </Button>
          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={() => {
              setIsEditing(false);
              setSelectedRole(currentRole);
            }}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Cancelar</span>
          </Button>
        </>
      )}
    </div>
  );
};

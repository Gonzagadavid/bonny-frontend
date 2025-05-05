"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Routes } from "@/constants/routes";
import { useRouter } from "next/navigation";

interface FilterButtonProps {
  currentFilter: boolean;
}

export default function FilterButton({ currentFilter }: FilterButtonProps) {
  const router = useRouter();

  const toggleFilter = () => {
    if (currentFilter) {
      router.push(Routes.ADMIN_ANIMALS);
    } else {
      router.push(`${Routes.ADMIN_ANIMALS}?available=true`);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="available-filter"
        checked={currentFilter}
        onCheckedChange={toggleFilter}
      />
      <Label htmlFor="available-filter" className="cursor-pointer">
        Mostrar apenas animais disponíveis
      </Label>
    </div>
  );
}

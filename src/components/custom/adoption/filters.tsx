"use client"

import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface FiltersProps {
  breeds: string[]
  colors: string[]
  sizes: string[]
  genders: string[]
}

export const Filters = ({ breeds, colors, sizes, genders }: FiltersProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  const handleFilterChange = (filterName: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    
    if (value) {
      params.set(filterName, value)
    } else {
      params.delete(filterName)
    }
    
    router.push(`${pathname}?${params.toString()}`)
  }
  
  const clearFilters = () => {
    router.push(pathname)
  }

  return (
    <div className="flex flex-wrap gap-4 mb-8 items-end">
      <div className="w-full md:w-auto">
        <label className="block text-sm font-medium mb-1">Raça</label>
        <Select
          value={searchParams.get('breed') || ''}
          onValueChange={(value) => handleFilterChange('breed', value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Todas as raças" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Todas as raças</SelectItem>
            {breeds.map((breed) => (
              <SelectItem key={breed} value={breed}>
                {breed}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="w-full md:w-auto">
        <label className="block text-sm font-medium mb-1">Cor</label>
        <Select
          value={searchParams.get('color') || ''}
          onValueChange={(value) => handleFilterChange('color', value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Todas as cores" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Todas as cores</SelectItem>
            {colors.map((color) => (
              <SelectItem key={color} value={color}>
                {color}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="w-full md:w-auto">
        <label className="block text-sm font-medium mb-1">Porte</label>
        <Select
          value={searchParams.get('size') || ''}
          onValueChange={(value) => handleFilterChange('size', value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Todos os portes" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Todos os portes</SelectItem>
            {sizes.map((size) => (
              <SelectItem key={size} value={size}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="w-full md:w-auto">
        <label className="block text-sm font-medium mb-1">Gênero</label>
        <Select
          value={searchParams.get('gender') || ''}
          onValueChange={(value) => handleFilterChange('gender', value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Todos os gêneros" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Todos os gêneros</SelectItem>
            {genders.map((gender) => (
              <SelectItem key={gender} value={gender}>
                {gender}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button 
        variant="outline" 
        onClick={clearFilters}
        className="h-10"
      >
        Limpar Filtros
      </Button>
    </div>
  )
}
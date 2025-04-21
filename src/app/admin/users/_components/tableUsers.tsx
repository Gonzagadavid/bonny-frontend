import React from "react";
import { listUsers } from "../_lib/listUsers";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { BackendRoutes } from "@/constants/backend-routes";

export default async function TableUsers() {
  const users = await listUsers();

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Nome</TableHead>
            <TableHead>Nacimento</TableHead>
            <TableHead>E-mail</TableHead>
            <TableHead className="text-right">Celular</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.individualTaxpayerRegistry}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.birthDate}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell className="text-right">{user.cellPhone}</TableCell>
              <TableCell className="text-right">
                <Link href={`${BackendRoutes.USER_DETAILS}/${user._id}`}>
                  Ver detalhes
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

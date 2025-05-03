import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/utils/formatDate";
import { UserData } from "../_lib/getUser";
import { RoleSelect } from "./roleSelect";
import { auth } from "@/app/api/auth/auth";
import { UserRole } from "@/constants/permissions";

export async function UserInfo({ user }: { user: UserData }) {
  const session = await auth();
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center justify-between">
          <span>Informações Pessoais</span>
          <Badge variant="outline">{user.role}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex justify-center">
            <Avatar className="h-24 w-24">
              <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex-1 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Nome</p>
                <p className="font-medium">{user.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Data de Nascimento
                </p>
                <p className="font-medium">{formatDate(user.birthDate)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Telefone</p>
                <p className="font-medium">{user.cellPhone}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">CPF</p>
                <p className="font-medium">{user.individualTaxpayerRegistry}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">ID</p>
                <p className="font-medium text-xs truncate">{user._id}</p>
              </div>
              {session?.user.role === UserRole.ADMIN && (
                <div>
                  <RoleSelect currentRole={user.role} userId={user._id} />
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

import type { Camion } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Vehiculo } from "@/components/tables/camiones-table/ICamion";
import { cn } from "@/lib/utils";

interface CardSelectProps {
  camion: Vehiculo;
  onClick: (camion: Vehiculo) => void;
  isSelected: boolean;
}

export const CardSelectPlaca: React.FC<CardSelectProps> = ({
  camion,
  onClick,
  isSelected,
}) => {
  const handleClick = () => {
    onClick(camion);
  };

  const cardClasses = cn(
    "hover:border-slate-800 dark:hover:border-white",
    isSelected &&
      "bg-blue-100 border-blue-800 dark:bg-sky-600 dark:border-sky-300",
  );
  return (
    <Card className={cardClasses} onClick={handleClick}>
      <CardHeader>
        <CardTitle>Placa: {camion.placa}</CardTitle>
        <p className="font-semibold">Tipo de Vehiculo: {camion.tipoVehiculo}</p>
      </CardHeader>
      <CardContent className="font-medium">
        <p>Chofer:</p>
        <p>{`${camion.chofer.nombre} ${camion.chofer.apellido}`}</p>
      </CardContent>
    </Card>
  );
};

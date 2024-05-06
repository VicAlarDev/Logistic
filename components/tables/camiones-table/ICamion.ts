interface Chofer {
  id: number;
  nombre: string;
  apellido: string;
  cedula: string;
  telefono: string;
  direccion: string;
}

interface Vehiculo {
  id: number;
  placa: string;
  marca: string;
  modelo: string;
  year: number;
  color: string;
  peso: number;
  tipoVehiculo: string;
  volumen: number;
  conductorId: number;
  chofer: Chofer;
}

interface Vehiculos {
  vehiculos: Vehiculo[];
}

export type { Vehiculo, Vehiculos };

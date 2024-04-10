const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// Ajustar la ruta a la carpeta de migraciones según la nueva estructura de directorios
const prismaDirectoryPath = path.join(__dirname, "..", "prisma");

// Ejecutar migración de Prisma
console.log("Ejecutando migración de Prisma...");
const migrationName = "init"; // Cambia esto si deseas usar un nombre de migración diferente
execSync(
  `npx prisma migrate dev --name ${migrationName} --schema=${path.join(
    prismaDirectoryPath,
    "schema.prisma",
  )}`,
  { stdio: "inherit" },
);

// Buscar el directorio de la última migración en la carpeta correcta
const migrationsDir = path.join(prismaDirectoryPath, "migrations");
const latestMigrationDir = fs
  .readdirSync(migrationsDir)
  .filter((dir) => dir.includes(migrationName))
  .pop();

if (!latestMigrationDir) {
  console.error("No se pudo encontrar el directorio de la última migración.");
  process.exit(1);
}

// Construir el comando específico para aplicar la migración
const migrationFilePath = path.join(
  migrationsDir,
  latestMigrationDir,
  "migration.sql",
);
const applyMigrationCommand = `turso db shell logistic < ${migrationFilePath}`;

// Ejecutar el comando para aplicar la migración
console.log("Aplicando la migración a la base de datos...");
execSync(applyMigrationCommand, { stdio: "inherit" });

console.log("Migración aplicada exitosamente.");

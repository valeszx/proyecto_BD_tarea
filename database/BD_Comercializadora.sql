-- =============================================================
-- Base de datos: Comercializadora El Éxito
-- Motor: Microsoft SQL Server
-- =============================================================

IF DB_ID(N'BD_Comercializadora') IS NULL
BEGIN
    CREATE DATABASE BD_Comercializadora;
END;
GO

USE BD_Comercializadora;
GO

IF OBJECT_ID(N'dbo.Clientes', N'U') IS NULL
BEGIN
    CREATE TABLE dbo.Clientes
    (
        IdCliente INT IDENTITY(1,1) NOT NULL,
        Nombres VARCHAR(80) NOT NULL,
        Apellidos VARCHAR(80) NOT NULL,
        Identificacion VARCHAR(20) NOT NULL,
        Telefono VARCHAR(15) NOT NULL,
        Correo VARCHAR(100) NOT NULL,
        Direccion VARCHAR(150) NOT NULL,
        Estado BIT NOT NULL CONSTRAINT DF_Clientes_Estado DEFAULT (1),

        CONSTRAINT PK_Clientes PRIMARY KEY (IdCliente),
        CONSTRAINT UQ_Clientes_Identificacion UNIQUE (Identificacion),
        CONSTRAINT UQ_Clientes_Correo UNIQUE (Correo)
    );
END;
GO

IF NOT EXISTS (SELECT 1 FROM dbo.Clientes WHERE IdCliente BETWEEN 1 AND 5)
BEGIN
    INSERT INTO dbo.Clientes
        (Nombres, Apellidos, Identificacion, Telefono, Correo, Direccion, Estado)
    VALUES
        ('Ana María', 'López Pérez', '1012345678', '3001234567', 'ana.lopez@correo.com', 'Cra. 10 # 20-30', 1),
        ('Carlos Andrés', 'Ruiz Gómez', '1023456789', '3012345678', 'carlos.ruiz@correo.com', 'Calle 15 # 8-12', 1),
        ('María Fernanda', 'Torres Díaz', '1034567890', '3023456789', 'maria.torres@correo.com', 'Av. Central 45-21', 1),
        ('José Luis', 'Martínez Silva', '1045678901', '3034567890', 'jose.martinez@correo.com', 'Cra. 5 # 40-18', 1),
        ('Laura Daniela', 'Ramírez Castro', '1056789012', '3045678901', 'laura.ramirez@correo.com', 'Calle 72 # 11-09', 1);
END;
GO

SELECT
    IdCliente,
    Nombres,
    Apellidos,
    Identificacion,
    Telefono,
    Correo,
    Direccion,
    CASE WHEN Estado = 1 THEN 'Activo' ELSE 'Inactivo' END AS Estado
FROM dbo.Clientes
ORDER BY IdCliente;

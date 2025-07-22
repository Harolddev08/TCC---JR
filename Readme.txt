# Sistema de Gestión de Tareas – TCC (JR Developer Challenge)

Aplicación full-stack que permite registrar, filtrar y visualizar tareas con
dashboard de métricas básicas.  
Stack:

| Capa | Tecnología | Versión |
|------|------------|---------|
| Frontend | Angular | **TODO:** 17.x |
| Backend  | Spring Boot | **TODO:** 3.5.3 |
| BD       | SQL Server | 2019+ |
| Auth     | JWT (jjwt 0.11.5) |  |

---

## Contenido

1. [Requisitos](#requisitos)
2. [Instalación & ejecución](#instalación--ejecución)
3. [Datos de prueba (SQL)](#datos-de-prueba-sql)

---

## Requisitos

| Herramienta | Versión mínima | Comprobado |
|-------------|----------------|------------|
| **Java JDK** | **TODO:** 17 u 21 | ✅ |
| **Node / npm** | **TODO:** `<versión>` / `<versión>` | ✅ |
| Angular CLI | **TODO:** `ng v` | ✅ |
| SQL Server | 2019 | ✅ |

---

## Instalación & ejecución

### 1. Clonar

```bash
git clone https://github.com/Harolddev08/TCC---JR.git
cd TCC---JR
git checkout dev   # rama de trabajo

 Backend

cd Backend
./mvnw spring-boot:run

	•	Puerto: TODO: 8080
	•	Swagger: http://localhost:8080/swagger-ui.html
	•	JWT secret: TODO: <EN_APLICATION.PROPERTIES>

  Fronted

cd ../Fronted
npm install
ng serve --open        # puerto 4200 por defecto

Datos prueba:

INSERT INTO dbo.tarea (titulo, descripcion, completada, Prioridad, due_date)
VALUES
-- 1 – 5
('Planificar sprint Q3'               ,'Definir alcance y metas del sprint'              , 0,'ALTA' ,'2025-07-29'),
('Revisar pull-requests'              ,'Code review pendientes en el repositorio'        , 0,'MEDIA', NULL        ),
('Actualizar documentación API'       ,'Agregar endpoints de autenticación'              , 1,'BAJA' , NULL        ),
('Diseñar mockups dashboard'          ,'Versión mobile y desktop'                        , 0,'MEDIA','2025-08-02'),
('Configurar CI/CD GitHub Actions'    ,'Pipeline con build, test y deploy'               , 1,'ALTA' , NULL        ),

-- 6 – 10
('Optimizar consultas SQL'            ,'Añadir índices a tablas críticas'                , 0,'ALTA' ,'2025-07-27'),
('Crear pruebas unitarias servicio X' ,'Cobertura mínima 80 %'                           , 0,'MEDIA','2025-08-05'),
('Refactor componente login'          ,'Migrar a standalone components'                  , 1,'BAJA' , NULL        ),
('Reunión retro sprint'               ,'Analizar puntos de mejora'                       , 0,'BAJA' ,'2025-07-26'),
('Investigar librería de charts'      ,'Comparar ngx-charts vs ECharts'                  , 0,'MEDIA', NULL        ),

-- 11 – 15
('Implementar cache Redis'            ,'Cache para endpoints de catálogo'                , 0,'ALTA' ,'2025-08-03'),
('Corregir bug #231'                  ,'Error al filtrar tareas completadas'             , 1,'MEDIA', NULL        ),
('Preparar demo cliente'              ,'Demo funcional con datos reales'                 , 0,'ALTA' ,'2025-07-30'),
('Actualizar dependencias NPM'        ,'Angular 17.3 → 17.4 y Material 20.2'             , 1,'BAJA' , NULL        ),
('Revisar seguridad JWT'              ,'Rotación de claves y expiración'                 , 0,'MEDIA','2025-08-01'),

-- 16 – 20
('Añadir modo oscuro'                 ,'Toggle en ajustes de usuario'                    , 0,'BAJA' , NULL        ),
('Benchmark servicio tareas'          ,'Pruebas de carga con 1 k RPS'                    , 0,'MEDIA','2025-08-04'),
('Integrar pasarela de pagos'         ,'Sandbox PayU para pruebas'                       , 0,'ALTA' ,'2025-08-10'),
('Lanzar encuesta UX'                 ,'Feedback de usuarios internos'                   , 1,'BAJA' , NULL        ),
('Documentar arquitectura'            ,'Diagrama C4 actualizado'                         , 0,'MEDIA','2025-07-31');


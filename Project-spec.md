## Nombre (provisional)

**Law-bot Mini** — Chat privado con documentos para equipos muy pequeños.

## Descripción breve

Aplicación web minimalista donde usuarios autenticados chatean con *sus* documentos. Un administrador único asigna qué documentos puede usar cada usuario. No hay navegación pública: todo requiere inicio de sesión.

### Enfoque legal (caso de uso principal)

Pensada para **estudios jurídicos** o **abogados independientes**: cada **cliente** puede hacer preguntas a **sus documentos legales** (contratos, escrituras, poderes, correos relevantes, minutas). El **abogado (admin)** controla la incorporación de documentos y su asignación por cliente o por **asunto/materia**.

## Objetivo del producto

Facilitar consultas rápidas a documentos privados (pocos archivos, tamaño pequeño) manteniendo control estricto de acceso por usuario, con una interfaz simple y sin funciones superfluas.

## Público objetivo

* Estudios jurídicos o abogados independientes que atienden pocos clientes simultáneamente y necesitan conversar con 2–10 documentos por cliente.
* Equipos de 1–5 personas que necesitan conversar con 2–10 documentos internos.
* Casos de uso típicos: lectura asistida de políticas, contratos, manuales, apuntes.

## Principios de diseño

1. **Privacidad por defecto**: cada documento es privado para su usuario salvo asignación explícita del admin. 
2. **Simplicidad**: flujo claro de "subir → asignar → chatear". 
3. **Transparencia**: siempre se muestra con qué documento se está chateando. 
4. **Control**: el admin es el único que gestiona documentos y asignaciones.


## Alcance del MVP

* Inicio de sesión obligatorio para toda la aplicación.
* Dos roles: **Administrador** (único) y **Usuario**.
* Gestión de documentos por el Administrador: alta, baja, reemplazo y asignación a usuarios.
* Chat con documentos asignados (un documento a la vez por chat).
* Historial de conversaciones del usuario, con opción de borrar conversación.
* Borrado de documentos por el admin (con impacto controlado en chats futuros).
* Auditoría básica: registro de acciones clave (quién sube/asigna/borra, quién chatea con qué documento y cuándo).

## Fuera de alcance (MVP)

* Colaboración en tiempo real entre usuarios.
* Compartir documentos entre usuarios sin pasar por el admin.
* Edición de documentos dentro de la app.
* Anotaciones dentro del PDF/Doc.
* Chat general sin documento.
* Roles múltiples/jerarquías complejas.
* Internacionalización avanzada (i18n completo); se asume idioma español.
* Integraciones externas (Drive, Slack, etc.).

## Supuestos del MVP

* 2–3 documentos iniciales (\~600 KB c/u) y pocos usuarios.
* Archivos de texto común (PDF, DOCX, TXT, MD) y límite de tamaño conservador.
* Una sola persona en rol Administrador.

---

# /FEATURES.md

## Catálogo de funcionalidades (MVP)

### 1. Autenticación obligatoria

* Pantalla de inicio de sesión como única ruta pública.
* Sesión persistente hasta cierre o expiración.

### 2. Gestión de usuarios (mínima)

* Alta/baja de usuarios por el admin.
* Restablecer acceso de un usuario (p. ej., enviar enlace de restablecimiento).

### 3. Gestión de documentos (solo admin)

* Subir documento (metadatos: título, descripción opcional).
* Reemplazar documento (nueva versión, con historial simple de versión).
* Eliminar documento (con advertencia si está asignado).
* Asignar/desasignar documentos a usuarios específicos.
* Ver listado con filtros: por usuario asignado, por estado.

### 4. Conversación con documentos (usuario)

* Seleccionar un documento **asignado** y abrir un chat.
* Mostrar siempre el documento de contexto (nombre/versión).
* Historial de mensajes por conversación.
* Borrar conversación (solo del propio usuario).
* Descargar transcripción del chat (texto plano).

### 5. Panel del Administrador

* Vista de **Usuarios**: crear, desactivar, ver documentos asignados.
* Vista de **Documentos**: subir, reemplazar, eliminar, asignar.
* Vista de **Auditoría**: eventos básicos (quién hizo qué y cuándo).

### 6. Reglas de acceso

* Un usuario solo ve: su perfil, sus documentos asignados y sus chats.
* El admin ve todo y es el único con permisos de gestión.

### 7. Ayuda y transparencia

* Página interna de ayuda: buenas prácticas, límites, preguntas frecuentes.
* Indicador del estado del documento (vigente / reemplazado / sin asignar).

---

# /USER\_STORIES.md

> Prioridad: **M** Must (imprescindible), **S** Should (deseable), **C** Could (opcional)

## Rol: Usuario

1. **M** Como usuario, quiero iniciar sesión para acceder a mis documentos y chats.
2. **M** Como usuario, quiero ver la lista de documentos que me asignó el admin para elegir con cuál chatear.
3. **M** Como usuario, quiero chatear con un documento específico para aclarar dudas del contenido.
4. **M** Como usuario, quiero ver qué documento está activo en el chat para tener claridad de contexto.
5. **M** Como usuario, quiero revisar el historial de mis conversaciones para retomar preguntas anteriores.
6. **S** Como usuario, quiero borrar una conversación específica para mantener orden o privacidad.
7. **S** Como usuario, quiero descargar la transcripción del chat para guardarla o compartirla fuera de la app.

## Rol: Administrador

8. **M** Como admin, quiero iniciar sesión para gestionar usuarios y documentos.
9. **M** Como admin, quiero crear/desactivar usuarios para controlar el acceso.
10. **M** Como admin, quiero subir/documentar un archivo y asignarlo a uno o más usuarios.
11. **M** Como admin, quiero reemplazar un documento por una versión nueva manteniendo su historial simple.
12. **M** Como admin, quiero eliminar un documento no utilizado para mantener orden.
13. **M** Como admin, quiero ver qué documentos tiene cada usuario para ajustar permisos.
14. **S** Como admin, quiero ver un registro básico de auditoría para saber quién hizo qué y cuándo.
15. **C** Como admin, quiero desasignar masivamente un documento cuando queda obsoleto.

---

# /ACCEPTANCE\_CRITERIA.md

## Formato Given/When/Then

### Inicio de sesión (Usuario/Admin)

* **Given** no estoy autenticado, **When** intento acceder a cualquier URL privada, **Then** soy redirigido a la pantalla de inicio de sesión.
* **Given** ingreso credenciales válidas, **When** envío el formulario, **Then** accedo al área correspondiente a mi rol.

### Lista de documentos (Usuario)

* **Given** estoy autenticado como usuario, **When** abro "Mis documentos", **Then** veo sólo los documentos asignados a mí, con título y estado.

### Chat con documento

* **Given** tengo documentos asignados, **When** abro un documento y comienzo un chat, **Then** la cabecera del chat muestra el nombre y versión del documento activo.
* **Given** envío una pregunta, **When** el sistema responde, **Then** la respuesta debe referir al documento activo como fuente explícita.

### Historial y borrado de conversación

* **Given** tengo conversaciones previas, **When** abro "Mis chats", **Then** veo la lista con fecha, documento y resumen breve.
* **Given** selecciono "Borrar" sobre un chat propio, **When** confirmo, **Then** el chat deja de estar visible para mí.

### Gestión de documentos (Admin)

* **Given** soy admin, **When** subo un documento con metadatos válidos, **Then** queda disponible para asignación.
* **Given** un documento tiene versión nueva, **When** lo reemplazo, **Then** los chats futuros señalan que existe una versión más reciente.
* **Given** un documento está asignado, **When** intento eliminarlo, **Then** recibo advertencia y debo confirmar con impacto descrito.

### Asignación a usuarios (Admin)

* **Given** soy admin, **When** asigno un documento a un usuario, **Then** el usuario lo ve en su lista.
* **Given** retiro la asignación, **When** guardo cambios, **Then** el usuario ya no puede abrir nuevos chats con ese documento.

### Auditoría

* **Given** se ejecuta una acción crítica (subir, asignar, borrar, chatear), **When** la acción finaliza, **Then** se registra un evento legible con actor, acción, recurso, fecha.

---

# /PERMISSIONS.md

## Roles

* **Administrador (único)**: control total de usuarios, documentos, asignaciones y auditoría.
* **Usuario**: acceso a sus documentos asignados y a sus propias conversaciones.

## Matriz de permisos (MVP)

| Acción                                | Usuario | Admin             |
| ------------------------------------- | ------- | ----------------- |
| Iniciar sesión                        | ✔️      | ✔️                |
| Ver/editar perfil propio              | ✔️      | ✔️                |
| Ver listado de documentos asignados   | ✔️      | ✔️ (todos)        |
| Abrir chat con documento asignado     | ✔️      | ✔️ (para pruebas) |
| Ver/borrar sus propias conversaciones | ✔️      | ✔️ (todas)        |
| Subir/editar/eliminar documentos      | ❌       | ✔️                |
| Asignar/desasignar documentos         | ❌       | ✔️                |
| Alta/baja usuarios                    | ❌       | ✔️                |
| Ver auditoría                         | ❌       | ✔️                |

---

# /UX\_FLOWS.md

## Flujo 1: Inicio de sesión obligatorio

1. Usuario visita la URL raíz → 2) Se muestra pantalla de login → 3) Usuario se autentica → 4) Redirección a zona privada según rol.

## Flujo 2: Consultar documento (Usuario)

1. Usuario autenticado entra a **Mis documentos** → 2) Selecciona un documento asignado → 3) Se abre vista de **Chat** con el documento (título/versión visibles) → 4) Usuario formula preguntas → 5) Puede volver al listado o cerrar sesión.

## Flujo 3: Historial de chats (Usuario)

1. Usuario va a **Mis chats** → 2) Lista de conversaciones (fecha, documento, último mensaje) → 3) Abre o borra una conversación → 4) Confirmación de borrado.

## Flujo 4: Subir y asignar (Admin)

1. Admin entra a **Documentos** → 2) **Subir documento** (título/nota) → 3) Guardar → 4) **Asignar a usuarios** (selección múltiple) → 5) Confirmar → 6) Usuarios ven el nuevo documento en su lista.

## Flujo 5: Reemplazar documento (Admin)

1. Admin selecciona documento → 2) **Reemplazar** (nueva versión) → 3) Confirmar → 4) Documentos muestran etiqueta "Hay una versión más reciente" en chats nuevos.

## Flujo 6: Auditoría (Admin)

1. Admin abre **Auditoría** → 2) Filtra por fecha/usuario/acción → 3) Revisa entradas legibles.

---

# /CONTENT\_MODEL.md

> Modelo conceptual (entidades y atributos a nivel de producto; sin detallar tecnología)

## Entidades

* **Usuario**: id, nombre, email, rol (admin/usuario), estado (activo/inactivo), fecha de alta, fecha de último acceso.
* **Documento**: id, título, descripción, estado (vigente/obsoleto), versión actual (n° y fecha), historial de versiones (lista), tamaño aprox., etiquetas opcionales.
* **Asignación**: id, documento\_id, usuario\_id, fecha de asignación, asignado\_por.
* **Conversación**: id, usuario\_id, documento\_id, estado (abierta/cerrada), fecha de creación, fecha de última actividad, resumen opcional.
* **Mensaje**: id, conversación\_id, rol (usuario/sistema/asistente), contenido (texto), fecha.
* **Evento de Auditoría**: id, actor\_id, tipo (subida/asignación/borrado/chat), recurso (documento/usuario/conversación), fecha, descripción.

## Reglas clave

* Un **Documento** puede estar asignado a varios usuarios, pero **nunca** es visible por defecto.
* Un **Usuario** sólo puede crear conversaciones con documentos asignados.
* El **borrado** de un documento impide crear chats nuevos con él; las conversaciones pasadas pueden conservarse con marca de documento eliminado.

---

# /PRIVACY\_AND\_SECURITY.md

## Principios

* **Mínima recopilación**: sólo los datos personales estrictamente necesarios para operar.
* **Aislamiento lógico por usuario**: acceso a documentos y chats limitado al titular asignado.
* **Transparencia**: el usuario sabe con qué documento chatea y puede borrar sus conversaciones.

## Contenidos sensibles

* Documentos subidos por el admin pueden incluir datos privados; se prohíbe su exposición a terceros o a otros usuarios.

## Controles del MVP

* Autenticación obligatoria.
* Matriz de permisos estricta (ver /PERMISSIONS.md).
* Auditoría básica de acciones críticas.
* Página de **Política de Privacidad** dentro de la app (versión simple y clara).

## Ciclo de vida de datos (propuesta)

* **Retención de conversaciones**: por defecto 180 días (configurable).
* **Borrado por el usuario**: puede eliminar conversaciones propias en cualquier momento.
* **Borrado por el admin**: puede eliminar documentos (impacta chats futuros).

## Derechos del usuario

* Acceso a su información visible en la app.
* Solicitud de eliminación de su cuenta y datos asociados (proceso manual simple).

---

# /NON\_FUNCTIONAL.md

> Requisitos no funcionales descritos en lenguaje de producto (sin detalles técnicos)

* **Usabilidad**: interfaz clara, texto legible, estados visibles (cargando, error, éxito).
* **Accesibilidad básica**: navegación por teclado y etiquetas claras en formularios.
* **Rendimiento percibido**: respuestas del chat y cargas de listas en pocos segundos.
* **Confiabilidad**: sesiones estables, manejo de errores con mensajes entendibles.
* **Escala adecuada**: orientado a pocos usuarios y pocos documentos sin complejidad extra.
* **Trazabilidad**: auditoría básica consultable por el admin.

---

# /ANALYTICS\_AND\_METRICS.md

## Métricas de éxito (MVP)

* **Activación**: % de usuarios que inician sesión y abren su primer chat.
* **Uso**: # conversaciones creadas por usuario por semana.
* **Eficacia**: % de respuestas marcadas como útiles (encuesta simple opcional).
* **Retención**: % de usuarios que vuelven a usar el chat en 7/30 días.
* **Calidad operativa**: # incidentes por semana (fallos, confusiones de permisos).

## Eventos a registrar

* Inicio de sesión, subida/ reemplazo/ eliminación de documento, asignación/ desasignación, creación/ borrado de conversación.

---

# /EDGE\_CASES.md

* **Documento grande**: si excede el tamaño permitido, mostrar mensaje claro y bloquear la subida.
* **Documento reemplazado durante un chat**: los chats existentes indican que hay una versión más nueva para futuras preguntas.
* **Intento de chat con documento no asignado**: bloquear y mostrar explicación.
* **Eliminación de documento asignado**: requerir confirmación y detallar impacto.
* **Usuario desactivado**: su acceso queda bloqueado, pero se conserva historial.
* **Nombre de documento duplicado**: permitir, pero mostrar id/versión/fecha para distinguir.
* **Cuentas de prueba**: claramente marcadas para no mezclar con producción (si aplica).

---

# /ROADMAP.md

## MVP (v1.0)

* Autenticación obligatoria.
* Roles Usuario/Admin.
* Subir/Asignar/Eliminar/Reemplazar documentos (admin).
* Chat con documento (usuario).
* Historial y borrado de conversaciones.
* Auditoría básica.
* Página de ayuda y política de privacidad.

## Siguientes (v1.1+)

* Búsqueda dentro de documentos.
* Etiquetas/categorías de documentos.
* Compartir temporalmente un documento con otro usuario (con caducidad).
* Notas o marcadores personales por chat.
* Exportación PDF del historial.
* Reporte simple de uso para el admin.

---

# /GLOSSARY.md

* **Documento**: archivo subido por el admin que sirve de base para el chat.
* **Asignación**: relación que hace visible un documento a un usuario.
* **Conversación**: sesión de chat entre un usuario y un documento específico.
* **Versión**: reemplazo del archivo original que genera un indicador de vigencia.

---

# /FAQ.md

**¿Puedo chatear con varios documentos a la vez?** No en el MVP. Cada conversación usa un documento explícito.
**¿Los usuarios pueden verse entre sí?** No. Sólo el admin ve todo.
**¿Puedo compartir un documento con otro usuario?** Sólo el admin puede asignarlo a más de un usuario.
**¿Qué pasa si borro una conversación?** Desaparece de tu vista y de métricas de uso personales.
**¿Qué pasa si el admin borra un documento?** No se podrán crear chats nuevos con ese documento; el historial indicará que fue eliminado.
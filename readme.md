
# efl-webapp
---
Repository to develop the new version of MotumWeb Platform

# Componentes

A medida de que avance el desarrollo sobre elementos que se están repitiendo como modals, calendarios, formularios, etc.

## Avatar

| inputs | Descripción |
| ------ | ----------- |
| name | Puede ir un nombre propio, una url o el nombre de la clase de un ícono. |
| type | Hace referencia a que tipo de información que va albergar 'NAME' o 'IMG' o 'ICON'. Por defecto es NAME. |
| isClickable | Muestra el cursor en forma de mano cuando hay un hover en el avatar. Por defecto es false. |
| size | Permite definir un tamaño del avatar. Por defecto tiene el tamaño de 45px. |
| textSize | Permite cambiar el tamaño del texto o icono. Por defecto es 20px. |
| nameType | Si type es NAME entonces será necesario elegir el tipo de nombre para definir si se trata de un nombre propio o el nombre de una compañía ya que se usa una lógica diferente, existen los valores NAME o COMPANY. Por defecto es NAME |
| isIconResize | Esto es en modo ICON y es necesario elegir cuando el ícono a elegir tiene su propio borde circular, en ese caso se pone true. Por defecto es false |
| isResponsive | Se define si será responsivo, y hace que su width y height sea del 100%. Por defecto es false |
| hasBorder | Añade o elimina el borde en el avatar. Por defecto es true. |
| borderSize | Si hasBorder es true entonces se puede definir el tamaño del borde del avatar. Por defecto es 2px. |
| borderColor | Si hasBorder es true entonces se puede elegir el color del borde en dato hexadecimal. Por defecto es #fff. |
| bgColor | Se puede elegir el color del background si está en modo NAME o ICON. |
| textColor | Si está en modo NAME o ICON entonces se puede elegir el color de texto del avatar |

```html
<motum-avatar   [name]="'Erubiel Recoba'"
				[type]="'NAME'"
				[isClickable]="false"
				[size]="'50'"
				[nameType]="'COMPANY'"
				[textSize]="'25'"
				[isIconResize]="false"
				[isResponsive]="false"
				[hasBorder]="false"
				[borderSize]="'4px'"
				[borderColor]="'#f0f'"
				[bgColor]="'#ff0'"
				[textColor]="'#c7c7c7c'"
				></motum-avatar>
```
[Ejemplo de implementación](#encabezado)
## Calendario

Instrucciones de implementación
1. Crear una variable global para mostrar|ocultar el componente dinámicamente - ejemplo: showCalendarModal : boolean = false
2. Crear un método para cambiar showCalendarModal con el objetivo de mostrar|ocultar
3. Si requiere que los datos del calendario persistan, debe utilizar dos variables para almacenar el rango seleccionado y la opción de fechas
4. Crear dos métodos para almacenar el rango y la opción de fechas

| inputs | Descripción |
| ------ | ----------- |
| userDefinedOption | '1' Selecciona el índice para elegir una fecha en el menu de opciones del modal. Ejemplo: Hoy o Ayer o Últimos 7 días o Mes anterior |
| userDefinedRange | Elige el rango de fechas pre seleccionadas en el calendario. El objeto que recibe es moment() |

| outputs | Descripción |
| ------- | ----------- |
| selectedOption | Obtiene la opción de fechas seleccionadas. Ejemplo: Hoy o Ayer o Últimos 7 días o Mes anterior |
| selectedRange | Obtiene un array con el rango seleccionado en el calendario por el usuario en objeto moment: [firstDate, lastDate] |
| calendarLabel | Obtiene un string el rango seleccionado de fechas por el usuario. Ejemplo: 10-12-018 - 12-12-2019 |
| hasBeenClosed | Se dispara para notificar que el modal ha sido cerrado |
```html
<motum-modal-date-picker *ngIf="showCalendarModal"
                         (selectedOption)="getSelectedOption($event)"
                         (hasBeenClosed)="modalClosed()"
                         (selectedRange)="getSelectedRange($event)"
                         (calendarLabel)="getCalendarLabel($event)"
                         [userDefinedOption]="'1'"
                         [userDefinedRange]="[moment(), moment()]">
</motum-modal-date-picker>
```
## Botones
Implementación del componente
| inputs | Descripción |
| ------ | ----------- |
| size| Define el tamaño a 'default' y 'large'. Por defecto es 'default' |
| color| Define el color de la fuente y borde del botón 'primary', 'secondary', 'danger', 'grey', 'gray' y 'white'. Por defecto es 'primary'  |
| hoverColor| Estable el color de hover del botón 'primary' y 'success'. Por defecto es 'primary' |
| outline| Agrega el color de fondo dependiendo de la propiedad 'color'. Por defecto es false|
| round| Redondea los bordes del botón. Por defecto es 'true' |

```html
<button motum-button
	    [size]="large"
        color="secondary"
        outline="true"
        round="false">Im' a button!</button>
```
[Ejemplo de implementación](#pie-de-página)

## Formulario de usuarios

Implementar el siguiente componente que va a contener el formulario
| inputs | Descripción |
| ------ | ----------- |
| align| Elige la alineación entre 'center' y 'right'. Por defecto es 'center'.|
| cols | Puede establecer entre 2 o 3. Por defecto es 2.|
| hasTabs| Elige 'true' si desea agregar tabs. Por defecto es 'false'.|
| hasFooter| Elige 'false' si desea quitar la sección footer. Por defecto es 'true'.|
```html
<motum-modal-form   [align]="right" 
					[hasTabs]="true" 
	                [cols]="2"
	                [hasFooter]="false">
</motum-modal-form>
```

Si desea solo el espacio del formulario, sin encabezado o pie de página y solo desea ese espacio específico.
```html
<motum-modal-form>
</motum-modal-form>
```
Si desea establecer espacios asignados como encabezado, contenido y pie de página.
```html
<motum-modal-form> 
	 <div modal-form-header></div>
	 <div modal-form-content></div>
	 <div modal-form-footer><div>
</motum-modal-form>
```
A continuación se presenta un ejemplo de la implementación de un formulario que implementa el componente "Tabset " de bootstrap con encabezado, contenido y pie de página, además de sus clases de estilo necesarias.

### Encabezado
```html
<motum-modal-form> 
	 <div modal-form-header>
	 <div  class="row">
		<div  class="motum-avatar-section">
			<motum-avatar [name]="initials"
						  [type]="'NAME'"></motum-avatar>
		</div>
		<div  class="motum-avatar-labelEdit">
			<div  class="name">
				{{userModel.name}}
			</div>
			<div>
				{{userModel.rol}}
			</div>
		</div>
	</div>
 </div>
</motum-modal-form>
```
### Contenido
Puntos importantes:
 - El contenido se puede dividir en dos secciones.
 - Después del div con la clase "motum-inputs-section" el primer div llevará la clase "first" para que agregué un espacio arriba.
 - El div que va a contener el input tendrá la clase "form-group" para agregar espacio abajo.
 - Hay una clase "motum-top-spacing" para agregar más espacio donde se desee y una clase "hr" para una línea
 - Para el caso donde alguna de las secciones no lleve subtitulo al inicio existe una clase "motum-top-spacing-two" para agregar el espacio necesario.

```html
<motum-modal-form> 
 <div modal-form-content>
   <ngb-tabset #t="ngbTabset" [justify]="'end'">
	   <ngb-tab  id="tabUser"  title="users">
		   <ng-template  ngbTabContent>
			   <div  class="tab-content">
				   <div  class="motum-content-title">
						Crear usuario
				   </div>
				   <div  class="row motum-content-body">
					   <div  class="col-lg-6 col-md-12 col-sm-12
					   motum-border-middle">
						   <span  class="motum-w500">Información 
						   personal</span>
						   <div  class="motum-inputs-section">
							   <div  class="row motum-label-input 
							   first">
								 <div  class="col-md-12 motum-
								 w500">
                                  <label>Nombre</label>
								 </div>
								 <div  class="col-md-12 col-sm-12">
								   <div  class="form-group has-
								   success motum-inputForm">
								     <input type="text"  
								     class="form-control input-sm">
								   </div>
								 </div>
							   </div>
						   </div>
					   </div>
					   <div  class="col-lg-6 col-md-12 col-sm-12 
					   motum-second-col">
						   <span  class="motum-w500">Información de 
						   la cuenta</span>
						     <div  class="motum-inputs-section">
							   <div  class="row motum-label-input 
							   first">
								 <div  class="col-md-12 motum-
								 w500">
                                  <label>Teléfono</label>
								 </div>
								 <div  class="col-md-12 col-sm-12">
								   <div  class="form-group has-
								   success motum-inputForm">
								     <input type="text"  
								     class="form-control input-sm">
								   </div>
								 </div>
							   </div>
						     </div>
					   </div>
				   </div>
			   </div>
		   <ng-template>
   	   <ngb-tab>
   </ngb-tabset>
 </div>
</motum-modal-form>
```
### Pie de página

 - La clase 'motum-floating-btns' ofrece las medidas correctas para un formulario de editar y crear y la propiedad 'align' para la alineación.
```html
<motum-modal-form> 
	 <div class="motum-floating-btns"  align="right" modal-form-
	 footer>
		 <button  motum-button
				  [color]="'danger'"
				  [outline]="true"> Cancelar
         </button>
	<div>
</motum-modal-form>
```
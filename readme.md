# 🚀 Portfolio Desarrollador - GitHub Pages

Portfolio profesional y moderno optimizado para GitHub Pages. Diseño contemporáneo con animaciones fluidas y rendimiento optimizado.

## ✨ Características

- **Diseño Moderno**: Esquema oscuro profesional con gradientes y efectos glassmorphism
- **Totalmente Responsivo**: Optimizado para todos los dispositivos
- **Animaciones Fluidas**: Efectos de scroll, partículas y transiciones suaves
- **Rendimiento Optimizado**: Código separado, lazy loading y optimizaciones
- **Accesible**: Cumple estándares WCAG, navegación por teclado
- **SEO Friendly**: Meta tags optimizados y estructura semántica

## 🎯 Demo

👉 **[Ver Demo en Vivo](https://tu-usuario.github.io/)**

## 🛠️ Tecnologías

- HTML5 semántico
- CSS3 moderno (Flexbox, Grid, Custom Properties)
- JavaScript ES6+ (Vanilla JS, sin dependencias)
- Optimizado para GitHub Pages

## 📁 Estructura del Proyecto

```
portfolio/
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── script.js           # JavaScript
├── README.md           # Documentación
└── assets/             # Recursos (opcional)
    ├── images/
    └── icons/
```

## 🚀 Instalación y Configuración

### 1. Clonar o Descargar

```bash
# Opción 1: Clonar repositorio
git clone https://github.com/tu-usuario/portfolio.git
cd portfolio

# Opción 2: Crear nuevo repositorio
mkdir mi-portfolio
cd mi-portfolio
```

### 2. Personalizar Contenido

Edita `index.html` y cambia:

- **Información Personal**:
  ```html
  <h1>Tu Nombre</h1>
  <p class="subtitle">Tu Título Profesional</p>
  <p class="description">Tu descripción personal...</p>
  ```

- **Skills y Tecnologías**:
  ```html
  <span class="tech-tag">React</span>
  <span class="tech-tag">Node.js</span>
  <!-- Añade tus tecnologías -->
  ```

- **Proyectos**:
  ```html
  <h3>Nombre del Proyecto</h3>
  <p>Descripción del proyecto...</p>
  <a href="https://github.com/tu-usuario/proyecto">GitHub →</a>
  ```

- **Enlaces Sociales**:
  ```html
  <a href="https://github.com/tu-usuario">GitHub</a>
  <a href="https://linkedin.com/in/tu-usuario">LinkedIn</a>
  ```

### 3. Personalizar Estilos (Opcional)

En `styles.css`, puedes cambiar:

```css
:root {
  --accent-primary: #00f5ff;    /* Color principal */
  --accent-secondary: #7c3aed;  /* Color secundario */
  /* Personaliza colores según tu marca */
}
```

### 4. Configurar GitHub Pages

1. **Crear Repositorio**:
   - Ve a GitHub y crea un nuevo repositorio
   - Nómbralo `tu-usuario.github.io` para dominio personalizado, o cualquier nombre para subdirectorio

2. **Subir Archivos**:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio commit"
   git branch -M main
   git remote add origin https://github.com/tu-usuario/tu-repositorio.git
   git push -u origin main
   ```

3. **Activar GitHub Pages**:
   - Ve a Settings → Pages
   - Source: Deploy from a branch
   - Branch: main
   - Folder: / (root)
   - Guarda cambios

4. **Verificar Despliegue**:
   - Tu sitio estará disponible en: `https://tu-usuario.github.io/tu-repositorio/`
   - O `https://tu-usuario.github.io/` si el repo se llama `tu-usuario.github.io`

## 🎨 Personalización Avanzada

### Cambiar Colores del Tema

```css
:root {
  /* Esquema Azul-Púrpura (por defecto) */
  --accent-primary: #00f5ff;
  --accent-secondary: #7c3aed;
  
  /* Esquema Verde-Azul */
  /* --accent-primary: #10b981; */
  /* --accent-secondary: #3b82f6; */
  
  /* Esquema Naranja-Rosa */
  /* --accent-primary: #f59e0b; */
  /* --accent-secondary: #ec4899; */
}
```

### Añadir Nuevas Secciones

```html
<section class="nueva-seccion" id="nueva">
  <div class="container">
    <h2 class="section-title">Nueva Sección</h2>
    <!-- Tu contenido aquí -->
  </div>
</section>
```

### Modificar Animaciones

En `script.js`, ajusta las constantes:

```javascript
const CONFIG = {
  ANIMATION_DURATION: 300,    // Duración animaciones
  TYPING_SPEED: 150,          // Velocidad escritura
  PARTICLE_INTERVAL: 800,     // Frecuencia partículas
  ROLES: [                    // Títulos rotativos
    'Tu Título 1',
    'Tu Título 2',
    'Tu Título 3'
  ]
};
```

## 📱 Responsive Design

El portfolio es completamente responsivo con breakpoints:

- **Desktop**: > 1024px
- **Tablet**: 768px - 1024px
- **Mobile**: < 768px
- **Small Mobile**: < 480px

## ⚡ Optimizaciones de Rendimiento

- **CSS Separado**: Mejor cacheo del navegador
- **JavaScript Modular**: Código organizado y eficiente
- **Lazy Loading**: Carga diferida de recursos
- **Debouncing/Throttling**: Optimización de eventos
- **Animaciones Eficientes**: Uso de transform y opacity

## 🔧 Funcionalidades Incluidas

### Navegación
- Scroll suave entre secciones
- Navbar sticky con efectos
- Menú móvil responsive
- Indicador de progreso

### Animaciones
- Efectos de aparición al scroll
- Partículas flotantes
- Efecto typing dinámico
- Hover effects en tarjetas

### Formulario de Contacto
- Validación frontend
- Estados de carga y éxito
- Diseño accesible
- Ready para integración backend

### Accesibilidad
- Navegación por teclado
- Screen reader friendly
- Alto contraste
- Focus management

## 🎯 Integración de Servicios

### Formulario de Contacto

Para integrar un servicio de email, modifica en `script.js`:

```javascript
async simulateSubmission() {
  // Reemplazar con tu servicio (Formspree, Netlify Forms, etc.)
  const response = await fetch('https://formspree.io/f/tu-id', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: form.name.value,
      email: form.email.value,
      message: form.message.value
    })
  });
  
  if (!response.ok) throw new Error('Error al enviar');
  return response.json();
}
```

### Analytics

Añade Google Analytics en `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🌐 SEO y Meta Tags

El template incluye meta tags optimizados. Personaliza en `index.html`:

```html
<meta name="description" content="Tu descripción profesional">
<meta name="keywords" content="tus, palabras, clave">
<meta property="og:title" content="Tu Nombre - Desarrollador">
<meta property="og:description" content="Tu descripción">
<meta property="og:url" content="https://tu-dominio.com">
```

## 🚀 Mejoras Futuras

### PWA (Progressive Web App)
```javascript
// Ya incluido el registro del Service Worker
// Crear sw.js para funcionalidad offline
```

### Dark/Light Mode
```css
/* Añadir en styles.css */
[data-theme="light"] {
  --bg-primary: #ffffff;
  --text-primary: #000000;
  /* ... más variables */
}
```

### Multiidioma
```javascript
// Implementar sistema de traducción
const translations = {
  en: { title: "Full Stack Developer" },
  es: { title: "Desarrollador Full Stack" }
};
```

## 🛠️ Desarrollo Local

Para desarrollo local con live reload:

```bash
# Opción 1: Python
python -m http.server 8000

# Opción 2: Node.js
npx live-server

# Opción 3: VS Code Live Server extension
```

## 🔍 Debugging

### Console Logs
El script incluye logs para debugging. Para producción:

```javascript
// Deshabilitar logs en producción
const DEBUG = false; // Cambiar a false
```

### Performance
```javascript
// Usar Performance API para medir
console.time('App Init');
app.init();
console.timeEnd('App Init');
```

## 📋 Checklist de Lanzamiento

- [ ] Personalizar información personal
- [ ] Añadir proyectos reales con enlaces
- [ ] Configurar enlaces sociales
- [ ] Optimizar meta tags para SEO
- [ ] Configurar servicio de formulario
- [ ] Añadir Google Analytics
- [ ] Verificar responsividad
- [ ] Probar accesibilidad
- [ ] Validar HTML/CSS
- [ ] Configurar dominio personalizado (opcional)

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/amazing-feature`)
3. Commit tus cambios (`git commit -m 'Add amazing feature'`)
4. Push a la rama (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 💬 Soporte

Si tienes problemas o preguntas:

1. Revisa la [documentación](#)
2. Busca en [Issues existentes](https://github.com/tu-usuario/portfolio/issues)
3. Crea un [nuevo Issue](https://github.com/tu-usuario/portfolio/issues/new)

## 🎉 Créditos

- Diseño: Inspirado en portfolios modernos de desarrolladores
- Iconos: SVG personalizados
- Fuentes: [Inter](https://fonts.google.com/specimen/Inter)

---

**¡Construido con ❤️ y mucho ☕!**

> 💡 **Tip**: Dale una ⭐ al repo si te resultó útil!
# Automatizza Web

Web corporativa de Automatizza.

Stack: Next.js + TypeScript + Tailwind CSS.

Estado: Reconstrucción de la web corporativa.

## Node.js

El proyecto usa Node.js 24 LTS estable, desde `24.22.3`. `.nvmrc` selecciona
la línea 24 para permitir las actualizaciones de parche. El mínimo recoge
las correcciones de [seguridad de noviembre de 2026](https://nodejs.org/en/blog/release/v24.22.3)
y sustituye al mínimo anterior de la revisión de Brotli.

Con [nvm](https://github.com/nvm-sh/nvm), desde la raíz del proyecto:

```sh
nvm install
nvm use
npm run check:runtime
npm ci
```

`nvm use` selecciona la versión en la sesión de la terminal. No hace falta
cambiar el Node de Homebrew ni el alias global de nvm. `npm run test:runtime`
comprueba la política. Los comandos de desarrollo, build y arranque ejecutan
el control antes de llamar a Next.js.

Vercel selecciona la línea 24 mediante `engines.node` y administra los parches.
El build estándar (`npm run build`) se detiene si el binario suministrado no
cumple el mínimo. Antes de integrar, comprobar que el proyecto usa ese comando
y que Vercel suministra un parche compatible. La versión que aparece en el log
de build acredita el binario de compilación. Para verificar el runtime de las
funciones, consultar los recursos o logs privados del proveedor.

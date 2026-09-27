# AdSense Script — "Expanded Article"

Script (**JavaScript + CSS**) que **bloquea la pantalla** al hacer *scroll down* y muestra un botón **"Expandir para mostrar el artículo completo"**. Al pulsarlo, se recarga la página con `?expand_article=1` y se dispara el **anuncio Full Screen Modal** de AdSense.

Es un **mirror** de la función **"Expanded Article" de Ezoic** → <https://support.ezoic.com/kb/article/what-is-the-expanded-article-feature>

> **Requisito:** tener activados los **anuncios automáticos** de AdSense para que funcione.

![demo](https://github.com/wantmyusername/adsense-script/assets/6021535/7429ebb0-a602-4294-8e8c-49f29879aa65)

## Cómo funciona

1. Al hacer scroll (~800 px) aparece un **overlay** oscuro (`.tp-gateway-background` con gradiente) y un **botón** (`.tp-gateway-button`).
2. El botón enlaza a la **misma URL + `?expand_article=1`**; al recargar, AdSense muestra el anuncio a pantalla completa.
3. Se guardan **cookies** para no repetirlo:
   - `tpgwv` — versión del gateway.
   - `tpgwcc=1` — confirmación (expira en **5 min**).
4. Reglas de omisión (no muestra el gateway si):
   - `window.hideGatewayButton === true`.
   - La página es corta (`altura ≤ 2.5 × viewport`).
   - Ya se vio el vignette (`tpvignetteviewed`) o se confirmó (`tpgwcc`).
5. Integración con el **SDK de anuncios** (`__tp`, `_tpaq`, `__tp.bit.AddAndFire`) para medir `show_more_version`; usa `window.tpgwb.version` si existe.

## Integración

Pega el bloque completo (`<script>…</script>` + `<style>…</style>`) en tu tema (header/footer) o distribúyelo vía plugin. Asegúrate de tener **anuncios automáticos** activados.

## Configuración

| Ajuste | Cómo |
|---|---|
| Punto de scroll | Variable `triggerLength` (por defecto `800`). Se puede sobreescribir con `window.tpcustscry`. |
| Texto del botón | `customText` (por defecto *"Expandir para mostrar el artículo completo"*). |
| Desactivar | `window.hideGatewayButton = true`. |
| Expiración de cookies | `300000` ms (5 min) en `setInitCookie` y en el `onclick` del botón. |

## Notas

- ⚠️ **Afecta la UX**: bloquea el scroll hasta pulsar el botón. El script afirma no infringir las políticas de AdSense, pero **revisa el cumplimiento** (forzar interacción/visualización de anuncios puede ser sensible).
- Depende de **globals de un SDK de anuncios** (`__tp`, `_tpaq`, `__tpDotData`). Si ese SDK no está presente, `firepx()` no hace nada (está protegido por `typeof window.tpgwb !== 'undefined'`).
- Está pensado como **snippet** (incluye las etiquetas `<script>` y `<style>`), no como módulo ES.

## Licencia

Sin licencia definida. Script de ejemplo; úsalo bajo tu responsabilidad.

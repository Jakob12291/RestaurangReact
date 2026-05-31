# Smakbordet – React bokning

En enklare webbapp (SPA) för att boka bord hos restaurangen Smakbordet.
Byggt med React och Vite, och konsumerar [Restaurang Bokning API](https://github.com/Jakob12291/RestaurangBokning).

## Funktioner

- Stegvis bokningsflöde: välj datum, tid och antal gäster, välj bord,
  fyll i kontaktuppgifter och få en bekräftelse.
- Hämtar lediga bord och skapar bokningar via API:et.
- Komponentbaserad struktur med Context API för delat tillstånd.
- Laddningsindikatorer och felhantering i varje steg.
- Modern och responsiv design.

## Kom igång

Krav: [Node.js](https://nodejs.org/) och att API:et körs.

```bash
# Installera beroenden
npm install

# Starta utvecklingsservern
npm run dev
```

Appen startar på `http://localhost:5173`. API:ets adress sätts i `src/config.js`
(standard `http://localhost:5144`) och kan ändras via miljövariabeln `VITE_API_BASE_URL`.

## Projektstruktur

```
src/components/   Stepper, SelectDate, SelectTable, ContactDetails, Confirmation, BookingWizard
src/context/      BookingContext (delat tillstånd för stegflödet)
src/services/     api.js (anrop mot API:et)
src/config.js     Adress till API:et
```

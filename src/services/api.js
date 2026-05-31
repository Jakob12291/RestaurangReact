import { API_BASE_URL } from '../config'

/**
 * Läser ut ett begripligt felmeddelande ur API-svaret.
 */
async function parseError(response) {
  let message = 'Något gick fel. Försök igen.'
  try {
    const data = await response.json()
    if (data?.message) message = data.message
  } catch {
    /* svaret saknade JSON-kropp */
  }
  if (response.status === 409) {
    message = 'Tyvärr, bordet hann bli upptaget. Välj en annan tid eller ett annat bord.'
  }
  return message
}

/**
 * Hämtar lediga bord för valt datum, tid och antal gäster.
 * Datum skickas som "YYYY-MM-DD" och tid som "HH:mm" (det API:et förväntar sig).
 */
export async function getAvailableTables({ date, time, guests }) {
  const params = new URLSearchParams({
    datum: date,
    tid: time,
    antalGaster: String(guests),
  })
  const res = await fetch(`${API_BASE_URL}/api/bord/lediga?${params.toString()}`)
  if (!res.ok) throw new Error(await parseError(res))
  return res.json()
}

/**
 * Skickar en bokningsförfrågan till servern.
 * Kombinerar datum + tid till en ISO-tidsstämpel som API:et tolkar som starttid.
 */
export async function createBooking({ bordId, date, time, guests, name, phone, email }) {
  const startTid = `${date}T${time}:00`
  const res = await fetch(`${API_BASE_URL}/api/bokningar`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      bordId,
      startTid,
      antalGaster: guests,
      kundNamn: name,
      kundTelefon: phone,
      kundEmail: email || null,
    }),
  })
  if (!res.ok) throw new Error(await parseError(res))
  return res.json()
}

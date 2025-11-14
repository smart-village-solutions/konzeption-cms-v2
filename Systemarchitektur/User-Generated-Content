# User-Generated Content (UGC)
## Erstellung von Nachrichten, Veranstaltungen und Orten

## Übersicht

Die UGC-Funktionalität ermöglicht es Nutzern, eigene Inhalte zu erstellen und mit ihrer Community zu teilen. Dies umfasst drei Content-Typen:
1. **Nachrichten** - Lokale News, Ankündigungen, Informationen
2. **Veranstaltungen** - Community-Events, Termine, Aktivitäten
3. **Orte** - Points of Interest, Locations, Empfehlungen

## Kontext

- **App-Name**: MeinABC
- **Zielgruppe**: Bewohner verschiedener Quartiere
- **Zweck**: Community-Building, lokale Information, Engagement
- **Designsprache**: Mobile-First, 393px Breite, iOS-Style
- **Backend**: Supabase (SupabaseRequired - explizite Datenpersistierung erforderlich)

## Funktionale Anforderungen

### FR-1: Content-Typen Übersicht

#### 1.1 Nachricht (News Article)
- **Zweck**: Lokale Informationen, Ankündigungen, Hinweise
- **Pflichtfelder**: Titel, Text, Kategorie, Quartier
- **Optionale Felder**: Bild, Link, Quelle
- **Sichtbarkeit**: Quartierbezogen
- **Anzeige**: News Feed (Home Screen)

#### 1.2 Veranstaltung (Event)
- **Zweck**: Community-Events, Termine, Aktivitäten
- **Pflichtfelder**: Titel, Beschreibung, Datum, Uhrzeit, Quartier
- **Optionale Felder**: Ort/Adresse, Bild, Anmelde-Link, Kosten
- **Sichtbarkeit**: Quartierbezogen + Kalender
- **Anzeige**: Events Tab, Kalender-Widget

#### 1.3 Ort (Place)
- **Zweck**: Points of Interest, Empfehlungen, Locations
- **Pflichtfelder**: Name, Kategorie, Adresse, Quartier
- **Optionale Felder**: Beschreibung, Bild, Öffnungszeiten, Website, Telefon
- **Sichtbarkeit**: Quartierbezogen
- **Anzeige**: Wegweiser Tab, Karte

### FR-2: Erstellungs-Flow (Allgemein)

#### 2.1 Zugang zur Erstellung
- **Entry Points**:
  - Profil Screen: Action Tile "Beitrag erstellen"
  - Floating Action Button (FAB) auf relevanten Screens
  - "+" Icon in App Navigation (optional)
- **Flow**:
  1. User klickt auf "Beitrag erstellen"
  2. Content-Typ Auswahl wird angezeigt
  3. User wählt Typ (Nachricht / Veranstaltung / Ort)
  4. Entsprechendes Formular öffnet sich
  5. User füllt Formular aus
  6. User sendet ab (mit Vorschau-Option)
  7. Bestätigung + Navigation zurück

#### 2.2 Content-Typ Auswahl
- **Screen**: Modal oder eigener Screen
- **Optionen**: 3 Karten/Tiles für Nachricht, Veranstaltung, Ort
- **Darstellung**: Icon + Titel + Kurzbeschreibung
- **Interaktion**: Tap zum Auswählen

### FR-3: Formular-Anforderungen

#### 3.1 Nachricht erstellen
```
Felder:
✓ Titel* (Text, max 100 Zeichen)
✓ Kategorie* (Dropdown: Allgemein, Verkehr, Kultur, Sport, etc.)
✓ Nachrichtentext* (Textarea, max 1000 Zeichen)
○ Bild hochladen (optional, max 1 Bild, max 5MB)
○ Link (optional, URL)
○ Quelle (Text, z.B. "Stadtteilverein")
✓ Quartier* (Dropdown, vorausgewählt: aktuelles Quartier)

Aktionen:
- Abbrechen (mit Bestätigung bei Änderungen)
- Vorschau (optional)
- Veröffentlichen
```

#### 3.2 Veranstaltung erstellen
```
Felder:
✓ Titel* (Text, max 100 Zeichen)
✓ Kategorie* (Dropdown: Konzert, Workshop, Sport, Markt, etc.)
✓ Beschreibung* (Textarea, max 500 Zeichen)
✓ Datum* (Date Picker)
✓ Uhrzeit Start* (Time Picker)
○ Uhrzeit Ende (Time Picker)
○ Ort/Adresse (Text, mit Autocomplete optional)
○ Kosten (Text, z.B. "Kostenlos", "5 Euro", "Spende")
○ Bild hochladen (optional, max 1 Bild, max 5MB)
○ Anmelde-Link/Website (URL)
✓ Quartier* (Dropdown, vorausgewählt: aktuelles Quartier)

Aktionen:
- Abbrechen
- Vorschau
- Veröffentlichen
```

#### 3.3 Ort erstellen
```
Felder:
✓ Name* (Text, max 80 Zeichen)
✓ Kategorie* (Dropdown: Restaurant, Café, Park, Geschäft, etc.)
✓ Adresse* (Text, mit Autocomplete optional)
○ Beschreibung (Textarea, max 300 Zeichen)
○ Öffnungszeiten (Text oder strukturiert)
○ Telefon (Tel-Input)
○ Website (URL)
○ Bild hochladen (optional, max 1 Bild, max 5MB)
✓ Quartier* (Dropdown, vorausgewählt: aktuelles Quartier)

Aktionen:
- Abbrechen
- Vorschau
- Veröffentlichen
```

### FR-4: Validierung & Fehlerbehandlung

#### 4.1 Feldvalidierung
- **Pflichtfelder**: Rot markieren bei fehlendem Eintrag
- **Zeichenlimits**: Live-Counter anzeigen, blockieren bei Überschreitung
- **Formatvalidierung**: 
  - URLs: Gültiges Format prüfen
  - Telefon: Optionale Formatierung
  - Datum: Nicht in der Vergangenheit (bei Events)
- **Bild-Upload**: 
  - Dateityp: JPG, PNG, WebP
  - Max. Größe: 5MB
  - Fehler: "Datei zu groß" oder "Ungültiges Format"

#### 4.2 Fehler-Anzeige
- **Inline**: Unter dem fehlerhaften Feld
- **Toast**: Für allgemeine Fehler (z.B. Netzwerkfehler)
- **Modal**: Bei kritischen Fehlern oder Abbruch-Bestätigung

### FR-5: Datenpersistierung (Supabase)

#### 5.1 Datenbank-Tabellen
```sql
-- Nachrichten
table: user_news_articles
  - id (uuid, primary key)
  - user_id (uuid, foreign key)
  - title (text)
  - content (text)
  - category (text)
  - image_url (text, nullable)
  - link_url (text, nullable)
  - source (text, nullable)
  - quartier_id (text)
  - status (text: draft, pending, published, rejected)
  - created_at (timestamp)
  - published_at (timestamp, nullable)

-- Veranstaltungen
table: user_events
  - id (uuid, primary key)
  - user_id (uuid, foreign key)
  - title (text)
  - description (text)
  - category (text)
  - event_date (date)
  - start_time (time)
  - end_time (time, nullable)
  - location (text, nullable)
  - address (text, nullable)
  - cost (text, nullable)
  - image_url (text, nullable)
  - registration_url (text, nullable)
  - quartier_id (text)
  - status (text: draft, pending, published, rejected)
  - created_at (timestamp)
  - published_at (timestamp, nullable)

-- Orte
table: user_places
  - id (uuid, primary key)
  - user_id (uuid, foreign key)
  - name (text)
  - category (text)
  - address (text)
  - description (text, nullable)
  - opening_hours (text, nullable)
  - phone (text, nullable)
  - website (text, nullable)
  - image_url (text, nullable)
  - quartier_id (text)
  - status (text: draft, pending, published, rejected)
  - created_at (timestamp)
  - published_at (timestamp, nullable)
```

#### 5.2 Bild-Upload (Supabase Storage)
```
Bucket: ugc-images
Pfad: /{content_type}/{user_id}/{filename}
Beispiel: /news/abc123/image-20250114.jpg

Berechtigungen:
- Upload: Nur authentifizierte User
- Read: Public (nach Moderation)
- Max Size: 5MB
```

#### 5.3 Status-Workflow
1. **draft**: Entwurf (gespeichert, nicht eingereicht)
2. **pending**: Eingereicht, wartet auf Moderation
3. **published**: Moderiert und veröffentlicht
4. **rejected**: Abgelehnt (mit Begründung)

### FR-6: Moderation (Optional für MVP)

#### 6.1 Automatische Moderation
- **Auto-Publish**: Inhalte direkt veröffentlichen (einfachste Variante)
- **Keyword-Filter**: Blockieren von verbotenen Begriffen
- **Link-Prüfung**: Warnung bei externen Links

#### 6.2 Manuelle Moderation (Phase 2)
- **Admin-Panel**: Separate Ansicht für Moderatoren
- **Review-Queue**: Liste aller pending-Inhalte
- **Aktionen**: Approve, Reject, Edit, Delete
- **Notifications**: User über Status informieren

### FR-7: Bearbeiten & Löschen

#### 7.1 Eigene Inhalte bearbeiten
- **Zugriff**: Profil → "Meine Beiträge"
- **Anzeige**: Liste aller eigenen Inhalte (nach Typ filterbar)
- **Aktionen**: Bearbeiten, Löschen
- **Einschränkungen**: 
  - Nur eigene Inhalte bearbeitbar
  - Ggf. nur vor Veröffentlichung editierbar

#### 7.2 Löschen
- **Soft Delete**: Status auf "deleted" setzen (für Audit)
- **Bestätigung**: "Möchten Sie diesen Beitrag wirklich löschen?"
- **Auswirkung**: Sofortige Entfernung aus öffentlichen Listen

## UI/UX Anforderungen

### UX-1: Content-Typ Auswahl Screen

#### Layout
- **Dimensionen**: 393px × 852px
- **Header**: ScreenHeader mit "Beitrag erstellen"
- **Content**: 3 große Karten/Tiles vertikal angeordnet
- **TabBar**: Profil aktiv (da von dort gestartet)

#### Content-Typ Karten
```
┌─────────────────────────────────┐
│ 📰  Nachricht erstellen         │
│     Teile Neuigkeiten aus       │
│     deinem Quartier             │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│ 📅  Veranstaltung erstellen     │
│     Lade zu einem Event ein     │
│                                 │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│ 📍  Ort empfehlen               │
│     Empfehle einen Ort in       │
│     deiner Nachbarschaft        │
└─────────────────────────────────┘
```

- **Icons**: Tabler Icons (IconNews, IconCalendar, IconMapPin)
- **Farben**: 
  - Background: White
  - Border: `theme.border`
  - Hover: `theme.primaryLight` background
- **Size**: Full-width - 32px (16px padding je Seite), min-height 100px
- **Gap**: 16px zwischen Karten

### UX-2: Formular-Screens

#### Allgemeines Layout
```
┌─────────────────────────────────┐
│  iOS Status Bar (60px)          │
├─────────────────────────────────┤
│  ← Zurück | [Content-Typ]       │
│                        [Senden] │
├─────────────────────────────────┤
│                                 │
│  Scrollable Form Content:       │
│                                 │
│  Label:                         │
│  [Input Field]                  │
│  Helper text / Error            │
│                                 │
│  Label:                         │
│  [Input Field]                  │
│                                 │
│  ... weitere Felder ...         │
│                                 │
│  [Bild hochladen] (optional)    │
│                                 │
│  Quartier:                      │
│  [Dropdown: Nordstadt ▼]        │
│                                 │
│  [Abbrechen] [Veröffentlichen]  │
│                                 │
│                                 │
├─────────────────────────────────┤
│  TabBar (ausgeblendet optional) │
└─────────────────────────────────┘
```

#### Header-Variante
- **Option A**: ScreenHeader mit Back-Button + "Senden"-Button rechts
- **Option B**: ScreenHeader mit Back-Button, Buttons am Formular-Ende

#### Formular-Styling
- **Label**: 
  - Font: Titillium Web Regular
  - Color: `theme.text`
  - Pflichtfeld-Marker: " *" in `theme.primary`
- **Input Fields**: Shadcn Input, Textarea, Select Components
- **Spacing**: 20px Gap zwischen Feldern
- **Padding**: 16px seitlich

### UX-3: Input-Komponenten

#### Text Input
- **Component**: `/components/ui/input.tsx` (Shadcn)
- **Style**: Border `theme.border`, focus border `theme.primary`
- **Placeholder**: Hellgrau, z.B. "Titel eingeben..."

#### Textarea
- **Component**: `/components/ui/textarea.tsx` (Shadcn)
- **Rows**: 5-8 (je nach Feld)
- **Character Counter**: "250 / 1000" rechts unten
- **Auto-Resize**: Optional

#### Select/Dropdown
- **Component**: `/components/ui/select.tsx` (Shadcn)
- **Options**: Kategorien vordefiniert
- **Default**: "Bitte wählen..." oder vorausgewähltes Quartier

#### Date Picker
- **Component**: `/components/ui/calendar.tsx` (Shadcn)
- **Format**: DD.MM.YYYY
- **Validation**: Nur zukünftige Daten (bei Events)

#### Time Picker
- **Component**: Custom oder Shadcn-basiert
- **Format**: HH:MM (24h)
- **Interaction**: Dropdown oder Native Picker

#### Image Upload
- **Component**: Custom mit File Input
- **UI**: 
  - Placeholder: Gestrichelter Rahmen, "Bild hochladen" + Icon
  - Preview: Thumbnail nach Upload
  - Remove: X-Button zum Entfernen
- **Feedback**: Loading Spinner während Upload

### UX-4: Kategorien

#### Nachrichten-Kategorien
- Allgemein
- Verkehr & Mobilität
- Kultur & Freizeit
- Sport & Bewegung
- Umwelt & Natur
- Soziales & Nachbarschaft
- Sicherheit & Ordnung
- Bauen & Wohnen

#### Veranstaltungs-Kategorien
- Konzert & Musik
- Workshop & Kurs
- Sport & Fitness
- Markt & Fest
- Vortrag & Diskussion
- Kinder & Familie
- Kunst & Kultur
- Nachbarschaftstreffen

#### Orts-Kategorien
- Restaurant & Café
- Geschäft & Laden
- Park & Spielplatz
- Sport & Freizeit
- Kultur & Bildung
- Gesundheit & Wellness
- Handwerk & Service
- Öffentliche Einrichtung

### UX-5: Feedback & Bestätigung

#### Während des Ausfüllens
- **Auto-Save**: Optional - Entwurf automatisch speichern
- **Validation**: Echtzeit-Validierung bei Blur
- **Character Count**: Live-Anzeige bei Textfeldern

#### Nach Absenden
- **Loading**: Spinner/Loading-State während Submit
- **Success**: 
  - Toast: "Dein Beitrag wurde eingereicht!"
  - Optional: Moderationshinweis "Wird geprüft und dann veröffentlicht"
- **Navigation**: Zurück zu Profil oder zum entsprechenden Content-Screen
- **Error**: 
  - Toast: "Ein Fehler ist aufgetreten. Bitte versuche es erneut."
  - Formular bleibt ausgefüllt

## Technische Anforderungen

### TECH-1: Komponenten-Struktur

```
/components/ugc/
  - ContentTypeSelector.tsx (Auswahl: Nachricht/Event/Ort)
  - CreateNewsForm.tsx (Formular Nachricht)
  - CreateEventForm.tsx (Formular Veranstaltung)
  - CreatePlaceForm.tsx (Formular Ort)
  - ImageUpload.tsx (Bild-Upload Komponente)
  - FormField.tsx (Wiederverwendbares Formular-Feld mit Label)
  - CategorySelect.tsx (Kategorie-Dropdown)
  - QuartierSelect.tsx (Quartier-Dropdown)
  
/components/screens/
  - CreateContentScreen.tsx (Wrapper mit Content-Typ Auswahl)
  - MyContentScreen.tsx (Liste eigener Beiträge)

/lib/
  - supabase.ts (Supabase Client)
  - ugcService.ts (API-Funktionen für UGC)
  - validation.ts (Validierungs-Funktionen)
```

### TECH-2: Datenstrukturen (TypeScript)

```typescript
// Content Types
type ContentType = 'news' | 'event' | 'place';

type ContentStatus = 'draft' | 'pending' | 'published' | 'rejected';

// News Article
interface NewsArticle {
  id: string;
  userId: string;
  title: string;
  content: string;
  category: string;
  imageUrl?: string;
  linkUrl?: string;
  source?: string;
  quartierId: string;
  status: ContentStatus;
  createdAt: Date;
  publishedAt?: Date;
}

interface CreateNewsInput {
  title: string;
  content: string;
  category: string;
  image?: File;
  linkUrl?: string;
  source?: string;
  quartierId: string;
}

// Event
interface Event {
  id: string;
  userId: string;
  title: string;
  description: string;
  category: string;
  eventDate: Date;
  startTime: string; // "14:00"
  endTime?: string;
  location?: string;
  address?: string;
  cost?: string;
  imageUrl?: string;
  registrationUrl?: string;
  quartierId: string;
  status: ContentStatus;
  createdAt: Date;
  publishedAt?: Date;
}

interface CreateEventInput {
  title: string;
  description: string;
  category: string;
  eventDate: Date;
  startTime: string;
  endTime?: string;
  location?: string;
  address?: string;
  cost?: string;
  image?: File;
  registrationUrl?: string;
  quartierId: string;
}

// Place
interface Place {
  id: string;
  userId: string;
  name: string;
  category: string;
  address: string;
  description?: string;
  openingHours?: string;
  phone?: string;
  website?: string;
  imageUrl?: string;
  quartierId: string;
  status: ContentStatus;
  createdAt: Date;
  publishedAt?: Date;
}

interface CreatePlaceInput {
  name: string;
  category: string;
  address: string;
  description?: string;
  openingHours?: string;
  phone?: string;
  website?: string;
  image?: File;
  quartierId: string;
}

// Form State
interface FormState<T> {
  data: Partial<T>;
  errors: Record<string, string>;
  isSubmitting: boolean;
  isDirty: boolean;
}
```

### TECH-3: Supabase Integration

#### Setup
```typescript
// /lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);
```

#### UGC Service
```typescript
// /lib/ugcService.ts
import { supabase } from './supabase';
import type { CreateNewsInput, CreateEventInput, CreatePlaceInput } from './types';

// Nachricht erstellen
export async function createNewsArticle(input: CreateNewsInput) {
  let imageUrl: string | undefined;
  
  // 1. Bild hochladen (falls vorhanden)
  if (input.image) {
    const { data, error } = await supabase.storage
      .from('ugc-images')
      .upload(`news/${userId}/${Date.now()}_${input.image.name}`, input.image);
    
    if (error) throw error;
    imageUrl = data.path;
  }
  
  // 2. Daten speichern
  const { data, error } = await supabase
    .from('user_news_articles')
    .insert({
      user_id: userId,
      title: input.title,
      content: input.content,
      category: input.category,
      image_url: imageUrl,
      link_url: input.linkUrl,
      source: input.source,
      quartier_id: input.quartierId,
      status: 'published', // oder 'pending' bei Moderation
    })
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

// Analog für Events und Places
export async function createEvent(input: CreateEventInput) { /* ... */ }
export async function createPlace(input: CreatePlaceInput) { /* ... */ }

// Eigene Inhalte abrufen
export async function getMyContent(userId: string, type: ContentType) {
  const table = {
    news: 'user_news_articles',
    event: 'user_events',
    place: 'user_places',
  }[type];
  
  const { data, error } = await supabase
    .from(table)
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
}
```

### TECH-4: Validierung

```typescript
// /lib/validation.ts
import { z } from 'zod';

// Nachricht Schema
export const newsSchema = z.object({
  title: z.string().min(5, 'Titel muss mind. 5 Zeichen lang sein').max(100),
  content: z.string().min(50, 'Text muss mind. 50 Zeichen lang sein').max(1000),
  category: z.string().min(1, 'Bitte wähle eine Kategorie'),
  linkUrl: z.string().url('Ungültige URL').optional().or(z.literal('')),
  source: z.string().max(50).optional(),
  quartierId: z.string().min(1, 'Bitte wähle ein Quartier'),
});

// Event Schema
export const eventSchema = z.object({
  title: z.string().min(5).max(100),
  description: z.string().min(20).max(500),
  category: z.string().min(1),
  eventDate: z.date().min(new Date(), 'Datum muss in der Zukunft liegen'),
  startTime: z.string().regex(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/, 'Ungültige Uhrzeit'),
  endTime: z.string().regex(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/).optional().or(z.literal('')),
  location: z.string().max(100).optional(),
  address: z.string().max(200).optional(),
  cost: z.string().max(50).optional(),
  registrationUrl: z.string().url().optional().or(z.literal('')),
  quartierId: z.string().min(1),
});

// Place Schema
export const placeSchema = z.object({
  name: z.string().min(2).max(80),
  category: z.string().min(1),
  address: z.string().min(5).max(200),
  description: z.string().max(300).optional(),
  openingHours: z.string().max(200).optional(),
  phone: z.string().max(20).optional(),
  website: z.string().url().optional().or(z.literal('')),
  quartierId: z.string().min(1),
});

// Helper-Funktion
export function validateForm<T>(schema: z.ZodSchema<T>, data: unknown) {
  try {
    const validated = schema.parse(data);
    return { success: true, data: validated, errors: {} };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.errors.reduce((acc, err) => {
        acc[err.path.join('.')] = err.message;
        return acc;
      }, {} as Record<string, string>);
      return { success: false, data: null, errors };
    }
    throw error;
  }
}
```

### TECH-5: Form Handling (React Hook Form)

```typescript
// Beispiel: CreateNewsForm.tsx
import { useForm } from 'react-hook-form@7.55.0';
import { zodResolver } from '@hookform/resolvers/zod';
import { newsSchema } from '../lib/validation';
import type { CreateNewsInput } from '../lib/types';

export function CreateNewsForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<CreateNewsInput>({
    resolver: zodResolver(newsSchema),
    defaultValues: {
      quartierId: getCurrentQuartierId(), // aus LocalStorage
    },
  });

  const contentLength = watch('content')?.length ?? 0;

  const onSubmit = async (data: CreateNewsInput) => {
    try {
      await createNewsArticle(data);
      toast('Nachricht wurde veröffentlicht!');
      // Navigation zurück
    } catch (error) {
      toast('Ein Fehler ist aufgetreten');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Form fields */}
    </form>
  );
}
```

## Design-Spezifikationen

### DS-1: Content-Typ Karten (Auswahl-Screen)

- **Width**: 100% - 32px (Container padding)
- **Height**: min 100px, auto
- **Padding**: 20px
- **Border**: 1px solid `theme.border`
- **Border Radius**: 12px
- **Gap**: 12px (Icon zu Text)
- **Icon Size**: 32px
- **Background**: White, Hover: `theme.primaryLight`
- **Transition**: all 0.2s ease

### DS-2: Formular-Felder

#### Label
- **Font**: Titillium Web Regular (via globals.css)
- **Color**: `theme.text`
- **Margin Bottom**: 8px
- **Required Marker**: " *" in `theme.primary`

#### Input
- **Height**: 44px
- **Padding**: 12px 16px
- **Border**: 1px solid `theme.border`
- **Border Radius**: 8px
- **Focus**: Border `theme.primary`, ring 2px `theme.primary` 20% opacity
- **Error**: Border red-500

#### Textarea
- **Min Height**: 120px
- **Padding**: 12px 16px
- **Resize**: vertical
- **Character Counter**: 
  - Position: Absolute, bottom-right
  - Color: `theme.text` opacity 60%
  - Font Size: small

#### Select
- **Height**: 44px
- **Padding**: 12px 16px
- **Chevron**: Right-aligned, Tabler IconChevronDown

### DS-3: Image Upload

```
┌─────────────────────────────────┐
│                                 │
│         📷  Bild hochladen      │
│                                 │
│     JPG, PNG, WebP (max 5MB)   │
│                                 │
└─────────────────────────────────┘

Nach Upload:
┌─────────────────────────────────┐
│  ┌───────────────┐              │
│  │               │    [X]        │
│  │  [Preview]    │   Entfernen   │
│  │   Thumbnail   │              │
│  └───────────────┘              │
└─────────────────────────────────┘
```

- **Container**: Dashed border 2px `theme.border`, border-radius 8px
- **Hover**: Background `theme.primaryLight` opacity 30%
- **Preview**: 100px × 100px, object-fit cover, border-radius 4px
- **Remove Button**: Secondary style, small

### DS-4: Action Buttons

#### Primary (Veröffentlichen)
- **Component**: `/components/shared/Button.tsx`
- **Background**: `gradients.primary` (aus theme.ts)
- **Color**: White
- **Width**: Full oder min-width 150px
- **Height**: 48px

#### Secondary (Abbrechen)
- **Background**: White
- **Border**: 1px solid `theme.border`
- **Color**: `theme.text`
- **Hover**: Background gray-50

#### Button Group
- **Gap**: 12px
- **Layout**: Flex row, justify-end (oder space-between)

## Navigation & Flows

### Flow 1: Nachricht erstellen
```
Profil Screen
  ↓
Action Tile "Beitrag erstellen"
  ↓
Content-Typ Auswahl
  ↓
"Nachricht erstellen" auswählen
  ↓
Nachricht-Formular
  ↓
Felder ausfüllen
  ↓
Optional: Bild hochladen
  ↓
"Veröffentlichen" klicken
  ↓
Validierung
  ↓
Supabase Submit (mit Bild-Upload)
  ↓
Success Toast
  ↓
Zurück zu Profil oder Home Screen
```

### Flow 2: Veranstaltung erstellen
```
Profil Screen → Content-Typ Auswahl → "Veranstaltung"
  ↓
Event-Formular öffnen
  ↓
Titel, Beschreibung, Kategorie eingeben
  ↓
Datum & Zeit wählen (Date + Time Picker)
  ↓
Optional: Ort, Kosten, Link, Bild
  ↓
Quartier bestätigen/ändern
  ↓
"Veröffentlichen"
  ↓
Validierung (Datum in Zukunft?)
  ↓
Supabase Submit
  ↓
Success → Zurück oder zu Events Tab
```

### Flow 3: Ort empfehlen
```
Profil Screen → Content-Typ Auswahl → "Ort"
  ↓
Ort-Formular öffnen
  ↓
Name, Kategorie, Adresse (Pflicht)
  ↓
Optional: Beschreibung, Öffnungszeiten, Kontakt, Bild
  ↓
Quartier bestätigen
  ↓
"Veröffentlichen"
  ↓
Supabase Submit
  ↓
Success → Zurück oder zu Wegweiser Tab
```

### Flow 4: Eigene Beiträge verwalten
```
Profil Screen
  ↓
Action Tile "Meine Beiträge"
  ↓
MyContentScreen (Liste mit Tabs: Nachrichten, Events, Orte)
  ↓
Beitrag auswählen
  ↓
Detail-Ansicht oder Bearbeiten
  ↓
[Bearbeiten] → Formular vorausgefüllt
  ↓
Änderungen vornehmen
  ↓
"Speichern"
  ↓
Update in Supabase
  ↓
Zurück zur Liste
```

## Supabase-Integration Details

### SUP-1: Authentifizierung
- **Auth**: Supabase Auth (Email/Password oder Magic Link)
- **User Context**: User-ID aus Auth Session
- **Zugriffskontrolle**: Row Level Security (RLS)

### SUP-2: Row Level Security (RLS) Policies

```sql
-- user_news_articles
-- Jeder kann veröffentlichte Artikel lesen
CREATE POLICY "Public can read published articles"
  ON user_news_articles FOR SELECT
  USING (status = 'published');

-- User kann eigene Artikel lesen (alle Status)
CREATE POLICY "Users can read own articles"
  ON user_news_articles FOR SELECT
  USING (auth.uid() = user_id);

-- User kann eigene Artikel erstellen
CREATE POLICY "Users can create articles"
  ON user_news_articles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- User kann eigene Artikel aktualisieren
CREATE POLICY "Users can update own articles"
  ON user_news_articles FOR UPDATE
  USING (auth.uid() = user_id);

-- User kann eigene Artikel löschen
CREATE POLICY "Users can delete own articles"
  ON user_news_articles FOR DELETE
  USING (auth.uid() = user_id);

-- Analog für user_events und user_places
```

### SUP-3: Storage Policies

```sql
-- ugc-images Bucket
-- User können eigene Bilder hochladen
CREATE POLICY "Users can upload own images"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'ugc-images' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

-- Jeder kann veröffentlichte Bilder lesen
CREATE POLICY "Public can read images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'ugc-images');
```

### SUP-4: Realtime (Optional)
```typescript
// Subscribe to new articles in user's quartier
const subscription = supabase
  .from('user_news_articles')
  .on('INSERT', payload => {
    if (payload.new.quartier_id === userQuartier && 
        payload.new.status === 'published') {
      // Update UI with new article
      toast('Neue Nachricht in deinem Quartier!');
    }
  })
  .subscribe();
```

## Accessibility

### ACC-1: Formular-Accessibility
- **Labels**: Jedes Input hat ein zugeordnetes Label (htmlFor)
- **Required**: Aria-required auf Pflichtfeldern
- **Error Messages**: Aria-describedby für Fehler
- **Focus Management**: Logische Tab-Reihenfolge

### ACC-2: Tastatur-Navigation
- **Tab**: Durch alle Felder navigieren
- **Enter**: Formular absenden (Button focused)
- **Escape**: Abbrechen-Dialog öffnen (falls isDirty)

### ACC-3: Screen Reader
- **Announcements**: Erfolgs-/Fehlermeldungen als aria-live
- **Field Descriptions**: Hilfetext über aria-describedby
- **Character Count**: "250 von 1000 Zeichen" als aria-live

## Performance

### PERF-1: Optimistic Updates
- **UI Update**: Sofort nach Submit (vor Supabase Response)
- **Rollback**: Bei Fehler Zustand wiederherstellen
- **Loading States**: Spinner/Disabled während Submit

### PERF-2: Image Optimization
- **Client-side Resize**: Bilder vor Upload auf max 1200px Breite skalieren
- **Compression**: JPEG Quality 80%, PNG optional komprimieren
- **Format**: WebP bevorzugen (mit Fallback)

### PERF-3: Form Performance
- **Debouncing**: Validierung 300ms nach letzter Eingabe
- **Controlled vs Uncontrolled**: Uncontrolled für Performance, Controlled für Live-Validation
- **Lazy Loading**: Image Upload Komponente lazy laden

## Testing-Szenarien

### TEST-1: Nachricht erstellen - Happy Path
- [ ] Profil → "Beitrag erstellen" öffnen
- [ ] "Nachricht erstellen" wählen
- [ ] Alle Pflichtfelder ausfüllen
- [ ] Optional: Bild hochladen
- [ ] "Veröffentlichen" klicken
- [ ] Success Toast wird angezeigt
- [ ] Nachricht erscheint im News Feed
- [ ] Nachricht erscheint in "Meine Beiträge"

### TEST-2: Validierung - Fehlerfall
- [ ] Formular öffnen
- [ ] "Veröffentlichen" ohne Ausfüllen klicken
- [ ] Pflichtfeld-Fehler werden angezeigt
- [ ] Felder mit Fehler sind rot markiert
- [ ] Nach Korrektur verschwinden Fehler
- [ ] Submit funktioniert nach Korrektur

### TEST-3: Bild-Upload
- [ ] Bild-Upload-Feld klicken
- [ ] Datei auswählen (JPG, 2MB)
- [ ] Preview wird angezeigt
- [ ] Upload zu groß (>5MB) → Fehler
- [ ] Falsches Format (PDF) → Fehler
- [ ] "Entfernen" klicken → Preview verschwindet

### TEST-4: Event mit Datum/Zeit
- [ ] Event-Formular öffnen
- [ ] Datum in Vergangenheit wählen → Fehler
- [ ] Datum in Zukunft wählen → OK
- [ ] Start-Zeit: 14:00, End-Zeit: 12:00 → Warnung (optional)
- [ ] Gültige Zeiten → Submit erfolgreich

### TEST-5: Meine Beiträge verwalten
- [ ] Profil → "Meine Beiträge" öffnen
- [ ] Liste mit eigenen Inhalten wird angezeigt
- [ ] Nach Typ filtern (News/Events/Places)
- [ ] Beitrag bearbeiten
- [ ] Änderungen speichern → Update erfolgt
- [ ] Beitrag löschen → Bestätigung → Gelöscht

### TEST-6: Offline-Handling
- [ ] Formular ausfüllen
- [ ] Netzwerk deaktivieren
- [ ] "Veröffentlichen" → Fehler-Toast
- [ ] Formular bleibt ausgefüllt
- [ ] Netzwerk aktivieren → Erneut versuchen → Erfolg

## Open Questions / Decisions Needed

1. **Moderation**: Auto-Publish oder manuelle Freigabe?
2. **Drafts**: Können User Entwürfe speichern ohne zu veröffentlichen?
3. **Edit-Rechte**: Wie lange können User ihre Inhalte bearbeiten? (Unbegrenzt / 24h / nie)
4. **Anonymität**: Werden Usernamen angezeigt oder anonym veröffentlicht?
5. **Reporting**: Können andere User unangemessene Inhalte melden?
6. **Notifications**: Push-Notifications wenn Content moderiert/veröffentlicht wurde?
7. **Multi-Quartier**: Kann Content für mehrere Quartiere gleichzeitig veröffentlicht werden?
8. **Geo-Tagging**: Automatische Standort-Erkennung für Places?
9. **Rich Text**: Formatierung (Bold, Italic, Links) in Beschreibungen erlauben?
10. **Image Gallery**: Mehrere Bilder pro Beitrag (statt nur 1)?

## Prioritäten

### Must-Have (MVP)
- ✅ Content-Typ Auswahl Screen
- ✅ Formular: Nachricht erstellen
- ✅ Formular: Veranstaltung erstellen
- ✅ Formular: Ort erstellen
- ✅ Basis-Validierung (Pflichtfelder, Limits)
- ✅ Supabase Integration (CRUD)
- ✅ Bild-Upload (1 Bild)
- ✅ Auto-Publish (kein Moderations-Flow)
- ✅ Integration in Profil Screen

### Should-Have (Phase 2)
- 🔲 "Meine Beiträge" Screen
- 🔲 Bearbeiten/Löschen eigener Inhalte
- 🔲 Entwürfe speichern
- 🔲 Erweiterte Validierung (URL-Format, Datum-Logik)
- 🔲 Character Counter live
- 🔲 Toast-Notifications
- 🔲 Vorschau-Funktion
- 🔲 Image Optimization (Resize)

### Could-Have (Future)
- 🔲 Manuelle Moderation
- 🔲 Reporting-Funktion
- 🔲 Rich Text Editor
- 🔲 Multiple Images
- 🔲 Geo-Location für Places
- 🔲 Favoriten/Bookmarks
- 🔲 Kommentare/Reaktionen
- 🔲 Teilen-Funktion (Social Media)
- 🔲 Analytics (Views, Interactions)

## Sicherheit & Compliance

### SEC-1: Input Sanitization
- **XSS Prevention**: Alle User-Inputs escapen/sanitizen
- **SQL Injection**: Supabase Parameterized Queries nutzen
- **File Upload**: Nur erlaubte Dateitypen, Größenlimit enforced

### SEC-2: Rate Limiting
- **Submission Limit**: Max. 5 Beiträge pro User pro Tag
- **Upload Limit**: Max. 10 MB pro User pro Tag
- **Implementation**: Supabase Functions oder Client-side

### SEC-3: Content Guidelines
- **Terms**: "Mit dem Veröffentlichen bestätigst du unsere Community-Richtlinien"
- **Checkbox**: Optional - Akzeptanz der Nutzungsbedingungen
- **Link**: Zu vollständigen Richtlinien

### SEC-4: Datenschutz
- **User Data**: Keine PII ohne Zustimmung
- **DSGVO**: Recht auf Löschen (User kann eigene Inhalte löschen)
- **Anonymisierung**: Optional - Usernamen verbergen

## Version History

- **v1.0** (2025-11-14): Initiales Anforderungsdokument erstellt

---

## Anhang: Wireframes

### Wireframe 1: Content-Typ Auswahl
```
┌─────────────────────────────────┐
│  iOS Status Bar                 │
├─────────────────────────────────┤
│  ← Profil    Beitrag erstellen  │
├─────────────────────────────────┤
│                                 │
│  Was möchtest du erstellen?     │
│                                 │
│  ┌───────────────────────────┐ │
│  │ 📰  Nachricht erstellen    │ │
│  │     Teile Neuigkeiten aus │ │
│  │     deinem Quartier       │ │
│  └───────────────────────────┘ │
│                                 │
│  ┌───────────────────────────┐ │
│  │ 📅  Veranstaltung         │ │
│  │     Lade zu einem Event   │ │
│  │     ein                   │ │
│  └───────────────────────────┘ │
│                                 │
│  ┌───────────────────────────┐ │
│  │ 📍  Ort empfehlen         │ │
│  │     Empfehle einen Ort    │ │
│  │     in deiner Nachbarsch. │ │
│  └───────────────────────────┘ │
│                                 │
├─────────────────────────────────┤
│  [Home][⚡][📍][📅][Profil]    │
└─────────────────────────────────┘
```

### Wireframe 2: Nachricht erstellen
```
┌─────────────────────────────────┐
│  iOS Status Bar                 │
├─────────────────────────────────┤
│  ← Zurück  Nachricht  [Senden]  │
├─────────────────────────────────┤
│  Titel *                        │
│  ┌─────────────────────────┐   │
│  │ Neue Bushaltestelle ... │   │
│  └─────────────────────────┘   │
│                                 │
│  Kategorie *                    │
│  ┌─────────────────────────┐   │
│  │ Verkehr & Mobilität  ▼  │   │
│  └─────────────────────────┘   │
│                                 │
│  Nachrichtentext *  250/1000    │
│  ┌─────────────────────────┐   │
│  │ Ab nächste Woche gibt   │   │
│  │ es eine neue Haltestelle│   │
│  │ ...                     │   │
│  │                         │   │
│  └─────────────────────────┘   │
│                                 │
│  Bild (optional)                │
│  ┌─────────────────────────┐   │
│  │    📷 Bild hochladen    │   │
│  └─────────────────────────┘   │
│                                 │
│  Link (optional)                │
│  ┌─────────────────────────┐   │
│  │ https://...             │   │
│  └─────────────────────────┘   │
│                                 │
│  Quartier *                     │
│  ┌─────────────────────────┐   │
│  │ Nordstadt            ▼  │   │
│  └─────────────────────────┘   │
│                                 │
│  [Abbrechen] [Veröffentlichen]  │
│                                 │
└─────────────────────────────────┘
```

### Wireframe 3: Meine Beiträge
```
┌─────────────────────────────────┐
│  iOS Status Bar                 │
├─────────────────────────────────┤
│  ← Profil    Meine Beiträge     │
├─────────────────────────────────┤
│  [Nachrichten] [Events] [Orte]  │
├─────────────────────────────────┤
│                                 │
│  📰 Neue Bushaltestelle         │
│     Veröffentlicht: 12.11.2025  │
│     [Bearbeiten] [Löschen]      │
│  ─────────────────────────────  │
│  📰 Nachbarschaftsfest Ankün... │
│     Veröffentlicht: 10.11.2025  │
│     [Bearbeiten] [Löschen]      │
│  ─────────────────────────────  │
│  📰 Baustelle XY-Straße         │
│     Entwurf                     │
│     [Bearbeiten] [Löschen]      │
│  ─────────────────────────────  │
│                                 │
│  Keine weiteren Beiträge        │
│                                 │
├─────────────────────────────────┤
│  [Home][⚡][📍][📅][Profil]    │
└─────────────────────────────────┘
```

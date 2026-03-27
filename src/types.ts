export interface Paragraph {
  type: 'text' | 'dialog';
  text: string;
  chords?: string; // Format: "[C]Hello [G]world"
}

export interface Translation {
  languageName: string;
  title: string;
  paragraphs: Paragraph[];
}

export interface Page {
  translations: Record<string, Translation>;
}

export interface Ebook {
  id: string;
  title: string;
  author: string;
  coverEmoji: string;
  description: string;
  pages: Page[];
  isRecommended?: boolean;
}

export interface ChordFingering {
  guitar: number[]; // -1 for muted, 0 for open, 1-4 for frets
  piano: number[]; // MIDI note offsets from C
}

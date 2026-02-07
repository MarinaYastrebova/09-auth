import type { Metadata } from 'next';
import NotesClient from './Notes.client';

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug[0]?.toLowerCase() || 'all';

  const tagTitle =
    tag === 'all'
      ? 'All Notes'
      : tag
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');

  return {
    title: `${tagTitle} - NoteHub`,
    description: `View and manage your ${tagTitle.toLowerCase()} in NoteHub.`,
  };
}

export default async function NotesByTag({ params }: Props) {
  const { slug } = await params;
  const tag = slug && slug.length > 0 ? slug[0] : 'all';

  return <NotesClient tag={tag} />;
}

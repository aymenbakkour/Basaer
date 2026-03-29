import { SURAS_DATA } from '@/lib/suras-data';
import SuraClient from './SuraClient';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return SURAS_DATA.map((sura) => ({
    id: sura.id.toString(),
  }));
}

export default async function SuraPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const suraId = parseInt(id);
  const suraInfo = SURAS_DATA.find(s => s.id === suraId);

  if (!suraInfo) {
    notFound();
  }

  return <SuraClient id={id} />;
}

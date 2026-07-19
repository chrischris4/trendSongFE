export const runtime = 'edge';

import ClientOnly from '../../../../components/ClientOnly';
import CountryPage from '../../../../components/CountryPage';

interface Props { params: Promise<{ code: string }> }

export default async function SongCountryPage({ params }: Props) {
  const { code } = await params;
  return <ClientOnly><CountryPage code={code} type="songs" /></ClientOnly>;
}

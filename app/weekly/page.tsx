'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useStats } from '../../hooks/useStats';
import { MUSIC_GENRES, artwork, genreLabel } from '../../constants/config';
import { slugify } from '../../utils/slug';

function getWeekLabel(isFr: boolean) {
  const now = new Date();
  const start = new Date(now);
  start.setDate(now.getDate() - now.getDay() + 1);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  const fmt = (d: Date) => d.toLocaleDateString(isFr ? 'fr-FR' : 'en-US', { day: 'numeric', month: 'long' });
  return `${fmt(start)} – ${fmt(end)} ${now.getFullYear()}`;
}

export default function WeeklyPage() {
  const { i18n } = useTranslation();
  const isFr = i18n.language === 'fr';
  const { stats } = useStats();

  const topSong = stats?.topSongs?.[0];
  const topAlbum = stats?.topAlbums?.[0];
  const topGenre = stats?.topGenres?.[0];
  const topGenreDef = topGenre ? MUSIC_GENRES.find(g => g.id === topGenre.genreId) : null;
  const topArtist = stats?.topArtists?.[0];
  const lang = isFr ? 'fr' : 'en';

  const sec: React.CSSProperties = { marginBottom: 40 };
  const h2: React.CSSProperties = { color: '#fff', fontSize: 18, fontWeight: 800, marginBottom: 12, lineHeight: 1.3 };
  const body: React.CSSProperties = { color: '#AAAAAA', fontSize: 14, lineHeight: 1.8, marginBottom: 16 };
  const hl: React.CSSProperties = { color: '#fff', fontWeight: 600 };
  const accent: React.CSSProperties = { color: '#A78BFA', fontWeight: 700 };

  return (
    <div style={{ backgroundColor: '#0F0F0F', minHeight: '100vh' }}>
      <Header />
      <div style={{ maxWidth: 780, margin: '0 auto', padding: '40px 16px 80px' }}>

        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ display: 'inline-block', backgroundColor: '#1A1A1A', border: '1px solid #2A2A2A', borderRadius: 20, padding: '4px 14px', fontSize: 11, fontWeight: 700, color: '#A78BFA', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 16 }}>
            {isFr ? 'Rapport hebdomadaire' : 'Weekly report'}
          </div>
          <h1 style={{ color: '#fff', fontSize: 'clamp(22px, 4vw, 32px)', fontWeight: 900, lineHeight: 1.2, marginBottom: 10 }}>
            {isFr ? 'Tendances musicales :' : 'Music trends:'}<br />{isFr ? 'semaine du' : 'week of'} {getWeekLabel(isFr)}
          </h1>
          <p style={{ color: '#888', fontSize: 14, lineHeight: 1.7 }}>
            {isFr
              ? 'Chaque semaine, TrendSongs analyse les charts Apple Music de plus de 30 pays pour identifier les titres et albums qui dominent les écoutes mondiales. Voici le décryptage complet de cette semaine.'
              : 'Every week, TrendSongs analyzes the Apple Music charts of 30+ countries to identify the songs and albums dominating global listening. Here is this week\'s full breakdown.'}
          </p>
          <div style={{ height: 2, background: 'linear-gradient(90deg,#7C3AED,#EC4899)', borderRadius: 1, marginTop: 24 }} />
        </div>

        {/* Titre de la semaine */}
        {topSong && (
          <div style={sec}>
            <h2 style={h2}>🎵 {isFr ? 'Titre de la semaine' : 'Song of the week'}</h2>
            <Link href={`/songs/${slugify(topSong.name, topSong.appleId)}`} style={{ display: 'flex', gap: 20, backgroundColor: '#141414', border: '1px solid #2A2A2A', borderRadius: 12, overflow: 'hidden', textDecoration: 'none', marginBottom: 16 }}>
              {topSong.artworkUrl && (
                <img src={artwork(topSong.artworkUrl, 300) ?? undefined} alt={topSong.name} loading="lazy"
                  style={{ width: 110, height: 110, objectFit: 'cover', flexShrink: 0 }} />
              )}
              <div style={{ padding: '16px 16px 16px 0', flex: 1 }}>
                <div style={{ color: '#A78BFA', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>
                  {isFr ? '#1 mondial cette semaine' : '#1 worldwide this week'}
                </div>
                <div style={{ color: '#fff', fontSize: 17, fontWeight: 800, marginBottom: 4 }}>{topSong.name}</div>
                <div style={{ color: '#888', fontSize: 13, fontWeight: 600 }}>{topSong.artistName}</div>
              </div>
            </Link>
            <p style={body}>
              {isFr ? <>
                <span style={hl}>« {topSong.name} »</span> de <span style={hl}>{topSong.artistName}</span> s'impose comme le morceau incontournable de la semaine :
                il est actuellement classé dans <span style={accent}>{topSong.countryCount} pays</span> avec une position moyenne de <span style={accent}>#{topSong.avgRank}</span> dans les charts Apple Music.
              </> : <>
                <span style={hl}>"{topSong.name}"</span> by <span style={hl}>{topSong.artistName}</span> stands out as the unmissable track of the week:
                it is currently charting in <span style={accent}>{topSong.countryCount} countries</span> with an average position of <span style={accent}>#{topSong.avgRank}</span> on the Apple Music charts.
              </>}
            </p>
          </div>
        )}

        {/* Album de la semaine */}
        {topAlbum && (
          <div style={sec}>
            <h2 style={h2}>💿 {isFr ? 'Album de la semaine' : 'Album of the week'}</h2>
            <Link href={`/albums/${slugify(topAlbum.name, topAlbum.appleId)}`} style={{ display: 'flex', gap: 20, backgroundColor: '#141414', border: '1px solid #2A2A2A', borderRadius: 12, overflow: 'hidden', textDecoration: 'none', marginBottom: 16 }}>
              {topAlbum.artworkUrl && (
                <img src={artwork(topAlbum.artworkUrl, 300) ?? undefined} alt={topAlbum.name} loading="lazy"
                  style={{ width: 110, height: 110, objectFit: 'cover', flexShrink: 0 }} />
              )}
              <div style={{ padding: '16px 16px 16px 0', flex: 1 }}>
                <div style={{ color: '#EC4899', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>
                  {isFr ? '#1 album mondial' : '#1 album worldwide'}
                </div>
                <div style={{ color: '#fff', fontSize: 17, fontWeight: 800, marginBottom: 4 }}>{topAlbum.name}</div>
                <div style={{ color: '#888', fontSize: 13, fontWeight: 600 }}>{topAlbum.artistName}</div>
              </div>
            </Link>
            <p style={body}>
              {isFr ? <>
                Côté albums, <span style={hl}>{topAlbum.name}</span> de <span style={hl}>{topAlbum.artistName}</span> domine les écoutes mondiales,
                présent dans les charts de <span style={accent}>{topAlbum.countryCount} pays</span> cette semaine.
              </> : <>
                On the albums side, <span style={hl}>{topAlbum.name}</span> by <span style={hl}>{topAlbum.artistName}</span> dominates global listening,
                charting in <span style={accent}>{topAlbum.countryCount} countries</span> this week.
              </>}
            </p>
          </div>
        )}

        {/* Genres dominants */}
        {stats && stats.topGenres?.length > 0 && (
          <div style={sec}>
            <h2 style={h2}>🎧 {isFr ? 'Quels genres dominent cette semaine ?' : 'Which genres dominate this week?'}</h2>
            <p style={body}>
              {isFr ? <>
                L'analyse des charts révèle les préférences du public mondial en ce moment.{' '}
                Le genre <span style={hl}>{topGenreDef ? genreLabel(topGenreDef, lang) : topGenre?.name}</span> domine avec <span style={accent}>{topGenre?.pct}%</span> des titres classés
                {stats.topGenres[1] && <>, devant <span style={hl}>{(() => { const d = MUSIC_GENRES.find(g => g.id === stats.topGenres[1].genreId); return d ? genreLabel(d, lang) : stats.topGenres[1].name; })()}</span> ({stats.topGenres[1].pct}%)</>}.
              </> : <>
                Chart analysis reveals the global audience's current preferences.{' '}
                The <span style={hl}>{topGenreDef ? genreLabel(topGenreDef, lang) : topGenre?.name}</span> genre dominates with <span style={accent}>{topGenre?.pct}%</span> of charted songs
                {stats.topGenres[1] && <>, ahead of <span style={hl}>{(() => { const d = MUSIC_GENRES.find(g => g.id === stats.topGenres[1].genreId); return d ? genreLabel(d, lang) : stats.topGenres[1].name; })()}</span> ({stats.topGenres[1].pct}%)</>}.
              </>}
            </p>
            <div style={{ backgroundColor: '#141414', border: '1px solid #2A2A2A', borderRadius: 10, padding: '16px 18px' }}>
              {stats.topGenres.slice(0, 4).map((g, i) => {
                const def = MUSIC_GENRES.find(x => x.id === g.genreId);
                return (
                  <div key={g.genreId} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <span style={{ color: '#A78BFA', fontWeight: 800, fontSize: 12, minWidth: 18 }}>#{i + 1}</span>
                    <Link href={`/songs/genre/${def?.slug ?? ''}`} style={{ color: '#ddd', fontSize: 13, fontWeight: 600, textDecoration: 'none', flex: 1 }}>
                      {def ? `${def.emoji} ${genreLabel(def, lang)}` : g.name}
                    </Link>
                    <span style={{ color: '#555', fontSize: 12 }}>{g.pct}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Artiste dominant */}
        {topArtist && (
          <div style={sec}>
            <h2 style={h2}>🌍 {isFr ? "L'artiste qui écrase les charts" : 'The artist crushing the charts'}</h2>
            <p style={body}>
              {isFr ? <>
                Avec <span style={accent}>{topArtist.count} entrées</span> dans les classements mondiaux cette semaine,{' '}
                <span style={hl}>{topArtist.artist}</span> est l'artiste le plus présent dans les charts Apple Music.{' '}
                {stats!.topArtists[1] && <>
                  Derrière, <span style={hl}>{stats!.topArtists[1].artist}</span> ({stats!.topArtists[1].count} entrées) confirme aussi une très grosse semaine.
                </>}
              </> : <>
                With <span style={accent}>{topArtist.count} entries</span> across global rankings this week,{' '}
                <span style={hl}>{topArtist.artist}</span> is the most present artist on the Apple Music charts.{' '}
                {stats!.topArtists[1] && <>
                  Right behind, <span style={hl}>{stats!.topArtists[1].artist}</span> ({stats!.topArtists[1].count} entries) is also having a huge week.
                </>}
              </>}
            </p>
          </div>
        )}

        {/* Top 5 rapide */}
        {stats && stats.topSongs?.length > 0 && stats.topAlbums?.length > 0 && (
          <div style={sec}>
            <h2 style={h2}>📊 {isFr ? 'Top 5 mondial de la semaine' : 'Global top 5 of the week'}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: 20 }}>
              {[
                { title: isFr ? 'Titres' : 'Songs', items: stats.topSongs.slice(0, 5), base: 'songs' },
                { title: isFr ? 'Albums' : 'Albums', items: stats.topAlbums.slice(0, 5), base: 'albums' },
              ].map(({ title, items, base }) => (
                <div key={title}>
                  <div style={{ color: '#888', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>{title}</div>
                  {items.map((item, i) => (
                    <Link key={item.appleId} href={`/${base}/${slugify(item.name, item.appleId)}`}
                      style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '1px solid #1A1A1A', textDecoration: 'none' }}>
                      <span style={{ color: '#A78BFA', fontWeight: 800, fontSize: 13, minWidth: 22 }}>#{i + 1}</span>
                      <span style={{ flex: 1, minWidth: 0 }}>
                        <span style={{ display: 'block', color: '#ddd', fontSize: 13, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</span>
                        <span style={{ display: 'block', color: '#666', fontSize: 11, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.artistName}</span>
                      </span>
                      <span style={{ color: '#EC4899', fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap' }}>{item.countryCount} {isFr ? 'pays' : 'countries'}</span>
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div style={{ backgroundColor: '#141414', border: '1px solid #2A2A2A', borderRadius: 12, padding: '24px 28px', textAlign: 'center' }}>
          <p style={{ color: '#fff', fontWeight: 700, fontSize: 16, marginBottom: 8 }}>{isFr ? 'Explorez tous les charts' : 'Explore all the charts'}</p>
          <p style={{ color: '#888', fontSize: 13, marginBottom: 20 }}>
            {isFr
              ? 'Filtrez par pays, genre et découvrez les détails de chaque titre avec son extrait audio.'
              : 'Filter by country and genre, and discover each track\'s details with its audio preview.'}
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/" style={{ background: 'linear-gradient(90deg,#7C3AED,#EC4899)', color: '#fff', padding: '10px 24px', borderRadius: 8, fontWeight: 700, fontSize: 13, textDecoration: 'none' }}>
              {isFr ? 'Voir tous les titres' : 'See all songs'}
            </Link>
            <Link href="/?type=albums" style={{ backgroundColor: '#1A1A1A', color: '#fff', border: '1px solid #2A2A2A', padding: '10px 24px', borderRadius: 8, fontWeight: 700, fontSize: 13, textDecoration: 'none' }}>
              {isFr ? 'Voir tous les albums' : 'See all albums'}
            </Link>
          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
}

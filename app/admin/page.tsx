'use client';

import { useEffect, useState } from 'react';
import { createBlogArticle, updateBlogArticle, deleteBlogArticle, fetchAllBlogArticles } from '../../services/admin';
import type { BlogArticle } from '../../types';

interface FormData {
  appleId: string;
  type: string;
  title: string;
  artistName: string;
  artworkUrl: string;
  streamCount: string;
  countryCount: string;
  weekOf: string;
  editorialFr: string;
  editorialEn: string;
  published: boolean;
}

const emptyForm: FormData = {
  appleId: '', type: 'songs', title: '', artistName: '',
  artworkUrl: '', streamCount: '', countryCount: '', weekOf: '', editorialFr: '', editorialEn: '',
  published: false,
};

export default function AdminPage() {
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [status, setStatus] = useState('');

  function load() {
    fetchAllBlogArticles()
      .then(setArticles)
      .catch(() => setStatus('Erreur lors du chargement'));
  }

  useEffect(() => { load(); }, []);

  function startEdit(a: BlogArticle) {
    setEditingId(a.id);
    setForm({
      appleId: a.appleId ?? '',
      type: a.type ?? 'songs',
      title: a.title,
      artistName: a.artistName,
      artworkUrl: a.artworkUrl ?? '',
      streamCount: a.streamCount?.toString() ?? '',
      countryCount: a.countryCount?.toString() ?? '',
      weekOf: a.weekOf ? a.weekOf.split('T')[0] : '',
      editorialFr: a.editorialFr,
      editorialEn: a.editorialEn,
      published: a.published,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(emptyForm);
    setStatus('');
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('En cours...');
    try {
      const payload = {
        ...(form.appleId ? { appleId: form.appleId } : {}),
        type: form.type || undefined,
        title: form.title,
        artistName: form.artistName,
        ...(form.artworkUrl ? { artworkUrl: form.artworkUrl } : {}),
        ...(form.streamCount ? { streamCount: Number(form.streamCount) } : {}),
        ...(form.countryCount ? { countryCount: Number(form.countryCount) } : {}),
        weekOf: form.weekOf || new Date().toISOString().split('T')[0],
        editorialFr: form.editorialFr,
        editorialEn: form.editorialEn,
        published: form.published,
      };
      if (editingId !== null) {
        await updateBlogArticle(editingId, payload);
        setStatus('Article mis à jour !');
      } else {
        await createBlogArticle(payload as Parameters<typeof createBlogArticle>[0]);
        setStatus('Article enregistré !');
      }
      cancelEdit();
      load();
    } catch (err: unknown) {
      setStatus(`Erreur : ${err instanceof Error ? err.message : 'inconnue'}`);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('Supprimer cet article ?')) return;
    try {
      await deleteBlogArticle(id);
      load();
    } catch {
      setStatus('Erreur lors de la suppression');
    }
  }

  const inp: React.CSSProperties = {
    width: '100%', padding: '10px 12px', background: '#1a1a1a',
    border: '1px solid #2a2a2a', borderRadius: 6, color: '#f5f5f5',
    fontSize: 14, fontFamily: 'inherit', outline: 'none',
  };

  return (
    <div style={{ background: '#0d0d0d', minHeight: '100vh', color: '#f5f5f5', padding: '40px 20px', fontFamily: 'monospace' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 32, color: '#A78BFA' }}>
          TrendSongs Admin
        </h1>

        <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 10, padding: 28, marginBottom: 40 }}>
          <h2 style={{ marginBottom: 20, fontSize: 16 }}>
            {editingId !== null ? `✏️ Blog — Éditer l'article #${editingId}` : '📝 Blog — Nouvel article'}
          </h2>
          <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label style={{ fontSize: 12, color: '#888', display: 'block', marginBottom: 4 }}>Apple ID (optionnel)</label>
                <input style={inp} value={form.appleId} onChange={e => setForm(f => ({ ...f, appleId: e.target.value }))} />
              </div>
              <div>
                <label style={{ fontSize: 12, color: '#888', display: 'block', marginBottom: 4 }}>Type</label>
                <select style={inp} value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
                  <option value="songs">Titre</option>
                  <option value="albums">Album</option>
                </select>
              </div>
            </div>
            <div>
              <label style={{ fontSize: 12, color: '#888', display: 'block', marginBottom: 4 }}>Titre *</label>
              <input required style={inp} value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
            </div>
            <div>
              <label style={{ fontSize: 12, color: '#888', display: 'block', marginBottom: 4 }}>Artiste *</label>
              <input required style={inp} value={form.artistName} onChange={e => setForm(f => ({ ...f, artistName: e.target.value }))} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label style={{ fontSize: 12, color: '#888', display: 'block', marginBottom: 4 }}>URL pochette (artworkUrl)</label>
                <input style={inp} placeholder="https://..." value={form.artworkUrl} onChange={e => setForm(f => ({ ...f, artworkUrl: e.target.value }))} />
              </div>
              <div>
                <label style={{ fontSize: 12, color: '#888', display: 'block', marginBottom: 4 }}>Streams estimés</label>
                <input type="number" style={inp} value={form.streamCount} onChange={e => setForm(f => ({ ...f, streamCount: e.target.value }))} />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label style={{ fontSize: 12, color: '#888', display: 'block', marginBottom: 4 }}>Nb de pays où classé</label>
                <input type="number" style={inp} value={form.countryCount} onChange={e => setForm(f => ({ ...f, countryCount: e.target.value }))} />
              </div>
              <div>
                <label style={{ fontSize: 12, color: '#888', display: 'block', marginBottom: 4 }}>Date de publication</label>
                <input type="date" style={inp} value={form.weekOf} onChange={e => setForm(f => ({ ...f, weekOf: e.target.value }))} />
              </div>
            </div>
            <div>
              <label style={{ fontSize: 12, color: '#888', display: 'block', marginBottom: 4 }}>Éditorial FR *</label>
              <textarea required rows={5} style={{ ...inp, resize: 'vertical' }} value={form.editorialFr} onChange={e => setForm(f => ({ ...f, editorialFr: e.target.value }))} />
            </div>
            <div>
              <label style={{ fontSize: 12, color: '#888', display: 'block', marginBottom: 4 }}>Editorial EN *</label>
              <textarea required rows={5} style={{ ...inp, resize: 'vertical' }} value={form.editorialEn} onChange={e => setForm(f => ({ ...f, editorialEn: e.target.value }))} />
            </div>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', userSelect: 'none' }}>
              <input
                type="checkbox"
                checked={form.published}
                onChange={e => setForm(f => ({ ...f, published: e.target.checked }))}
                style={{ width: 16, height: 16, accentColor: '#7C3AED', cursor: 'pointer' }}
              />
              <span style={{ fontSize: 13, color: '#888' }}>
                Publier immédiatement
                <span style={{ color: '#555', fontSize: 12 }}> — décoché : reste en brouillon, publié automatiquement (1 par jour à 11h)</span>
              </span>
            </label>
            <div style={{ display: 'flex', gap: 10 }}>
              <button type="submit" style={{ padding: '10px 20px', background: 'linear-gradient(90deg,#7C3AED,#EC4899)', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 700, cursor: 'pointer' }}>
                {editingId !== null ? 'Mettre à jour' : form.published ? 'Publier l\'article' : 'Ajouter au brouillon'}
              </button>
              {editingId !== null && (
                <button type="button" onClick={cancelEdit} style={{ padding: '10px 20px', background: '#333', color: '#ccc', border: '1px solid #444', borderRadius: 6, fontWeight: 700, cursor: 'pointer' }}>
                  Annuler
                </button>
              )}
            </div>
            {status && <p style={{ fontSize: 13, color: status.startsWith('Erreur') ? '#f87171' : '#4ade80' }}>{status}</p>}
          </form>
        </div>

        <h2 style={{ fontSize: 16, marginBottom: 16 }}>
          Articles ({articles.filter(a => a.published).length} en ligne · {articles.filter(a => !a.published).length} en attente)
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {articles.map(a => (
            <div key={a.id} style={{
              background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8,
              padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
            }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 2, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{
                    fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 10, flexShrink: 0,
                    background: a.published ? '#14532d' : '#453306',
                    color: a.published ? '#4ade80' : '#fbbf24',
                  }}>
                    {a.published ? 'En ligne' : 'Brouillon'}
                  </span>
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>#{a.id} — {a.title}</span>
                </div>
                <div style={{ fontSize: 12, color: '#666' }}>
                  {new Date(a.createdAt).toLocaleDateString('fr-FR')} · {a.type ?? '—'}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                <button
                  onClick={async () => { try { await updateBlogArticle(a.id, { published: !a.published }); load(); } catch { setStatus('Erreur lors du changement de statut'); } }}
                  style={{ padding: '6px 14px', background: '#1e293b', color: a.published ? '#fbbf24' : '#4ade80', border: '1px solid #334155', borderRadius: 6, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}
                >
                  {a.published ? 'Dépublier' : 'Publier'}
                </button>
                <button onClick={() => startEdit(a)} style={{ padding: '6px 14px', background: '#166534', color: '#4ade80', border: '1px solid #166534', borderRadius: 6, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
                  Éditer
                </button>
                <button onClick={() => handleDelete(a.id)} style={{ padding: '6px 14px', background: '#450a0a', color: '#f87171', border: '1px solid #450a0a', borderRadius: 6, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

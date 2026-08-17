import React, { useState, useEffect } from 'react';
import { Loader2, Trash2, Plus, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from '@/components/ui/use-toast';

const CATEGORIES = ['Residential', 'Commercial', 'Industrial', 'Institutional'];
const emptyForm = { title: '', category: 'Residential', image_url: '' };

const GalleryTab = () => {
  const { toast } = useToast();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const fetchItems = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('gallery_images')
      .select('*')
      .order('sort_order', { ascending: true });
    if (!error && data) setItems(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.title || !form.image_url) return;
    setSaving(true);
    const { error } = await supabase.from('gallery_images').insert([
      { ...form, sort_order: items.length + 1 },
    ]);
    setSaving(false);
    if (error) {
      toast({ variant: 'destructive', title: 'Could not add project image' });
      return;
    }
    setForm(emptyForm);
    toast({ title: 'Project image added' });
    fetchItems();
  };

  const togglePublish = async (item) => {
    const { error } = await supabase
      .from('gallery_images')
      .update({ published: !item.published })
      .eq('id', item.id);
    if (error) return toast({ variant: 'destructive', title: 'Could not update' });
    setItems((prev) => prev.map((g) => (g.id === item.id ? { ...g, published: !g.published } : g)));
  };

  const deleteItem = async (id) => {
    if (!window.confirm('Delete this project image?')) return;
    const { error } = await supabase.from('gallery_images').delete().eq('id', id);
    if (error) return toast({ variant: 'destructive', title: 'Could not delete' });
    setItems((prev) => prev.filter((g) => g.id !== id));
    toast({ title: 'Project image deleted' });
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleAdd} className="bg-white rounded-lg shadow p-5 space-y-3">
        <h3 className="font-semibold text-gray-800 flex items-center gap-2"><Plus size={18} /> Add Project Image</h3>
        <div className="grid md:grid-cols-3 gap-3">
          <input
            placeholder="Title (e.g. Residential Villa - Guwahati)"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-green-600 focus:outline-none md:col-span-1"
            required
          />
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-green-600 focus:outline-none"
          >
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <input
            placeholder="Image URL"
            value={form.image_url}
            onChange={(e) => setForm({ ...form, image_url: e.target.value })}
            className="px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-green-600 focus:outline-none"
            required
          />
        </div>
        <p className="text-xs text-gray-400">
          Tip: upload the photo to Supabase Storage (or any image host) and paste the public URL here.
        </p>
        <Button type="submit" disabled={saving} className="green-gradient text-white">
          {saving ? <Loader2 className="animate-spin" size={18} /> : 'Add Image'}
        </Button>
      </form>

      {loading ? (
        <div className="flex justify-center py-10"><Loader2 className="animate-spin text-green-600" size={28} /></div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow overflow-hidden">
              <img src={item.image_url} alt={item.title} className="w-full h-40 object-cover" />
              <div className="p-4 flex items-center justify-between gap-2">
                <div>
                  <p className="font-semibold text-gray-800">{item.title}</p>
                  <p className="text-xs text-gray-500">{item.category}</p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => togglePublish(item)}
                    className={`p-2 rounded-lg transition ${item.published ? 'text-green-600 hover:bg-green-50' : 'text-gray-400 hover:bg-gray-100'}`}
                    title={item.published ? 'Published (click to hide)' : 'Hidden (click to publish)'}
                  >
                    {item.published ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                  <button onClick={() => deleteItem(item.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GalleryTab;

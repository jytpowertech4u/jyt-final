import React, { useState, useEffect } from 'react';
import { Loader2, Trash2, Plus, Star, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from '@/components/ui/use-toast';

const emptyForm = { name: '', location: '', rating: 5, text: '' };

const TestimonialsTab = () => {
  const { toast } = useToast();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const fetchItems = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('testimonials')
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
    if (!form.name || !form.text) return;
    setSaving(true);
    const { error } = await supabase.from('testimonials').insert([
      { ...form, rating: Number(form.rating), sort_order: items.length + 1 },
    ]);
    setSaving(false);
    if (error) {
      toast({ variant: 'destructive', title: 'Could not add testimonial' });
      return;
    }
    setForm(emptyForm);
    toast({ title: 'Testimonial added' });
    fetchItems();
  };

  const togglePublish = async (item) => {
    const { error } = await supabase
      .from('testimonials')
      .update({ published: !item.published })
      .eq('id', item.id);
    if (error) return toast({ variant: 'destructive', title: 'Could not update' });
    setItems((prev) => prev.map((t) => (t.id === item.id ? { ...t, published: !t.published } : t)));
  };

  const deleteItem = async (id) => {
    if (!window.confirm('Delete this testimonial?')) return;
    const { error } = await supabase.from('testimonials').delete().eq('id', id);
    if (error) return toast({ variant: 'destructive', title: 'Could not delete' });
    setItems((prev) => prev.filter((t) => t.id !== id));
    toast({ title: 'Testimonial deleted' });
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleAdd} className="bg-white rounded-lg shadow p-5 space-y-3">
        <h3 className="font-semibold text-gray-800 flex items-center gap-2"><Plus size={18} /> Add Testimonial</h3>
        <div className="grid md:grid-cols-3 gap-3">
          <input
            placeholder="Customer name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-green-600 focus:outline-none"
            required
          />
          <input
            placeholder="Location"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            className="px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-green-600 focus:outline-none"
          />
          <select
            value={form.rating}
            onChange={(e) => setForm({ ...form, rating: e.target.value })}
            className="px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-green-600 focus:outline-none"
          >
            {[5, 4, 3, 2, 1].map((r) => <option key={r} value={r}>{r} stars</option>)}
          </select>
        </div>
        <textarea
          placeholder="Testimonial text"
          value={form.text}
          onChange={(e) => setForm({ ...form, text: e.target.value })}
          rows={3}
          className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-green-600 focus:outline-none resize-none"
          required
        />
        <Button type="submit" disabled={saving} className="green-gradient text-white">
          {saving ? <Loader2 className="animate-spin" size={18} /> : 'Add Testimonial'}
        </Button>
      </form>

      {loading ? (
        <div className="flex justify-center py-10"><Loader2 className="animate-spin text-green-600" size={28} /></div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow p-4 flex justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-semibold text-gray-800">{item.name}</p>
                  <span className="text-gray-500 text-sm">{item.location}</span>
                  <span className="flex items-center text-yellow-500 text-sm gap-0.5">
                    {[...Array(item.rating)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                  </span>
                </div>
                <p className="text-gray-600 text-sm">{item.text}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
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
          ))}
        </div>
      )}
    </div>
  );
};

export default TestimonialsTab;

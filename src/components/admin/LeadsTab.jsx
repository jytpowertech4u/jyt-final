import React, { useState, useEffect } from 'react';
import { Loader2, Trash2, Phone, Mail } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from '@/components/ui/use-toast';

const STATUS_OPTIONS = ['new', 'contacted', 'closed'];
const STATUS_COLORS = {
  new: 'bg-green-100 text-green-700',
  contacted: 'bg-yellow-100 text-yellow-700',
  closed: 'bg-gray-200 text-gray-600',
};

const LeadsTab = () => {
  const { toast } = useToast();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLeads = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error && data) setLeads(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const updateStatus = async (id, status) => {
    const { error } = await supabase.from('leads').update({ status }).eq('id', id);
    if (error) {
      toast({ variant: 'destructive', title: 'Could not update status' });
      return;
    }
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
  };

  const deleteLead = async (id) => {
    if (!window.confirm('Delete this lead permanently?')) return;
    const { error } = await supabase.from('leads').delete().eq('id', id);
    if (error) {
      toast({ variant: 'destructive', title: 'Could not delete lead' });
      return;
    }
    setLeads((prev) => prev.filter((l) => l.id !== id));
    toast({ title: 'Lead deleted' });
  };

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="animate-spin text-green-600" size={32} />
      </div>
    );
  }

  if (leads.length === 0) {
    return <p className="text-gray-500 text-center py-16">No leads yet. New contact form submissions will show up here.</p>;
  }

  return (
    <div className="space-y-4">
      {leads.map((lead) => (
        <div key={lead.id} className="bg-white rounded-lg shadow p-5 flex flex-col md:flex-row md:items-center gap-4 justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h3 className="font-semibold text-gray-800">{lead.name}</h3>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[lead.status]}`}>
                {lead.status}
              </span>
            </div>
            <div className="text-sm text-gray-600 flex flex-wrap gap-x-4 gap-y-1 mb-2">
              <a href={`tel:${lead.phone}`} className="flex items-center gap-1 hover:text-green-600">
                <Phone size={14} /> {lead.phone}
              </a>
              {lead.email && (
                <a href={`mailto:${lead.email}`} className="flex items-center gap-1 hover:text-green-600">
                  <Mail size={14} /> {lead.email}
                </a>
              )}
              {lead.district && <span>📍 {lead.district}</span>}
              <span>{new Date(lead.created_at).toLocaleString()}</span>
            </div>
            {lead.message && <p className="text-gray-700 text-sm">{lead.message}</p>}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <select
              value={lead.status}
              onChange={(e) => updateStatus(lead.id, e.target.value)}
              className="text-sm border-2 border-gray-200 rounded-lg px-2 py-1.5 focus:border-green-600 focus:outline-none"
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <button
              onClick={() => deleteLead(lead.id)}
              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
              aria-label="Delete lead"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LeadsTab;

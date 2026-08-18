import React, { useState, useEffect } from 'react';
import { Loader2, Trash2, Phone, Mail } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from '@/components/ui/use-toast';
import LeadDetailModal from '@/components/admin/LeadDetailModal';

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
  const [selectedLead, setSelectedLead] = useState(null);

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

  const updateStatus = async (id, status, e) => {
    e.stopPropagation();
    const { error } = await supabase.from('leads').update({ status }).eq('id', id);
    if (error) {
      toast({ variant: 'destructive', title: 'Could not update status' });
      return;
    }
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
    setSelectedLead((prev) => (prev && prev.id === id ? { ...prev, status } : prev));
  };

  const deleteLead = async (id, e) => {
    e.stopPropagation();
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
    <>
      <div className="space-y-4">
        {leads.map((lead) => (
          <div
            key={lead.id}
            onClick={() => setSelectedLead(lead)}
            className="bg-white rounded-lg shadow p-5 flex flex-col md:flex-row md:items-center gap-4 justify-between cursor-pointer hover:shadow-md transition"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <h3 className="font-semibold text-gray-800">{lead.name}</h3>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[lead.status]}`}>
                  {lead.status}
                </span>
                {lead.system_type && (
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-blue-100 text-blue-700">
                    {lead.system_type}
                  </span>
                )}
                {lead.capacity && (
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-purple-100 text-purple-700">
                    {lead.capacity}
                  </span>
                )}
              </div>
              <div className="text-sm text-gray-600 flex flex-wrap gap-x-4 gap-y-1">
                <span className="flex items-center gap-1">
                  <Phone size={14} /> {lead.phone}
                </span>
                {lead.email && (
                  <span className="flex items-center gap-1">
                    <Mail size={14} /> {lead.email}
                  </span>
                )}
                {lead.district && <span>📍 {lead.district}</span>}
                <span>{new Date(lead.created_at).toLocaleString()}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0" onClick={(e) => e.stopPropagation()}>
              <select
                value={lead.status}
                onChange={(e) => updateStatus(lead.id, e.target.value, e)}
                className="text-sm border-2 border-gray-200 rounded-lg px-2 py-1.5 focus:border-green-600 focus:outline-none"
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <button
                onClick={(e) => deleteLead(lead.id, e)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                aria-label="Delete lead"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <LeadDetailModal lead={selectedLead} onClose={() => setSelectedLead(null)} />
    </>
  );
};

export default LeadsTab;

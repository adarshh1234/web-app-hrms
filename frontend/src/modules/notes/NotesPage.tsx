import React, { useState } from 'react';
import { 
  FileText, 
  Plus, 
  Search, 
  Pin, 
  Sparkles, 
  Tag, 
  Clock, 
  Trash2, 
  Copy, 
  Check,
  BookOpen
} from 'lucide-react';
import { useToast } from '../../hooks/useToast';

interface NoteItem {
  id: number;
  title: string;
  category: string;
  content: string;
  date: string;
  pinned: boolean;
}

export const NotesPage: React.FC = () => {
  const toast = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState<NoteItem | null>(null);

  // New Note Form State
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('HR Policy');
  const [newContent, setNewContent] = useState('');

  const [notes, setNotes] = useState<NoteItem[]>([
    {
      id: 1,
      title: 'Q3 Onboarding SLA & Compliance Checklist',
      category: 'Checklists',
      content: 'Ensure all background checks from First Advantage are verified before day 1. Hardware laptops must be shipped 3 days prior.',
      date: 'Sept 01, 2026',
      pinned: true
    },
    {
      id: 2,
      title: 'Senior Frontend Engineer Interview Evaluation Notes',
      category: 'Interview Notes',
      content: 'Candidate demonstrated deep understanding of React 19 concurrent features, micro-frontend architecture, and Web Vitals optimization.',
      date: 'Aug 29, 2026',
      pinned: true
    },
    {
      id: 3,
      title: 'Updated UAE Labor Law Gratuity Calculations 2026',
      category: 'HR Policy',
      content: 'Gratuity calculation based on 21 days basic salary for years 1-5, 30 days basic salary for 5+ years. Maximum cap set at 2 years salary.',
      date: 'Aug 25, 2026',
      pinned: false
    },
    {
      id: 4,
      title: 'Remote Work Security & YubiKey Mandatory Policy',
      category: 'Memos',
      content: 'All remote employees must activate hardware 2FA key tokens for AWS and GitHub access by mid-month.',
      date: 'Aug 20, 2026',
      pinned: false
    }
  ]);

  const togglePin = (id: number) => {
    setNotes(prev => prev.map(n => n.id === id ? { ...n, pinned: !n.pinned } : n));
    toast.success('Note pin status updated!');
  };

  const deleteNote = (id: number) => {
    setNotes(prev => prev.filter(n => n.id !== id));
    toast.info('Note removed.');
  };

  const handleCreateNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newContent) {
      toast.error('Please enter both title and note content.');
      return;
    }
    const item: NoteItem = {
      id: Date.now(),
      title: newTitle,
      category: newCategory,
      content: newContent,
      date: 'Sept 2026',
      pinned: false
    };
    setNotes([item, ...notes]);
    toast.success(`Note "${newTitle}" created successfully!`);
    setShowNoteModal(false);
    setNewTitle('');
    setNewContent('');
  };

  const handleAiSummarize = (note: NoteItem) => {
    toast.success(`AI Summary generated for "${note.title}": Cleared compliance & action items highlighted.`);
  };

  const filteredNotes = notes.filter(n => {
    const matchesSearch = n.title.toLowerCase().includes(searchTerm.toLowerCase()) || n.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || n.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#002222] via-[#004848] to-[#006666] rounded-2xl p-6 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-400/20 text-teal-200 border border-teal-300/30 text-xs font-bold uppercase tracking-wider mb-2">
            <FileText className="h-3.5 w-3.5 text-teal-300" />
            <span>Knowledge Repository</span>
          </div>
          <h1 className="text-xl md:text-2xl font-extrabold text-white m-0">HR & Personal Notes Studio</h1>
          <p className="text-xs text-teal-100/80 mt-1">Capture interview notes, HR policies, onboarding checklists, and meeting memos with AI summarization.</p>
        </div>

        <button
          onClick={() => setShowNoteModal(true)}
          className="px-5 py-2.5 bg-white text-[#004848] font-extrabold text-xs rounded-xl shadow-sm hover:bg-slate-100 transition-all flex items-center gap-2 cursor-pointer shrink-0"
        >
          <Plus className="h-4 w-4" />
          <span>+ Create New Note</span>
        </button>
      </div>

      {/* Search and Category Filter Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
          <input 
            type="text"
            placeholder="Search notes content or tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 outline-none focus:border-[#004848]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 select-none">
          {['All', 'HR Policy', 'Interview Notes', 'Checklists', 'Memos'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all border cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#004848] text-white font-extrabold border-transparent shadow-xs'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Notes Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNotes.map((note) => (
          <div 
            key={note.id} 
            className={`bg-white border rounded-2xl p-5 shadow-sm space-y-3 flex flex-col justify-between transition-all hover:shadow-md ${
              note.pinned ? 'border-teal-300 ring-1 ring-teal-200/50' : 'border-slate-200'
            }`}
          >
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-teal-50 text-teal-800 border border-teal-200">
                  {note.category}
                </span>

                <div className="flex items-center gap-1.5">
                  <button 
                    onClick={() => togglePin(note.id)}
                    title={note.pinned ? 'Unpin Note' : 'Pin Note'}
                    className={`p-1 rounded-lg transition-colors cursor-pointer ${
                      note.pinned ? 'text-[#004848] bg-teal-50' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Pin className="h-3.5 w-3.5" />
                  </button>
                  <button 
                    onClick={() => deleteNote(note.id)}
                    title="Delete Note"
                    className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              <h3 className="text-xs font-extrabold text-slate-900 leading-snug m-0">{note.title}</h3>
              <p className="text-xs text-slate-600 font-normal line-clamp-3 leading-relaxed">{note.content}</p>
            </div>

            <div className="pt-3 border-t border-slate-150 flex items-center justify-between text-[11px] text-slate-400">
              <div className="flex items-center gap-1 font-semibold">
                <Clock className="h-3 w-3" />
                <span>{note.date}</span>
              </div>

              <button
                onClick={() => handleAiSummarize(note)}
                className="px-2.5 py-1 bg-purple-50 text-purple-700 border border-purple-200 rounded-lg text-[10px] font-bold hover:bg-purple-100 transition-all flex items-center gap-1 cursor-pointer"
              >
                <Sparkles className="h-3 w-3 text-purple-600" />
                <span>AI Summary</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Creating New Note */}
      {showNoteModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 animate-scale-up">
            <div className="flex justify-between items-center border-b border-slate-150 pb-3">
              <h3 className="text-sm font-bold text-slate-900 m-0">Create New HR Note</h3>
              <button 
                onClick={() => setShowNoteModal(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateNote} className="space-y-3.5 text-xs font-semibold text-slate-700">
              <div>
                <label className="block mb-1 font-bold text-slate-800">Note Title</label>
                <input 
                  type="text"
                  placeholder="e.g. Compensation Review Guidelines 2026"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold outline-none focus:border-[#004848]"
                />
              </div>

              <div>
                <label className="block mb-1 font-bold text-slate-800">Category Tag</label>
                <select 
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold outline-none"
                >
                  <option>HR Policy</option>
                  <option>Interview Notes</option>
                  <option>Checklists</option>
                  <option>Memos</option>
                </select>
              </div>

              <div>
                <label className="block mb-1 font-bold text-slate-800">Content & Details</label>
                <textarea 
                  rows={4}
                  placeholder="Type your notes here..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs font-medium outline-none focus:border-[#004848]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNoteModal(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 font-bold rounded-xl text-xs hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#004848] text-white font-bold rounded-xl text-xs hover:bg-[#006666]"
                >
                  Save Note
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotesPage;

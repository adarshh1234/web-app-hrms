import React, { useState } from 'react';
import { Newspaper, Send, Plus, Eye, ThumbsUp, Calendar, Search, Trash2, Edit2, Share2, Users } from 'lucide-react';
import { useToast } from '../../hooks/useToast';

interface NewsletterArticle {
  id: string;
  title: string;
  category: string;
  publishDate: string;
  author: string;
  reads: number;
  likes: number;
  status: 'Published' | 'Draft' | 'Scheduled';
  summary: string;
}

export const EventsNewsletterPage: React.FC = () => {
  const toast = useToast();
  const [articles, setArticles] = useState<NewsletterArticle[]>([
    {
      id: '1',
      title: 'HUREMASO Annual Tech Summit 2026: Keynote & Hackathon Highlights',
      category: 'Company Events',
      publishDate: 'Aug 28, 2026',
      author: 'HR Communications Team',
      reads: 342,
      likes: 89,
      status: 'Published',
      summary: 'A recap of our 3-day annual developer hackathon featuring groundbreaking AI prototypes and leadership keynotes.'
    },
    {
      id: '2',
      title: 'Q3 Wellness Week & Employee Recognition Ceremony',
      category: 'Employee Experience',
      publishDate: 'Aug 15, 2026',
      author: 'Sarah Joseph',
      reads: 278,
      likes: 64,
      status: 'Published',
      summary: 'Celebrating our top performers of Q3 and unveiling new wellness stipends for all regional offices.'
    },
    {
      id: '3',
      title: 'Upcoming Autumn Team Retreat & Sports Tournament Announcement',
      category: 'Social Events',
      publishDate: 'Sep 05, 2026',
      author: 'Events Committee',
      reads: 0,
      likes: 0,
      status: 'Scheduled',
      summary: 'Get ready for our annual sports weekend! Registration opens this Friday.'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [titleInput, setTitleInput] = useState('');
  const [categoryInput, setCategoryInput] = useState('Company Events');
  const [summaryInput, setSummaryInput] = useState('');

  const handleCreateNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleInput.trim() || !summaryInput.trim()) {
      toast.error('Title and summary content are required.');
      return;
    }
    const newArticle: NewsletterArticle = {
      id: Date.now().toString(),
      title: titleInput,
      category: categoryInput,
      publishDate: 'Today',
      author: 'Sarah Joseph',
      reads: 1,
      likes: 0,
      status: 'Published',
      summary: summaryInput
    };
    setArticles([newArticle, ...articles]);
    setTitleInput('');
    setSummaryInput('');
    toast.success('Event newsletter issue published successfully!');
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this newsletter entry?')) {
      setArticles(articles.filter((a) => a.id !== id));
      toast.success('Newsletter entry removed.');
    }
  };

  const filteredArticles = articles.filter(
    (a) =>
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top Title Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2 m-0">
            <Newspaper className="h-5 w-5 text-[#006666]" />
            <span>Events Newsletter & Announcements</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Broadcast company event highlights, monthly newsletters, and employee spotlights.
          </p>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-1">
          <span className="text-slate-400 font-semibold text-[11px] block">Total Newsletters</span>
          <span className="text-2xl font-extrabold text-slate-900">14 Issues</span>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-1">
          <span className="text-slate-400 font-semibold text-[11px] block">Employee Engagement Rate</span>
          <span className="text-2xl font-extrabold text-[#006666]">84.2%</span>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-1">
          <span className="text-slate-400 font-semibold text-[11px] block">Total Article Reads</span>
          <span className="text-2xl font-extrabold text-slate-900">1,290</span>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-1">
          <span className="text-slate-400 font-semibold text-[11px] block">Scheduled Releases</span>
          <span className="text-2xl font-extrabold text-amber-600">1 Draft</span>
        </div>
      </div>

      {/* Publish Form Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
        <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2">
          Create & Broadcast Event Newsletter
        </h2>
        <form onSubmit={handleCreateNewsletter} className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-semibold text-slate-700">
          <div className="md:col-span-2">
            <label className="block mb-1">Newsletter Title</label>
            <input
              type="text"
              placeholder="e.g. End of Year Gala & Cultural Night Highlights"
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 outline-none focus:border-[var(--primary-color)] font-medium"
            />
          </div>
          <div>
            <label className="block mb-1">Category</label>
            <select
              value={categoryInput}
              onChange={(e) => setCategoryInput(e.target.value)}
              className="w-full bg-white rounded-lg border border-slate-200 px-3 py-2 text-slate-900 outline-none focus:border-[var(--primary-color)]"
            >
              <option value="Company Events">Company Events</option>
              <option value="Employee Experience">Employee Experience</option>
              <option value="Social Events">Social Events</option>
              <option value="HR Announcement">HR Announcement</option>
            </select>
          </div>
          <div className="md:col-span-3">
            <label className="block mb-1">Newsletter Highlights / Content Summary</label>
            <textarea
              rows={3}
              placeholder="Write a concise overview of the event, photos link, and major takeaways for the team..."
              value={summaryInput}
              onChange={(e) => setSummaryInput(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 outline-none focus:border-[var(--primary-color)] font-medium"
            />
          </div>
          <div className="md:col-span-3 flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2 bg-[#004848] hover:bg-[#003333] text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              <Send className="h-3.5 w-3.5" />
              <span>Publish Newsletter</span>
            </button>
          </div>
        </form>
      </div>

      {/* Published Newsletters Feed */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className="text-xs font-bold text-slate-500">({filteredArticles.length}) Newsletter Issues</span>
          <input
            type="text"
            placeholder="Search newsletters..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs text-slate-900 outline-none focus:border-[var(--primary-color)] w-full sm:w-64"
          />
        </div>

        <div className="space-y-3">
          {filteredArticles.map((art) => (
            <div key={art.id} className="p-4 border border-slate-200 rounded-xl bg-slate-50/50 hover:bg-white transition-all shadow-2xs space-y-2">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-teal-100 text-[#006666]">
                      {art.category}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400">Published {art.publishDate} by {art.author}</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 m-0">{art.title}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => toast.info(`Sharing newsletter: ${art.title}`)}
                    className="p-1.5 text-slate-400 hover:text-blue-600 transition-colors" 
                    title="Share Link"
                  >
                    <Share2 className="h-3.5 w-3.5" />
                  </button>
                  <button 
                    onClick={() => handleDelete(art.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors" 
                    title="Delete Issue"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed font-medium">{art.summary}</p>

              <div className="flex items-center gap-4 pt-1 text-[11px] font-bold text-slate-500 border-t border-slate-200/60">
                <span className="flex items-center gap-1">
                  <Eye className="h-3.5 w-3.5 text-slate-400" />
                  <span>{art.reads} Reads</span>
                </span>
                <span className="flex items-center gap-1">
                  <ThumbsUp className="h-3.5 w-3.5 text-blue-500" />
                  <span>{art.likes} Likes</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventsNewsletterPage;

import { useState } from 'react';
import { Clock, Info, Instagram, Linkedin, Twitter, Dribbble, Menu, ChevronLeft, ChevronRight, ArrowLeft, Facebook, Share2, Search, MessageSquare } from 'lucide-react';

const authors = [
  { name: 'Sarah Jenkins', role: 'CMO at TechGrowth', avatar: 'SJ', color: 'bg-blue-500', bio: 'Sarah is a seasoned marketing executive with over 15 years of experience in scaling B2B tech companies. She specializes in data-driven growth strategies and brand positioning.' },
  { name: 'Marcus Chen', role: 'Growth Lead', avatar: 'MC', color: 'bg-emerald-500', bio: 'Marcus leads growth initiatives with a focus on product-led growth and performance marketing. He has helped multiple startups achieve 10x revenue growth.' },
  { name: 'Elena Rodriguez', role: 'B2B Strategist', avatar: 'ER', color: 'bg-purple-500', bio: 'Elena is a B2B strategy consultant who helps enterprise companies navigate digital transformation and modernize their go-to-market motions.' }
];

const rawArticles = [
  {
    date: 'January 30, 2024',
    title: 'Unleashing Power B2B Marketing for Sustainable Growth',
    readingTime: '12 Min',
    tags: ['B2B', 'Marketing', 'Growth'],
  },
  {
    date: 'January 30, 2024',
    title: 'A Comprehensive Guide to Navigating the Dynamic B2B Marketing',
    readingTime: '12 Min',
    tags: ['B2B', 'Strategy', 'Guide'],
  },
  {
    date: 'January 30, 2024',
    title: 'Crafting Next-Level SaaS Marketing Strategies for Unmatched Market Impact',
    readingTime: '12 Min',
    tags: ['SaaS', 'Strategy', 'Impact'],
  },
  {
    date: 'January 30, 2024',
    title: 'Harnessing the Untapped Potential of B2B Marketing for Long-Term Success',
    readingTime: '12 Min',
    tags: ['B2B', 'Success', 'Marketing'],
  },
  {
    date: 'January 30, 2024',
    title: 'A Deep Dive into B2B Marketing Strategies for Unprecedented Business Growth',
    readingTime: '12 Min',
    tags: ['B2B', 'Growth', 'Strategy'],
  },
  {
    date: 'January 30, 2024',
    title: 'Insider Insights on Navigating the Ever-Changing Terrain of B2B Marketing',
    readingTime: '12 Min',
    tags: ['B2B', 'Insights', 'Marketing'],
  },
  {
    date: 'January 30, 2024',
    title: 'Transformative Strategies for Redefining the Landscape of Modern Marketing',
    readingTime: '12 Min',
    tags: ['Strategy', 'Modern', 'Marketing'],
  },
  {
    date: 'January 30, 2024',
    title: 'Unlocking Potentials and Paving the Way for Sustainable Business Growth',
    readingTime: '12 Min',
    tags: ['Growth', 'Sustainable', 'Business'],
  },
  {
    date: 'January 30, 2024',
    title: 'Revolutionizing SaaS Marketing Tactics for the Ultimate Competitive Edge',
    readingTime: '12 Min',
    tags: ['SaaS', 'Tactics', 'Competitive'],
  },
  {
    date: 'January 28, 2024',
    title: 'The Future of B2B Marketing: AI and Automation',
    readingTime: '10 Min',
    tags: ['B2B', 'AI', 'Automation'],
  },
  {
    date: 'January 25, 2024',
    title: 'Building a Resilient SaaS Brand in a Competitive Market',
    readingTime: '15 Min',
    tags: ['SaaS', 'Brand', 'Market'],
  },
  {
    date: 'January 22, 2024',
    title: 'Data-Driven Decision Making for Marketing Leaders',
    readingTime: '8 Min',
    tags: ['Data', 'Leadership', 'Marketing'],
  },
];

const articles = rawArticles.map((a, i) => ({
  ...a,
  id: i + 1,
  author: authors[i % authors.length],
  category: i % 2 === 0 ? 'Strategy' : 'Growth',
  content: `This is the full content for "${a.title}".\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\nSed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.`
}));

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'about'>('home');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedArticleId, setSelectedArticleId] = useState<number | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [comments, setComments] = useState<Record<number, {name: string, text: string, date: string}[]>>({});
  const [newCommentName, setNewCommentName] = useState('');
  const [newCommentText, setNewCommentText] = useState('');
  
  const articlesPerPage = 6;
  
  const filteredArticles = articles.filter(a => {
    const matchesTag = selectedTag ? a.tags.includes(selectedTag) : true;
    const matchesSearch = searchQuery 
      ? a.title.toLowerCase().includes(searchQuery.toLowerCase()) || a.content.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesTag && matchesSearch;
  });

  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const currentArticles = filteredArticles.slice(startIndex, startIndex + articlesPerPage);

  const allTags = Array.from(new Set(articles.flatMap(a => a.tags))).sort();

  const handleTagClick = (tag: string | null, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    setSelectedTag(tag === selectedTag ? null : tag);
    setSelectedArticleId(null);
    setCurrentView('home');
    setCurrentPage(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleArticleClick = (id: number) => {
    setSelectedArticleId(id);
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddComment = (e: React.FormEvent, articleId: number) => {
    e.preventDefault();
    if (!newCommentName.trim() || !newCommentText.trim()) return;
    
    const newComment = {
      name: newCommentName,
      text: newCommentText,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    };
    
    setComments(prev => ({
      ...prev,
      [articleId]: [...(prev[articleId] || []), newComment]
    }));
    
    setNewCommentName('');
    setNewCommentText('');
  };

  const selectedArticle = selectedArticleId ? articles.find(a => a.id === selectedArticleId) : null;
  const relatedArticles = selectedArticle 
    ? articles.filter(a => a.id !== selectedArticle.id && a.category === selectedArticle.category).slice(0, 3)
    : [];

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      {/* Header */}
      <header className="container mx-auto px-4 lg:px-8 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold italic">
            O
          </div>
          <span className="text-xl font-bold">Olivine</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-gray-600">
          <a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('home'); setSelectedArticleId(null); }} className={`hover:text-gray-900 ${currentView === 'home' && !selectedArticleId ? 'text-gray-900' : ''}`}>Home</a>
          <a href="#" className="hover:text-gray-900">Agency</a>
          <a href="#" className="hover:text-gray-900">Marketplace</a>
          <a href="#" className="hover:text-gray-900">Playbooks</a>
          <a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('about'); setSelectedArticleId(null); }} className={`hover:text-gray-900 ${currentView === 'about' ? 'text-gray-900' : ''}`}>About Us</a>
          <a href="#" className="hover:text-gray-900">Resources</a>
          <a href="#" className="hover:text-gray-900">Contact Us</a>
        </nav>

        <div className="hidden lg:block">
          <button className="px-6 py-2.5 rounded-full border border-gray-300 text-sm font-medium hover:bg-gray-50 transition-colors">
            Start Free Trial
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button className="lg:hidden p-2 border border-gray-200 rounded-full">
          <Menu className="w-5 h-5 text-gray-600" />
        </button>
      </header>

      <main className="container mx-auto px-4 lg:px-8 py-12 lg:py-20">
        {currentView === 'about' ? (
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-8 text-center">About Olivine</h1>
            <div className="w-full aspect-video bg-gray-200 rounded-3xl mb-12 flex items-center justify-center">
              <span className="text-gray-400 font-medium">Team Photo Placeholder</span>
            </div>
            
            <div className="prose prose-lg max-w-none text-gray-600 mb-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="mb-8">At Olivine, our mission is to empower B2B companies with the strategies, tools, and insights they need to achieve sustainable, long-term growth. We believe that great marketing isn't just about leads; it's about building lasting relationships and delivering genuine value.</p>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
              <p className="mb-8">We envision a future where B2B marketing is as engaging, personalized, and impactful as the best consumer brands. We're building the playbook for the next generation of SaaS and enterprise growth.</p>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Meet Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
              {authors.map((author, idx) => (
                <div key={idx} className="bg-gray-50 rounded-2xl p-8 text-center">
                  <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center text-white text-2xl font-bold mb-6 ${author.color}`}>
                    {author.avatar}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{author.name}</h3>
                  <div className="text-sm font-medium text-gray-500 mb-4">{author.role}</div>
                  <p className="text-sm text-gray-600 leading-relaxed">{author.bio}</p>
                </div>
              ))}
            </div>
          </div>
        ) : selectedArticle ? (
          <>
            <button 
              onClick={() => setSelectedArticleId(null)} 
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors font-medium"
            >
              <ArrowLeft className="w-5 h-5" /> Back to articles
            </button>

            <article className="max-w-6xl mx-auto mb-24">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Main Content Column */}
                <div className="lg:col-span-8">
                  <div className="mb-8">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <span className="bg-gray-100 px-3 py-1 rounded-full text-gray-700 font-medium">{selectedArticle.category}</span>
                      <span>{selectedArticle.date}</span>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{selectedArticle.readingTime}</span>
                      </div>
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-8">
                      {selectedArticle.title}
                    </h1>
                    
                    <div className="flex flex-wrap gap-2 mb-8">
                      {selectedArticle.tags.map(tag => (
                        <span 
                          key={tag} 
                          onClick={(e) => handleTagClick(tag, e)}
                          className="text-sm font-medium px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="w-full aspect-video bg-gray-200 rounded-3xl mb-12"></div>

                  <div className="prose prose-lg max-w-none text-gray-600 mb-16">
                    {selectedArticle.content.split('\n\n').map((paragraph, i) => (
                      <p key={i} className="mb-6 leading-relaxed">{paragraph}</p>
                    ))}
                  </div>

                  {/* Comments Section */}
                  <div className="border-t border-gray-100 pt-12">
                    <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
                      <MessageSquare className="w-6 h-6" />
                      Comments ({(comments[selectedArticle.id] || []).length})
                    </h3>
                    
                    <form onSubmit={(e) => handleAddComment(e, selectedArticle.id)} className="bg-gray-50 rounded-2xl p-6 mb-12">
                      <h4 className="font-semibold mb-4 text-gray-900">Leave a comment</h4>
                      <div className="mb-4">
                        <input 
                          type="text" 
                          placeholder="Your Name" 
                          value={newCommentName}
                          onChange={(e) => setNewCommentName(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900"
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <textarea 
                          placeholder="Your Comment" 
                          value={newCommentText}
                          onChange={(e) => setNewCommentText(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 min-h-[100px]"
                          required
                        />
                      </div>
                      <button 
                        type="submit"
                        className="px-6 py-3 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 transition-colors"
                      >
                        Post Comment
                      </button>
                    </form>

                    <div className="space-y-8">
                      {(comments[selectedArticle.id] || []).map((comment, idx) => (
                        <div key={idx} className="flex gap-4">
                          <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center text-gray-500 font-bold">
                            {comment.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="flex items-center gap-3 mb-1">
                              <span className="font-semibold text-gray-900">{comment.name}</span>
                              <span className="text-sm text-gray-500">{comment.date}</span>
                            </div>
                            <p className="text-gray-600 leading-relaxed">{comment.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sidebar Column */}
                <div className="lg:col-span-4 space-y-8">
                  {/* Author Bio Card */}
                  <div className="bg-gray-50 rounded-3xl p-8">
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold ${selectedArticle.author.color}`}>
                        {selectedArticle.author.avatar}
                      </div>
                      <div>
                        <div className="text-lg font-bold text-gray-900">{selectedArticle.author.name}</div>
                        <div className="text-sm font-medium text-gray-500">{selectedArticle.author.role}</div>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed mb-6">
                      {selectedArticle.author.bio}
                    </p>
                    <div className="flex items-center gap-3 pt-6 border-t border-gray-200">
                      <span className="text-sm font-medium text-gray-500 mr-2 flex items-center gap-2">
                        <Share2 className="w-4 h-4" /> Share
                      </span>
                      <button 
                        onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(selectedArticle.title)}`, '_blank')}
                        className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-600 hover:bg-[#1DA1F2] hover:text-white transition-colors shadow-sm"
                        aria-label="Share on Twitter"
                      >
                        <Twitter className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(selectedArticle.title)}`, '_blank')}
                        className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-600 hover:bg-[#0A66C2] hover:text-white transition-colors shadow-sm"
                        aria-label="Share on LinkedIn"
                      >
                        <Linkedin className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
                        className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-600 hover:bg-[#1877F2] hover:text-white transition-colors shadow-sm"
                        aria-label="Share on Facebook"
                      >
                        <Facebook className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Related Articles Sidebar */}
                  {relatedArticles.length > 0 && (
                    <div className="bg-gray-50 rounded-3xl p-8">
                      <h3 className="text-xl font-bold mb-6 text-gray-900">Related Articles</h3>
                      <div className="space-y-6">
                        {relatedArticles.map(article => (
                          <article key={article.id} className="group cursor-pointer" onClick={() => handleArticleClick(article.id)}>
                            <div className="w-full aspect-video bg-gray-200 rounded-xl mb-3 group-hover:opacity-90 transition-opacity"></div>
                            <h4 className="text-base font-semibold leading-snug group-hover:text-gray-600 transition-colors mb-2">
                              {article.title}
                            </h4>
                            <div className="text-xs text-gray-500">{article.date}</div>
                          </article>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </article>
          </>
        ) : (
          <>
            {/* Hero Section */}
            <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-4">
                Let's Find The Latest<br className="hidden sm:block" /> Article And Blog Today
              </h1>
            </div>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8 relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search articles by title or content..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-11 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
              />
            </div>

            {/* Tag Filter */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-12 max-w-4xl mx-auto">
              <button
                onClick={() => handleTagClick(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedTag === null ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedTag === tag ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Articles Grid */}
            {currentArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 mb-12">
                {currentArticles.map((article, index) => (
                  <article 
                    key={startIndex + index} 
                    className="group cursor-pointer"
                    onClick={() => handleArticleClick(article.id)}
                  >
                    <div className="w-full aspect-[4/3] bg-gray-200 rounded-2xl mb-6 group-hover:opacity-90 transition-opacity"></div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {article.tags.map(tag => (
                        <span 
                          key={tag} 
                          onClick={(e) => handleTagClick(tag, e)}
                          className="text-xs font-medium px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="text-sm text-gray-500 mb-3">{article.date}</div>
                    <h3 className="text-xl font-semibold leading-snug mb-4 group-hover:text-gray-600 transition-colors">
                      {article.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>Reading Time About {article.readingTime}</span>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 text-gray-500">
                No articles found matching your search or tag filters.
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mb-24">
                <button 
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-10 h-10 rounded-full text-sm font-medium transition-colors ${
                        currentPage === i + 1 
                          ? 'bg-gray-900 text-white' 
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <button 
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </>
        )}

        {/* Newsletter Section */}
        <div className="bg-[#0B1120] rounded-[2rem] p-8 lg:p-16 text-center text-white mb-24">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Subscribe To Our Newsletter</h2>
          <p className="text-gray-400 mb-10">Unlock Exclusive Insights Subscribe to Our Newsletter</p>
          
          <div className="max-w-xl mx-auto relative">
            <input 
              type="email" 
              placeholder="Enter Your Email Address" 
              className="w-full bg-transparent border border-gray-700 rounded-full py-4 pl-6 pr-40 focus:outline-none focus:border-gray-500 text-white placeholder-gray-500"
            />
            <button className="absolute right-2 top-2 bottom-2 bg-white text-gray-900 px-6 rounded-full font-medium hover:bg-gray-100 transition-colors">
              Subscribe Now
            </button>
          </div>
          
          <div className="flex items-center justify-center gap-2 mt-6 text-sm text-gray-400">
            <Info className="w-4 h-4" />
            <span>Your email is safe with us no spam, just valuable updates!</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 lg:px-8 py-12 lg:py-16 border-t border-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold italic">
                O
              </div>
              <span className="text-xl font-bold">Olivine</span>
            </div>
            <p className="text-gray-500 mb-8 max-w-xs">
              Product marketing leaders in B2B SaaS.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 bg-[#0B1120] text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 bg-[#0B1120] text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 bg-[#0B1120] text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 bg-[#0B1120] text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
                <Dribbble className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold mb-6">Agency</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li><a href="#" className="hover:text-gray-900">Our Servies</a></li>
                <li><a href="#" className="hover:text-gray-900">Contact Us</a></li>
                <li><a href="#" className="hover:text-gray-900">Hire a Consultant</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-6">Members</h4>
              <ul className="space-y-4 text-sm text-gray-500 mb-8">
                <li><a href="#" className="hover:text-gray-900">Playbooks Home</a></li>
                <li><a href="#" className="hover:text-gray-900">Your Account</a></li>
              </ul>
              
              <h4 className="font-semibold mb-6">Playbooks</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li><a href="#" className="hover:text-gray-900">Marketing Program</a></li>
                <li><a href="#" className="hover:text-gray-900">How Playbooks Works</a></li>
                <li><a href="#" className="hover:text-gray-900">Member Stories</a></li>
                <li><a href="#" className="hover:text-gray-900">Pricing For Playbooks</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-6">Company</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('about'); setSelectedArticleId(null); window.scrollTo(0,0); }} className="hover:text-gray-900">About Us</a></li>
                <li><a href="#" className="hover:text-gray-900">Affiliates</a></li>
                <li><a href="#" className="hover:text-gray-900">Careers</a></li>
                <li><a href="#" className="hover:text-gray-900">Clients Portfolio</a></li>
                <li><a href="#" className="hover:text-gray-900">Guest Writing</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-6">Resources</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li><a href="#" className="hover:text-gray-900">Blog</a></li>
                <li><a href="#" className="hover:text-gray-900">Newsletter</a></li>
                <li><a href="#" className="hover:text-gray-900">PPM Launch Accelerator</a></li>
                <li><a href="#" className="hover:text-gray-900">Free Video Course</a></li>
                <li><a href="#" className="hover:text-gray-900">Job Posting Board</a></li>
                <li><a href="#" className="hover:text-gray-900">Free Resources</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-gray-100 text-sm text-gray-500">
          <p>Copyright © 2024 olivine, Inc. All rights reserveds</p>
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-gray-900">Privacy Policy</a>
            <a href="#" className="hover:text-gray-900">Terms of Use</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import blogPosts from '../utils/blogPosts.js';
import Button from '../components/Button.jsx';

export default function Blog() {
  const [page, setPage] = useState(1);
  const perPage = 3;

  const totalPages = Math.ceil(blogPosts.length / perPage);
  const posts = useMemo(() => {
    const start = (page - 1) * perPage;
    return blogPosts.slice(start, start + perPage);
  }, [page]);

  return (
    <main style={{ paddingTop: 86 }}>
      <section className="container" style={{ padding: '34px 0 22px' }}>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
          <h1 className="page-title" style={{ fontSize: 40, margin: 0 }}>
            Blog
          </h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: 10, lineHeight: 1.7 }}>
            Insights on learning, delivery, and building digital capability.
          </p>
        </motion.div>
      </section>

      <section className="section" style={{ paddingTop: 16 }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: 18 }}>
            {posts.map((post) => (
              <motion.article
                key={post.id}
                className="blog-card"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35 }}
              >
                <div className="blog-card-image">
                  <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&auto=format&fit=crop&q=80';
                    }}
                  />
                  <span
                    className="blog-category-badge"
                    style={{ backgroundColor: post.categoryColor || 'var(--primary)' }}
                  >
                    {post.category}
                  </span>
                </div>

                <div className="blog-card-body">
                  <h2 className="blog-card-title">{post.title}</h2>
                  <p className="blog-card-excerpt">{post.excerpt}</p>

                  <div className="blog-card-meta">
                    <div className="blog-card-author">
                      <div className="blog-author-avatar">{post.authorAvatar}</div>
                      <div>
                        <div className="blog-author-name">{post.author}</div>
                        <div className="blog-post-date">
                          {post.date} · {post.readTime}
                        </div>
                      </div>
                    </div>
                    <a
                      href="#blog"
                      className="blog-read-more"
                      onClick={(ev) => {
                        ev.preventDefault();
                        alert('Blog details coming soon.');
                      }}
                    >
                      Read More →
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, marginTop: 22, alignItems: 'center' }}>
            <Button variant="outline" disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>
              Prev
            </Button>
            <div style={{ color: 'var(--text-secondary)', fontWeight: 900 }}>
              {page} / {totalPages}
            </div>
            <Button variant="outline" disabled={page >= totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>
              Next
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

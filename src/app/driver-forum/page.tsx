
"use client";

import React, { useState } from 'react';
import { AppShell } from '@/components/layout/app-shell';
import { PageHeader } from '@/components/shared/page-header';
import { ForumPostCard } from '@/components/forum/forum-post-card';
import { NewPostForm } from '@/components/forum/new-post-form';
import type { ForumPost } from '@/lib/types';
import { useAuth } from '@/hooks/use-auth';

// Mock data
const mockPosts: ForumPost[] = [
  { id: 'fp1', authorId: 'driver1', authorName: 'Ali Kone', title: 'Best routes to avoid city center traffic?', content: 'Does anyone have tips on navigating around the main market area during peak hours? The usual routes are always jammed.', createdAt: '2023-10-28T10:00:00Z', commentsCount: 5 },
  { id: 'fp2', authorId: 'driver2', authorName: 'Fatima Diallo', title: 'Question about vehicle maintenance for long trips', content: 'Planning a long haul delivery next week. What are some essential pre-trip checks for the vehicle to ensure everything runs smoothly?', createdAt: '2023-10-27T15:30:00Z', commentsCount: 8 },
  { id: 'fp3', authorId: 'driver3', authorName: 'Moussa Traore', title: 'Dealing with unexpected road closures', content: 'Got stuck due to a sudden road closure yesterday. How do you guys handle these situations and find alternatives quickly?', createdAt: '2023-10-26T09:15:00Z', commentsCount: 3 },
];

export default function DriverForumPage() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<ForumPost[]>(mockPosts);

  const handleAddPost = (data: { title: string, content: string }) => {
    if (!user) return;
    const newPost: ForumPost = {
      id: `fp${posts.length + 1}`,
      authorId: user.id,
      authorName: user.name,
      title: data.title,
      content: data.content,
      createdAt: new Date().toISOString(),
      commentsCount: 0,
    };
    setPosts([newPost, ...posts]);
  };

  if (!user || user.role !== 'driver') {
    return (
      <AppShell>
        <PageHeader title="Access Denied" description="You must be a driver to view this page." />
      </AppShell>
    );
  }

  return (
    <AppShell>
      <PageHeader title="Driver Forum" description="Connect, share, and solve problems with fellow drivers." />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {posts.map((post) => (
            <ForumPostCard key={post.id} post={post} />
          ))}
        </div>
        <div className="md:col-span-1">
          <NewPostForm onAddPost={handleAddPost} />
        </div>
      </div>
    </AppShell>
  );
}

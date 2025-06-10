
import type { ForumPost } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { MessageSquare, ThumbsUp, Calendar } from 'lucide-react';

interface ForumPostCardProps {
  post: ForumPost;
}

export function ForumPostCard({ post }: ForumPostCardProps) {
  const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow">
      <CardHeader>
        <div className="flex items-center space-x-3 mb-2">
          <Avatar>
            <AvatarImage src={`https://placehold.co/40x40.png?text=${getInitials(post.authorName)}`} alt={post.authorName} data-ai-hint="user avatar" />
            <AvatarFallback>{getInitials(post.authorName)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-semibold">{post.authorName}</p>
            <p className="text-xs text-muted-foreground flex items-center">
              <Calendar className="mr-1 h-3 w-3" /> Posted on: {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        <CardTitle className="font-headline text-xl">{post.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-foreground/90 line-clamp-3">{post.content}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center text-sm text-muted-foreground">
        <div className="flex space-x-4">
          <Button variant="ghost" size="sm" className="flex items-center">
            <ThumbsUp className="mr-1 h-4 w-4" /> Like
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center">
            <MessageSquare className="mr-1 h-4 w-4" /> {post.commentsCount} Comments
          </Button>
        </div>
        <Button variant="link" size="sm">Read More</Button>
      </CardFooter>
    </Card>
  );
}

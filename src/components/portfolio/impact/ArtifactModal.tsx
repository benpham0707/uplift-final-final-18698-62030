import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Artifact } from './ProofStrip';
import { FileText, Image, Video, BarChart, Quote, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ArtifactModalProps {
  artifact: Artifact | null;
  isOpen: boolean;
  onClose: () => void;
}

const typeConfig = {
  screenshot: { icon: Image, color: 'text-blue-500' },
  document: { icon: FileText, color: 'text-green-500' },
  video: { icon: Video, color: 'text-purple-500' },
  data: { icon: BarChart, color: 'text-amber-500' },
  quote: { icon: Quote, color: 'text-pink-500' },
};

export const ArtifactModal: React.FC<ArtifactModalProps> = ({ artifact, isOpen, onClose }) => {
  if (!artifact) return null;

  const config = typeConfig[artifact.type];
  const Icon = config.icon;

  const isPdf = (url?: string) => Boolean(url && /\.pdf($|\?)/i.test(url));
  const isVideoFile = (url?: string) => Boolean(url && /\.(mp4|webm|ogg)($|\?)/i.test(url));
  const isImageFile = (url?: string) => Boolean(url && /\.(png|jpe?g|gif|webp|svg)($|\?)/i.test(url));
  const isYouTube = (url?: string) => Boolean(url && /(youtube\.com|youtu\.be)\//i.test(url));

  const renderPreview = () => {
    // Screenshot or explicit image links
    if (artifact.type === 'screenshot' || isImageFile(artifact.link)) {
      const src = artifact.thumbnail || artifact.link;
      if (!src) return null;
      return (
        <div className="w-full max-h-[60vh] bg-muted rounded-lg overflow-hidden">
          <img src={src} alt={artifact.title} className="w-full h-full object-contain" />
        </div>
      );
    }

    // Documents (PDF inline when possible)
    if (artifact.type === 'document') {
      if (isPdf(artifact.link)) {
        return (
          <div className="w-full h-[70vh] rounded-lg overflow-hidden border">
            <iframe
              src={artifact.link as string}
              title={artifact.title}
              className="w-full h-full"
            />
          </div>
        );
      }
      // Fallback informational preview
      return (
        <div className="w-full p-6 rounded-lg bg-muted text-sm text-muted-foreground">
          This document can be viewed at the link below.
        </div>
      );
    }

    // Videos: direct files or YouTube embeds
    if (artifact.type === 'video') {
      if (isVideoFile(artifact.link)) {
        return (
          <video controls className="w-full max-h-[70vh] rounded-lg bg-black">
            <source src={artifact.link} />
            Your browser does not support the video tag.
          </video>
        );
      }
      if (isYouTube(artifact.link)) {
        // Basic YouTube embed; rely on browser to handle URL
        const url = artifact.link as string;
        // Convert youtu.be short links to embed form
        const embed = url.includes('youtu.be')
          ? `https://www.youtube.com/embed/${url.split('/').pop()}`
          : url.replace('watch?v=', 'embed/');
        return (
          <div className="w-full aspect-video rounded-lg overflow-hidden">
            <iframe
              src={embed}
              title={artifact.title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        );
      }
      // Fallback to thumbnail if available
      if (artifact.thumbnail) {
        return (
          <div className="relative w-full max-h-[60vh] bg-black rounded-lg overflow-hidden">
            <img src={artifact.thumbnail} alt={artifact.title} className="w-full h-full object-contain opacity-90" />
          </div>
        );
      }
      return (
        <div className="w-full p-6 rounded-lg bg-muted text-sm text-muted-foreground">
          This video can be viewed at the link below.
        </div>
      );
    }

    // Data artifacts: try iframe if link exists, otherwise show description-only panel
    if (artifact.type === 'data') {
      if (artifact.link) {
        return (
          <div className="w-full h-[70vh] rounded-lg overflow-hidden border">
            <iframe src={artifact.link} title={artifact.title} className="w-full h-full" />
          </div>
        );
      }
      return (
        <div className="w-full p-6 rounded-lg bg-muted text-sm text-muted-foreground">
          Data artifact preview unavailable. See description below.
        </div>
      );
    }

    // Quotes: render nicely formatted blockquote
    if (artifact.type === 'quote') {
      return (
        <blockquote className="p-6 rounded-lg bg-gradient-to-br from-pink-50 to-purple-50 border text-foreground">
          <p className="italic">{artifact.description}</p>
        </blockquote>
      );
    }

    return null;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Icon className={cn("w-5 h-5", config.color)} />
            <DialogTitle>{artifact.title}</DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {renderPreview()}

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-foreground">Description</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {artifact.description}
            </p>
          </div>

          {/* Date */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-foreground">Date</h3>
            <p className="text-sm text-muted-foreground">{artifact.date}</p>
          </div>

          {/* Link */}
          {artifact.link && (
            <a
              href={artifact.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
            >
              View Full Source
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
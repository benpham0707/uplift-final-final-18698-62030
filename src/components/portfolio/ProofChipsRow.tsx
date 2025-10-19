import React from 'react';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProofLink {
  label: string;
  url: string;
  type: 'internal' | 'external';
}

interface ProofChipsRowProps {
  proofLinks: ProofLink[];
}

export const ProofChipsRow: React.FC<ProofChipsRowProps> = ({ proofLinks }) => {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
        Supporting Evidence
      </h3>
      <div className="flex flex-wrap gap-2">
        {proofLinks.map((link, idx) => (
          <a
            key={idx}
            href={link.url}
            target={link.type === 'external' ? '_blank' : '_self'}
            rel={link.type === 'external' ? 'noopener noreferrer' : undefined}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border bg-background hover:bg-accent hover:scale-105 transition-all text-xs font-medium text-foreground hover:text-primary"
          >
            {link.type === 'external' ? (
              <ExternalLink className="w-3 h-3" />
            ) : (
              <FileText className="w-3 h-3" />
            )}
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
};

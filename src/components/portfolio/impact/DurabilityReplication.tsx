import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Copy, XCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export interface DurabilityEvidence {
  initiative: string;
  persistence: {
    status: 'still-running' | 'adopted-by-institution' | 'discontinued';
    since: string;
    evidence: string;
  };
  replication?: {
    adopted: boolean;
    sites: number;
    description: string;
  };
}

interface DurabilityReplicationProps {
  evidence: DurabilityEvidence[];
}

const statusConfig = {
  'still-running': {
    label: 'Still Running',
    icon: CheckCircle,
    color: 'bg-green-500/10 text-green-500 border-green-500/20',
  },
  'adopted-by-institution': {
    label: 'Institutionalized',
    icon: CheckCircle,
    color: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  },
  'discontinued': {
    label: 'Discontinued',
    icon: XCircle,
    color: 'bg-muted text-muted-foreground border-border',
  },
};

export const DurabilityReplication: React.FC<DurabilityReplicationProps> = ({ evidence }) => {
  const activeCount = evidence.filter(e => e.persistence.status !== 'discontinued').length;
  const replicationCount = evidence.filter(e => e.replication?.adopted).length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h2 className="text-2xl font-bold text-foreground">Durability & Replication</h2>
        <div className="flex gap-4 text-sm">
          <div className="flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span className="text-muted-foreground">
              {activeCount}/{evidence.length} still running
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Copy className="w-4 h-4 text-blue-500" />
            <span className="text-muted-foreground">
              {replicationCount} replicated
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {evidence.map((item, idx) => {
          const statusStyle = statusConfig[item.persistence.status];
          const StatusIcon = statusStyle.icon;

          return (
            <Card key={idx} className="border-primary/20">
              <CardContent className="p-6 space-y-4">
                {/* Initiative Name */}
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-foreground">
                    {item.initiative}
                  </h3>
                  <Badge className={cn("text-xs", statusStyle.color)}>
                    <StatusIcon className="w-3 h-3 mr-1" />
                    {statusStyle.label}
                  </Badge>
                </div>

                {/* Persistence */}
                <div className="space-y-2">
                  <div className="text-sm font-semibold text-foreground">
                    Since {item.persistence.since}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.persistence.evidence}
                  </p>
                </div>

                {/* Replication */}
                {item.replication?.adopted && (
                  <div className="pt-4 border-t space-y-2">
                    <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                      <Copy className="w-4 h-4 text-blue-500" />
                      Replicated at {item.replication.sites} {item.replication.sites === 1 ? 'site' : 'sites'}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.replication.description}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

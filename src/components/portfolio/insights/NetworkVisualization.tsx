import React from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface NetworkNode {
  id: string;
  label: string;
  type: 'primary' | 'secondary' | 'tertiary';
  connections: string[];
}

interface NetworkVisualizationProps {
  nodes: NetworkNode[];
  centerNodeId: string;
  className?: string;
}

export const NetworkVisualization: React.FC<NetworkVisualizationProps> = ({
  nodes,
  centerNodeId,
  className,
}) => {
  const centerNode = nodes.find(n => n.id === centerNodeId);
  const connectedNodes = nodes.filter(n => 
    n.id !== centerNodeId && centerNode?.connections.includes(n.id)
  );

  return (
    <div className={cn('space-y-3', className)}>
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        Activity Connection Map
      </p>
      
      <div className="relative min-h-[200px] flex items-center justify-center">
        {/* Center node */}
        {centerNode && (
          <div className="relative z-10">
            <Badge 
              className={cn(
                'px-4 py-2 text-sm font-bold shadow-lg',
                'bg-primary text-primary-foreground'
              )}
            >
              {centerNode.label}
            </Badge>
          </div>
        )}
        
        {/* Connected nodes in a circle */}
        <div className="absolute inset-0">
          {connectedNodes.map((node, index) => {
            const angle = (index / connectedNodes.length) * 2 * Math.PI - Math.PI / 2;
            const radius = 80;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            
            const nodeColor = node.type === 'secondary' 
              ? 'bg-secondary/20 text-secondary border-secondary/30'
              : 'bg-accent/20 text-accent border-accent/30';

            return (
              <div
                key={node.id}
                className="absolute"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                }}
              >
                {/* Connection line */}
                <svg 
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: `${Math.abs(x) * 2}px`,
                    height: `${Math.abs(y) * 2}px`,
                  }}
                >
                  <line
                    x1={x > 0 ? 0 : Math.abs(x) * 2}
                    y1={y > 0 ? 0 : Math.abs(y) * 2}
                    x2={x > 0 ? Math.abs(x) * 2 : 0}
                    y2={y > 0 ? Math.abs(y) * 2 : 0}
                    stroke="hsl(var(--border))"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />
                </svg>
                
                <Badge 
                  variant="outline"
                  className={cn(
                    'px-3 py-1 text-xs font-semibold border-2',
                    nodeColor
                  )}
                >
                  {node.label}
                </Badge>
              </div>
            );
          })}
        </div>
      </div>
      
      <p className="text-xs text-muted-foreground text-center pt-2">
        {connectedNodes.length} related activities detected
      </p>
    </div>
  );
};

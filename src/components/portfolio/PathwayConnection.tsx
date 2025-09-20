import { cn } from '@/lib/utils';

interface PathwayConnectionProps {
  fromStatus: 'completed' | 'in-progress' | 'available' | 'locked';
  toStatus: 'completed' | 'in-progress' | 'available' | 'locked';
}

const PathwayConnection = ({ fromStatus, toStatus }: PathwayConnectionProps) => {
  const getConnectionStyle = () => {
    // Connection is active if the 'from' section has progress and 'to' section is not locked
    const isActive = fromStatus !== 'locked' && toStatus !== 'locked';
    const isCompleted = fromStatus === 'completed' && (toStatus === 'completed' || toStatus === 'in-progress' || toStatus === 'available');
    
    if (isCompleted) {
      return {
        lineColor: 'stroke-success',
        opacity: 'opacity-80',
        animation: ''
      };
    } else if (isActive) {
      return {
        lineColor: 'stroke-primary',
        opacity: 'opacity-60',
        animation: fromStatus === 'in-progress' ? 'animate-pulse' : ''
      };
    } else {
      return {
        lineColor: 'stroke-muted-foreground',
        opacity: 'opacity-30',
        animation: ''
      };
    }
  };

  const connectionStyle = getConnectionStyle();

  return (
    <div className="absolute left-10 top-20 w-0.5 h-16 z-0">
      {/* Main connection line */}
      <div className={cn(
        "w-full h-full bg-current transition-all duration-500",
        connectionStyle.lineColor,
        connectionStyle.opacity,
        connectionStyle.animation
      )} />
      
      {/* Flowing animation for active connections */}
      {fromStatus === 'in-progress' && toStatus !== 'locked' && (
        <div className="absolute inset-0 w-full">
          <div className="w-full h-2 bg-gradient-to-b from-transparent via-primary to-transparent animate-flow opacity-60" 
               style={{ 
                 background: 'linear-gradient(to bottom, transparent 0%, hsl(var(--primary)) 50%, transparent 100%)',
                 animation: 'flow-vertical 2s ease-in-out infinite'
               }} 
          />
        </div>
      )}
      
      {/* Connection dots */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1">
        <div className={cn(
          "w-2 h-2 rounded-full transition-all duration-500",
          connectionStyle.lineColor.replace('stroke', 'bg'),
          connectionStyle.opacity
        )} />
      </div>
      
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1">
        <div className={cn(
          "w-2 h-2 rounded-full transition-all duration-500",
          connectionStyle.lineColor.replace('stroke', 'bg'),
          connectionStyle.opacity
        )} />
      </div>
    </div>
  );
};

// Add the vertical flow animation to the global styles if not present
const style = document.createElement('style');
style.textContent = `
  @keyframes flow-vertical {
    0% { transform: translateY(-100%); opacity: 0; }
    50% { opacity: 1; }
    100% { transform: translateY(100%); opacity: 0; }
  }
`;
if (!document.head.querySelector('style[data-pathway-animations]')) {
  style.setAttribute('data-pathway-animations', 'true');
  document.head.appendChild(style);
}

export default PathwayConnection;
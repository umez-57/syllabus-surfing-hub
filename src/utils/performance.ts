import React from 'react';

// Performance monitoring utilities for mobile optimization

interface PerformanceMetrics {
  fps: number;
  memoryUsage: number;
  loadTime: number;
  deviceType: 'mobile' | 'tablet' | 'desktop';
  isLowEnd: boolean;
}

class PerformanceMonitor {
  private frameCount = 0;
  private lastTime = performance.now();
  private fps = 60;
  private fpsHistory: number[] = [];
  
  // Detect device capabilities
  public getDeviceCapabilities(): { isLowEnd: boolean; deviceType: string } {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isTablet = /iPad|Android(?=.*Mobile)/i.test(navigator.userAgent);
    
    // Low-end device detection
    const memory = (navigator as any).deviceMemory || 4;
    const cores = navigator.hardwareConcurrency || 2;
    const isSlowConnection = (navigator as any).connection?.effectiveType === 'slow-2g' || 
                           (navigator as any).connection?.effectiveType === '2g';
    
    const isLowEnd = memory <= 2 || cores <= 2 || isSlowConnection;
    
    let deviceType: 'mobile' | 'tablet' | 'desktop' = 'desktop';
    if (isMobile && !isTablet) deviceType = 'mobile';
    else if (isTablet) deviceType = 'tablet';
    
    return { isLowEnd, deviceType };
  }

  // Monitor FPS
  public updateFPS(): number {
    const now = performance.now();
    const delta = now - this.lastTime;
    this.lastTime = now;
    this.frameCount++;

    if (delta > 0) {
      const currentFPS = 1000 / delta;
      this.fpsHistory.push(currentFPS);
      
      // Keep only last 60 frames
      if (this.fpsHistory.length > 60) {
        this.fpsHistory.shift();
      }
      
      // Calculate average FPS
      this.fps = this.fpsHistory.reduce((a, b) => a + b, 0) / this.fpsHistory.length;
    }

    return Math.round(this.fps);
  }

  // Get memory usage
  public getMemoryUsage(): number {
    if ('memory' in performance) {
      const memInfo = (performance as any).memory;
      return Math.round((memInfo.usedJSHeapSize / memInfo.totalJSHeapSize) * 100);
    }
    return 0;
  }

  // Check if performance is poor
  public isPoorPerformance(): boolean {
    return this.fps < 30 || this.getMemoryUsage() > 80;
  }

  // Get performance recommendations
  public getRecommendations(): string[] {
    const recommendations: string[] = [];
    const { isLowEnd, deviceType } = this.getDeviceCapabilities();
    
    if (isLowEnd) {
      recommendations.push('Reduce animation complexity');
      recommendations.push('Disable blur effects');
      recommendations.push('Lower canvas resolution');
    }
    
    if (this.fps < 30) {
      recommendations.push('Reduce animation frame rate');
      recommendations.push('Simplify visual effects');
    }
    
    if (this.getMemoryUsage() > 70) {
      recommendations.push('Optimize memory usage');
      recommendations.push('Clean up unused resources');
    }
    
    if (deviceType === 'mobile') {
      recommendations.push('Use mobile-optimized components');
      recommendations.push('Reduce particle counts');
    }
    
    return recommendations;
  }

  // Apply automatic optimizations
  public getOptimizationSettings() {
    const { isLowEnd, deviceType } = this.getDeviceCapabilities();
    const poorPerformance = this.isPoorPerformance();
    
    return {
      // Animation settings
      reducedMotion: isLowEnd || poorPerformance,
      animationDuration: isLowEnd ? 0.2 : deviceType === 'mobile' ? 0.3 : 0.5,
      
      // Visual effects
      disableBlur: isLowEnd || (deviceType === 'mobile' && poorPerformance),
      particleCount: isLowEnd ? 5 : deviceType === 'mobile' ? 10 : 20,
      
      // Canvas settings
      maxDPR: isLowEnd ? 1 : deviceType === 'mobile' ? 2 : 3,
      targetFPS: isLowEnd ? 24 : deviceType === 'mobile' ? 30 : 60,
      
      // Component optimization
      useLightweightComponents: isLowEnd || deviceType === 'mobile',
      enablePowerSaving: deviceType === 'mobile',
    };
  }
}

// Singleton instance
export const performanceMonitor = new PerformanceMonitor();

// React hook for performance monitoring
export function usePerformanceMonitor() {
  const [metrics, setMetrics] = React.useState<PerformanceMetrics>({
    fps: 60,
    memoryUsage: 0,
    loadTime: 0,
    deviceType: 'desktop',
    isLowEnd: false,
  });

  React.useEffect(() => {
    const { isLowEnd, deviceType } = performanceMonitor.getDeviceCapabilities();
    const loadTime = performance.timing ? 
      performance.timing.loadEventEnd - performance.timing.navigationStart : 0;

    let animationId: number;
    
    const updateMetrics = () => {
      const fps = performanceMonitor.updateFPS();
      const memoryUsage = performanceMonitor.getMemoryUsage();
      
      setMetrics({
        fps,
        memoryUsage,
        loadTime,
        deviceType: deviceType as 'mobile' | 'tablet' | 'desktop',
        isLowEnd,
      });
      
      animationId = requestAnimationFrame(updateMetrics);
    };
    
    updateMetrics();
    
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return {
    metrics,
    optimizationSettings: performanceMonitor.getOptimizationSettings(),
    recommendations: performanceMonitor.getRecommendations(),
    isPoorPerformance: performanceMonitor.isPoorPerformance(),
  };
}

// Utility function to conditionally render components based on performance
export function ConditionalRender({ 
  children, 
  fallback, 
  condition = 'auto' 
}: { 
  children: React.ReactNode; 
  fallback?: React.ReactNode; 
  condition?: 'auto' | 'always' | 'never' | boolean;
}) {
  const { optimizationSettings } = usePerformanceMonitor();
  
  let shouldRender = true;
  
  if (condition === 'auto') {
    shouldRender = !optimizationSettings.useLightweightComponents;
  } else if (condition === 'never') {
    shouldRender = false;
  } else if (condition === 'always') {
    shouldRender = true;
  } else if (typeof condition === 'boolean') {
    shouldRender = condition;
  }
  
  return shouldRender ? children : (fallback || null);
}

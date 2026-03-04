import { memo } from 'react'

interface LoadingScreenProps {
  progress: number
  label: string
}

export const LoadingScreen = memo(({ progress, label }: LoadingScreenProps) => (
  <div className="loading-screen">
    <div className="loading-widget">
      <div className="loading-labels">
        <span className="loading-label">{label}</span>
        <span className="loading-percent">{Math.round(progress)}%</span>
      </div>
      <div className="loading-track">
        <div className="loading-fill" style={{ width: `${progress}%` }} />
      </div>
    </div>
  </div>
))

LoadingScreen.displayName = 'LoadingScreen'

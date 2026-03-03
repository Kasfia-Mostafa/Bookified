'use client'

import { Loader2 } from 'lucide-react'

const LoadingOverlay = () => {
  return (
    <div className="loading-wrapper">
      <div className="loading-shadow-wrapper bg-white">
        <div className="loading-shadow bg-white">
          <Loader2 className="loading-animation w-12 h-12 text-[#663820]" />
          <h3 className="loading-title">Processing Your Book</h3>
          <div className="loading-progress">
            <div className="loading-progress-item">
              <div className="loading-progress-status" />
              <span className="text-sm text-[#3d485e]">Analyzing PDF...</span>
            </div>
            <div className="loading-progress-item">
              <div className="loading-progress-status" />
              <span className="text-sm text-[#3d485e]">Preparing audio synthesis...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoadingOverlay

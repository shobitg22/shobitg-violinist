'use client'

import { useState, useRef, useEffect } from 'react'
import YouTube, { YouTubeProps } from 'react-youtube'

interface VideoPlayerProps {
  videoId: string
  title: string
  platform: 'youtube' | 'instagram'
}

export default function VideoPlayer({ videoId, title, platform }: VideoPlayerProps) {
  const [showOverlay, setShowOverlay] = useState(false)
  const [player, setPlayer] = useState<any>(null)
  const timeCheckInterval = useRef<NodeJS.Timeout | null>(null)

  const onReady: YouTubeProps['onReady'] = (event) => {
    setPlayer(event.target)
  }

  const onPlay = () => {
    if (timeCheckInterval.current) {
      clearInterval(timeCheckInterval.current)
    }

    timeCheckInterval.current = setInterval(() => {
      if (player) {
        const currentTime = player.getCurrentTime()
        if (currentTime >= 30) {
          player.pauseVideo()
          setShowOverlay(true)
          if (timeCheckInterval.current) {
            clearInterval(timeCheckInterval.current)
          }
        }
      }
    }, 100)
  }

  const onPause = () => {
    if (timeCheckInterval.current) {
      clearInterval(timeCheckInterval.current)
    }
  }

  useEffect(() => {
    return () => {
      if (timeCheckInterval.current) {
        clearInterval(timeCheckInterval.current)
      }
    }
  }, [])

  const opts: YouTubeProps['opts'] = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 0,
      modestbranding: 1,
      rel: 0,
    },
  }

  const getFullVideoUrl = () => {
    if (platform === 'youtube') {
      return `https://www.youtube.com/watch?v=${videoId}`
    }
    return '#'
  }

  return (
    <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden shadow-lg">
      <YouTube
        videoId={videoId}
        opts={opts}
        onReady={onReady}
        onPlay={onPlay}
        onPause={onPause}
        className="absolute inset-0 w-full h-full"
        iframeClassName="w-full h-full"
      />

      {showOverlay && (
        <div className="absolute inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center z-10">
          <div className="text-center px-6">
            <svg
              className="mx-auto mb-4 w-16 h-16 text-primary-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-xl font-semibold text-white mb-2">
              Want to see more?
            </h3>
            <p className="text-gray-300 mb-6">
              Watch the full performance on YouTube
            </p>
            <a
              href={getFullVideoUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition-colors duration-200"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              Watch Full Video on YouTube
            </a>
            <button
              onClick={() => {
                setShowOverlay(false)
                if (player) {
                  player.seekTo(0)
                }
              }}
              className="block mx-auto mt-4 text-gray-400 hover:text-white transition-colors"
            >
              Watch preview again
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

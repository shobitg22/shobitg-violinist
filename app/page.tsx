import Hero from '@/components/Hero'
import VideoGallery from '@/components/VideoGallery'
import About from '@/components/About'
import BookingForm from '@/components/BookingForm'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

// Read data from files
function getVideos() {
  const videosPath = path.join(process.cwd(), 'data', 'videos.json')
  const fileContents = fs.readFileSync(videosPath, 'utf8')
  return JSON.parse(fileContents).videos
}

function getAboutContent() {
  const aboutPath = path.join(process.cwd(), 'data', 'about.md')
  const fileContents = fs.readFileSync(aboutPath, 'utf8')
  const { content } = matter(fileContents)

  // Convert markdown to HTML (basic conversion)
  const htmlContent = content
    .replace(/^### (.*$)/gim, '<h3 class="text-2xl font-bold mb-3 mt-6">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="text-3xl font-bold mb-4 mt-8">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 class="text-4xl font-bold mb-6">$1</h1>')
    .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
    .replace(/\*(.*)\*/gim, '<em>$1</em>')
    .replace(/\n\n/g, '</p><p class="mb-4">')
    .replace(/^- (.*$)/gim, '<li class="ml-4">$1</li>')

  return `<p class="mb-4">${htmlContent}</p>`
}

function getUnavailableDates() {
  const availabilityPath = path.join(process.cwd(), 'data', 'availability.json')
  const fileContents = fs.readFileSync(availabilityPath, 'utf8')
  return JSON.parse(fileContents).unavailableDates
}

export default function Home() {
  const videos = getVideos()
  const aboutContent = getAboutContent()
  const unavailableDates = getUnavailableDates()

  return (
    <main className="min-h-screen">
      <Hero />
      <VideoGallery videos={videos} />
      <About content={aboutContent} />
      <BookingForm unavailableDates={unavailableDates} />

      {/* Footer */}
      <footer className="bg-accent-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="mb-4">
            &copy; {new Date().getFullYear()} Shobit G. All rights reserved.
          </p>
          <div className="flex justify-center gap-6">
            <a
              href="https://www.instagram.com/shobitg_violinist/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary-400 transition-colors"
            >
              Instagram
            </a>
            <a
              href="https://www.youtube.com/channel/UCph7dAy_GKgFHsbGdbs_vuw/videos"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary-400 transition-colors"
            >
              YouTube
            </a>
            <a
              href="https://wa.me/919419237802"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary-400 transition-colors"
            >
              WhatsApp
            </a>
            <a
              href="mailto:shobitji2@gmail.com"
              className="hover:text-primary-400 transition-colors"
            >
              Email
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}

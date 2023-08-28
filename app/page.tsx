
import Feed from '@/components/Feed'
import Header from '@/components/Header'
import UploadModal from '@/components/UploadModal'

export default function Home() {
  return (
    <main className="bg-gray-100">

      {/* Header */}
      <Header />

      {/* Feed */}
      <Feed />

      {/* Modal */}
      <UploadModal />

    </main>
  )
}

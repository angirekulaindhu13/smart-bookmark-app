'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { LogOut, Plus, Globe, Trash2 } from 'lucide-react'

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [bookmarks, setBookmarks] = useState([])
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(true)

  const router = useRouter()

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/')
        return
      }

      setUser(user)

      const { data } = await supabase
        .from('bookmarks')
        .select('*')
        .order('created_at', { ascending: false })

      setBookmarks(data || [])
      setLoading(false)
    }

    init()
  }, [router])

  const addBookmark = async () => {
    if (!title.trim() || !url.trim())
      return toast.error('Please fill all fields')

    const finalUrl = url.startsWith('http') ? url : `https://${url}`

    const { data, error } = await supabase
      .from('bookmarks')
      .insert([{ title, url: finalUrl, user_id: user.id }])
      .select()

    if (!error) {
      setBookmarks([data[0], ...bookmarks])
      setTitle('')
      setUrl('')
      toast.success('Bookmark Saved ✅')
    }
  }

  const deleteBookmark = async (id) => {
    const { error } = await supabase
      .from('bookmarks')
      .delete()
      .eq('id', id)

    if (!error) {
      setBookmarks(bookmarks.filter(b => b.id !== id))
      toast.success('Deleted ❌')
    }
  }

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center text-gray-400">
        Loading...
      </div>
    )

  return (
    <div className="min-h-screen p-6 md:p-12">
      {/* Added vertical spacing using space-y-16 */}
      <div className="max-w-4xl mx-auto space-y-16">

        {/* HEADER */}
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-gray-800">
              🔖 Smart Bookmark App
            </h1>
            <p className="text-xs text-gray-500">
              Welcome, {user?.email}
            </p>
          </div>

          {/* Brown Logout Button */}
          <button
            onClick={() => {
              supabase.auth.signOut()
              router.push('/')
            }}
            className="logout-btn"
          >
            <LogOut size={16} /> Logout
          </button>
        </header>

        {/* ADD BOOKMARK CARD */}
        <section className="card">
          <h2 className="card-title">Add New Bookmark</h2>

          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input-field"
            />

            <input
              type="text"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="input-field"
            />
          </div>

          <button
            onClick={addBookmark}
            className="primary-btn mt-6"
          >
            <Plus size={18} /> Add Bookmark
          </button>
        </section>

        {/* MY BOOKMARKS CARD */}
        <section className="card">
          <div className="mb-6">
            <h2 className="card-title">My Bookmarks</h2>
            <p className="text-sm text-gray-400">
              {bookmarks.length} bookmark(s) saved
            </p>
          </div>

          {bookmarks.length === 0 && (
            <p className="text-gray-400 text-sm">
              No bookmarks added yet.
            </p>
          )}

          <div className="space-y-4">
            {bookmarks.map((b) => (
              <div key={b.id} className="bookmark-item">
                <a
                  href={b.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 flex-1 overflow-hidden"
                >
                  <div className="icon-box">
                    <Globe size={18} />
                  </div>

                  <div className="truncate">
                    <p className="font-semibold text-sm text-gray-800">
                      {b.title}
                    </p>
                    <p className="text-xs text-gray-400 truncate">
                      {b.url}
                    </p>
                  </div>
                </a>

                <button
                  onClick={() => deleteBookmark(b.id)}
                  className="delete-btn"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}
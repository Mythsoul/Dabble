import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import PrivateRoute from "@/components/PrivateRoute"
import { ThemeProvider } from "@/components/theme-provider"
import { Sidebar } from "@/components/Sidebar"
import Home from "@/components/pages/Home"
import Explore from "@/components/pages/Explore"
import Notifications from "@/components/pages/Notifications"
import Messages from "@/components/pages/Messages"
import Bookmarks from "@/components/pages/Bookmarks"
import Profile from "@/components/pages/Profile"
import More from "@/components/pages/More"
import Login from "./components/pages/Login"
import ForwardRoute from "./components/ForwardRoute"
import Register from "./components/pages/Register"
import { useEffect } from "react"
import useAuthStore from "@/store/AuthStore"
import Logout from "./components/pages/Logout"

function App() {
  const checkAuth = useAuthStore((state) => state.checkAuth)

  useEffect(() => {
    checkAuth()
  }, [])

  return (
    <ThemeProvider defaultTheme="dark">
      <Router>
        <div className="flex min-h-screen bg-background text-foreground">
          <Sidebar />
          <main className="flex-1 max-w-[600px] border-x border-border min-h-screen mx-auto">
            <div className="p-4">
              <Routes>
                <Route path="/login" element={
                  <ForwardRoute> <Login /> </ForwardRoute>} />
                <Route path="/login/:provider" element={
                  <ForwardRoute> <Login /> </ForwardRoute>} />
                <Route path="/register" element={
                  <ForwardRoute> <Register /> </ForwardRoute>} />
                <Route path="/logout" element={<PrivateRoute> <Logout /> </PrivateRoute>} />
                <Route path="/" element={
                  <PrivateRoute>
                    <Home />
                  </PrivateRoute>
                } />
                <Route path="/explore" element={
                  <PrivateRoute>
                    <Explore />
                  </PrivateRoute>
                } />
                <Route path="/notifications" element={
                  <PrivateRoute>
                    <Notifications />
                  </PrivateRoute>
                } />
                <Route path="/messages" element={
                  <PrivateRoute>
                    <Messages />
                  </PrivateRoute>
                } />
                <Route path="/bookmarks" element={
                  <PrivateRoute>
                    <Bookmarks />
                  </PrivateRoute>
                } />
                <Route path="/profile" element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                } />
                <Route path="/more" element={
                  <PrivateRoute>
                    <More />
                  </PrivateRoute>
                } />

              </Routes>
            </div>
          </main>
          <div className="hidden lg:block w-[290px] xl:w-[350px] p-4">
            {/* Right sidebar content - could be search, trends, who to follow, etc. */}
            <div className="sticky top-4">
              <div className="bg-accent/30 rounded-xl p-4 mb-4">
                <h2 className="font-bold text-xl mb-4">What's happening</h2>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="space-y-1">
                      <p className="text-xs text-muted-foreground">Trending in Technology</p>
                      <p className="font-medium">Trending Topic #{i}</p>
                      <p className="text-xs text-muted-foreground">10.{i}K posts</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App
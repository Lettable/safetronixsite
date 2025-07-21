
export default function Footer() {
  return (
    <footer className="w-full bg-transparent backdrop-blur-md py-6 mt-20">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-300">
        <p>© {new Date().getFullYear()} Safetronix. All rights reserved.</p>
        
      </div>
    </footer>
  )
}

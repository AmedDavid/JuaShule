function Signup(){
    return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">UserName</label>
          <input type="email" className="w-full border rounded px-4 py-2" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Email</label>
          <input type="email" className="w-full border rounded px-4 py-2" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Password</label>
          <input type="password" className="w-full border rounded px-4 py-2" />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-1">School</label>
          <input type="password" className="w-full border rounded px-4 py-2" />
        </div>
        <button type="submit" className="w-full bg-primary text-white py-2 rounded">
          Signup
        </button>
      </form>
    </div>
  </div>
    )
}
export default Signup
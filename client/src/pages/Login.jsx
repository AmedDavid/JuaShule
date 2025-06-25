function Login(){
   return (
  <div
  className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
  style={{ backgroundImage: "url('/image/login.jpg')" }}
>
    <div className="bg-white p-8 rounded-xl shadow-lg w-[85%] max-w-xl">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Email</label>
          <input type="email" className="w-full border rounded px-4 py-2" />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-1">Password</label>
          <input type="password" className="w-full border rounded px-4 py-2" />
        </div>
        <button type="submit" className="w-full bg-primary text-white py-2 rounded">
          Login
        </button>
      </form>
    </div>
  </div>
);
}
export default Login
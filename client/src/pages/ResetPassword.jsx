
function Resources(){
   return (
  <div
  className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
  style={{ backgroundImage: "url('/image/resetpassword.jpg')" }}
>
    <div className="bg-white p-10 rounded-xl shadow-lg w-[85%] max-w-xl">
      <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>
      <form>
        <div className="mb-8">
          <label className="block text-gray-700 mb-1">Email</label>
          <input type="email" className="w-full border rounded px-4 py-2" />
        </div>
          <div className="flex justify-center">
        <button type="submit" className="w-[30%] bg-primary text-white py-2 rounded ">
         Send 
        </button>
        </div>
      </form>
    </div>
  </div>
);
}
export default Resources
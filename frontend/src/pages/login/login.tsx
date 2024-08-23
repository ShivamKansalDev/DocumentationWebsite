import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="login-section">
      <div className="login-card flex items-center justify-center flex-col">
        <div className="card w-80 p-5">
          <div className="relative  py-3 sm:max-w-xs sm:mx-auto">
            <div className="">
              <div className="flex flex-col justify-center items-center h-full select-none">
                <div className="flex flex-col items-center justify-center gap-1 mb-8">
                  <a href="https://amethgalarcio.web.app/" target="_blank">
                    <img
                      src="https://amethgalarcio.web.app/assets/logo-42fde28c.svg"
                      className="w-8"
                    />
                  </a>
                  <p className="m-0 text-[18px] font-semibold dark:text-white">
                    Login to your Account
                  </p>
                  <span className="m-0 text-sm text-center text-white">
                    Solution to all developers need
                  </span>
                </div>
                <div className="w-full flex flex-col gap-2">
                  <label className="font-medium text-lg text-white">
                    Email
                  </label>
                  <input
                    className="border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none text-black "
                    placeholder="Email"
                  />
                </div>
              </div>
              <div className="w-full flex flex-col gap-2">
                <label className="font-medium text-lg text-white">
                  Password
                </label>
                <input
                  type="password"
                  className="border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none text-black"
                  placeholder="••••••••"
                />
              </div>
              <div className="mt-5 mb-5">
                <Link to="/dashboard">
                  <button className="py-2 px-8 bg-blue-500 hover:bg-blue-800  text-white w-full transition ease-in duration-200 text-center text-base font-semibold outline-none rounded-lg ">
                    Login
                  </button>
                </Link>
              </div>
              <div className="flex items-center justify-center">
                <button className="w-full justify-center items-center px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg bg-white text-black">
                  <img
                    className="w-5 h-5 absolute left-5"
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    loading="lazy"
                    alt="google logo"
                  />
                  <span>Login with Google</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useForm } from "react-hook-form";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

interface LoginForm {
  email: string;
  password: string;
}

const Login = () => {
  const { register, handleSubmit, setValue } = useForm<LoginForm>();
  const [signInWithGoogle] = useSignInWithGoogle(auth);

  const onSubmit = (data: LoginForm) => {};

  return (
    <section className="flex items-center justify-center min-h-screen">
      <div className="w-[392px]">
        <h2 className="text-2xl font-extrabold text-center text-gray-800">
          로그인
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-4">
            <label
              htmlFor="email"
              className="block mb-2 text-sm text-[#999999]"
            >
              이메일
            </label>
            <input
              id="email"
              className="border border-[#CFCFCF] text-sm rounded-md block w-full p-2.5"
              placeholder="이메일을 입력하세요"
              type="email"
              {...register("email")}
            />
          </div>
          <div className="mt-4">
            <label
              htmlFor="password"
              className="block mb-2 text-sm text-[#999999]"
            >
              비밀번호
            </label>
            <input
              id="password"
              className="border border-[#CFCFCF] text-sm rounded-md block w-full p-2.5"
              placeholder="비밀번호를 입력하세요"
              type="password"
              {...register("password")}
            />
          </div>
          <div className="mt-10">
            <button
              type="submit"
              className="w-full px-6 py-2 duration-200 border rounded-3xl bg-[#00B98B] text-white hover:bg-white hover:text-[#00B98D]"
            >
              로그인
            </button>
            <button
              type="button"
              className="w-full px-6 py-2 duration-200 border rounded-3xl hover:bg-[#00B98D] hover:text-white mt-4"
              onClick={() => {
                signInWithGoogle();
              }}
            >
              Google 계정으로 로그인
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;

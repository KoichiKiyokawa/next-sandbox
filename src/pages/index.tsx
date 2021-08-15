import { Form } from "../components/Form";
import { Input } from "../components/Input";
import { useForm } from "react-hook-form";

type FormData = {
  email: string;
  password: string;
};

const Home = () => {
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="border shadow rounded p-4 max-w-screen-md mx-auto mt-10">
      <h2 className="text-2xl font-bold">ログイン</h2>

      <Input type="email" label="email" autoComplete="email" {...register("email")} />
      <Input type="password" label="password" autoComplete="current-password" {...register("password")} />

      <div className="flex justify-center">
        <button className="p-2 bg-blue-400 text-white rounded">ログイン</button>
      </div>
    </Form>
  );
};

export default Home;

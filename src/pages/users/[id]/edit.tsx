import Form from "src/components/Form";
import { Input } from "src/components/Input";
import { User, UserRepository } from "src/domains/user/repository";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { formatYYYYMMDD } from "src/utils/date";

type FormData = { user: Omit<User, "id" | "password"> };

const UserEdit = () => {
  const { register, handleSubmit, setValue } = useForm<FormData>();
  const onSubmit = (data: FormData) => {
    // console.log(JSON.stringify(data, null, 2));
    console.log(data);
  };

  const router = useRouter();
  useEffect(() => {
    UserRepository.find(Number(router.query.id)).then((user) => {
      if (user) setValue("user", { ...user, birthday: formatYYYYMMDD(user.birthday) as unknown as Date });
    });
  }, [router.query.id, setValue]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="border rounded p-4 m-2">
      <Input label="氏名" {...register("user.name")} />
      <Input label="メールアドレス" type="email" {...register("user.email")} />
      <Input label="誕生日" type="date" {...register("user.birthday", { valueAsDate: true })} />
      <button className="bg-blue-400 text-white rounded p-2">確定</button>
    </Form>
  );
};

export default UserEdit;

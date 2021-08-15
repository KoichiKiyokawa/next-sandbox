import Form from "src/components/Form";
import { Input } from "src/components/Input";
import { User, UserRepository } from "src/domains/user/repository";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { formatYYYYMMDD } from "src/utils/date";
import { ErrorMessage } from "src/components/ErrorMessage";

type FormData = { user: Omit<User, "id" | "password"> };

const UserEdit = () => {
  const { register, handleSubmit, setValue, formState } = useForm<FormData>({ mode: "onBlur" });
  const onSubmit = async (data: FormData) => {
    await new Promise((res) => setTimeout(res, 1000));
    console.log(data);
    router.push(`/users/${router.query.id}`);
  };

  const router = useRouter();
  useEffect(() => {
    UserRepository.find(Number(router.query.id)).then((user) => {
      if (user) setValue("user", { ...user, birthday: formatYYYYMMDD(user.birthday) as unknown as Date });
    });
  }, [router.query.id, setValue]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="border rounded p-4 m-2">
      <Input label="氏名" {...register("user.name", { minLength: 7 })} />
      {formState.errors.user?.name?.type === "minLength" && (
        <ErrorMessage>名前は7文字以上で入力してください</ErrorMessage>
      )}
      <Input label="メールアドレス" type="email" {...register("user.email")} />
      <Input label="誕生日" type="date" {...register("user.birthday", { valueAsDate: true })} />
      <button
        disabled={!formState.isValid || formState.isSubmitting}
        className="bg-blue-400 text-white rounded p-2 disabled:opacity-20 disabled:cursor-not-allowed"
      >
        確定
      </button>
    </Form>
  );
};

export default UserEdit;

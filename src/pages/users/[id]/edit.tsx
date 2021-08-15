import Form from "src/components/Form";
import { Input } from "src/components/Input";
import { UserRepository } from "src/domains/user/repository";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { formatYYYYMMDD } from "src/utils/date";
import { ErrorMessage } from "src/components/ErrorMessage";
import { pagesPath } from "src/utils/$path";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const userSchema = z.object({
  user: z.object({
    name: z.string().min(7, { message: "氏名は7文字以上で入力してください" }),
    email: z.string().email({ message: "メールアドレスの形式が間違っています" }),
    birthday: z.date().refine((v) => v < new Date(), { message: "過去の日付を選択してください" }),
  }),
});

type FormData = z.infer<typeof userSchema>;

const UserEdit = () => {
  const { register, handleSubmit, setValue, formState } = useForm<FormData>({
    mode: "onChange",
    resolver: zodResolver(userSchema),
  });
  const onSubmit = async ({ user }: FormData) => {
    await new Promise((res) => setTimeout(res, 1000));
    console.log(user);
    router.push(pagesPath.users._id(String(router.query.id)).$url());
  };

  const router = useRouter();
  useEffect(() => {
    UserRepository.find(Number(router.query.id)).then((user) => {
      if (user) setValue("user", { ...user, birthday: formatYYYYMMDD(user.birthday) });
    });
  }, [router.query.id, setValue]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="border rounded p-4 m-2">
      <Input label="氏名" {...register("user.name", { minLength: 7 })} />
      <ErrorMessage message={formState.errors.user?.name?.message} />

      <Input label="メールアドレス" type="email" {...register("user.email")} />
      <ErrorMessage message={formState.errors.user?.email?.message} />

      <Input label="誕生日" type="date" {...register("user.birthday", { valueAsDate: true })} />
      <ErrorMessage message={formState.errors.user?.birthday?.message} />

      <button
        disabled={!formState.isValid || formState.isSubmitting}
        className="block bg-blue-400 text-white rounded p-2 disabled:opacity-20 disabled:cursor-not-allowed"
      >
        確定
      </button>
    </Form>
  );
};

export default UserEdit;

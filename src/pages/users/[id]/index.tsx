import Link from "next/link";
import { useRouter } from "next/router";
import { pagesPath } from "src/utils/$path";
import { useRepository } from "../../../domains/core/repository";
import { UserRepository } from "../../../domains/user/repository";

const Loading = () => <span>Loading...</span>;

const UserShow = () => {
  const router = useRouter();
  const user = useRepository(UserRepository.find(Number(router.query.id)));

  if (user === undefined) return <Loading />;
  if (user === null) return <span>no user</span>;

  return (
    <div>
      <p className="text-blue-500">{user.name}</p>
      <p>{user.email}</p>

      <Link href={pagesPath.users._id(user.id).edit.$url()}>edit</Link>
    </div>
  );
};

export default UserShow;

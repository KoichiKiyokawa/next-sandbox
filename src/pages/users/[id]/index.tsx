import Link from "next/link";
import { useRouter } from "next/router";
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
      <a href={`/users/${user.id}`} className="text-blue-500">
        {user.name}
      </a>
      <p>{user.email}</p>

      <Link href={`/users/${user.id}/edit`}>edit</Link>
    </div>
  );
};

export default UserShow;

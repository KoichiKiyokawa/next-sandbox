import Link from "next/link";
import { useRepository } from "../../domains/core/repository";
import { UserRepository } from "../../domains/user/repository";

const UserIndex = () => {
  const users = useRepository(UserRepository.all());
  if (users === undefined) return <span>Loading...</span>;
  if (users === null) return <span>ユーザが存在しません</span>;

  return (
    <div>
      {users.map((user, i) => (
        <div key={i}>
          <Link href={`/users/${user.id}`}>
            <a className="text-blue-500">{user.name}</a>
          </Link>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  );
};

export default UserIndex;

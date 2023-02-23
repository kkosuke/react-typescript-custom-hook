import { UserCard } from "./components/UserCard";
import { UserAllUsers } from "./hooks/useAllUsers";

function App() {
  const { getUsers, userProfiles, loading, error } = UserAllUsers();
  const onClickFetchUser = () => getUsers();
  return (
    <div className="App">
      <button onClick={onClickFetchUser}>データ取得</button>
      <br />
      {error ? (
        <p>でーたの取得に失敗しました</p>
      ) : loading ? (
        <p>読み込み中</p>
      ) : (
        <>
          {userProfiles.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </>
      )}
    </div>
  );
}

export default App;

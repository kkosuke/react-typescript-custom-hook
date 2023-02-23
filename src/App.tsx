import axios from "axios";
import React, { useState } from "react";
import { UserCard } from "./components/UserCard";
import { User } from "./types/api/user";
import { UserProfile } from "./types/UserProfile";

function App() {
  const [userProfile, setUserProfile] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const onClickFetchUser = () => {
    setLoading(true);
    setError(false);
    axios
      .get<User[]>("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        const data = res.data.map((user) => ({
          id: user.id,
          name: `${user.name}(${user.username})`,
          email: user.email,
          address: `${user.address.city}${user.address.suite}${user.address.street}`,
        }));
        setUserProfile(data);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };
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
          {userProfile.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </>
      )}
    </div>
  );
}

export default App;

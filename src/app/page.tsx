"use client";

import { useEffect, useState } from "react";

interface userdata {
  username: string;
  email: string;
}

export default function Home() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [data, setData] = useState<userdata[]>([]);

  useEffect(() => {
    console.log(username, ",", email);
  }, [username, email]);

  const add_data = async ({
    name,
    email_address,
  }: {
    name: string;
    email_address: string;
  }) => {
    try {
      const result = await fetch("http://localhost:3001/add-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: name, email: email_address }),
      });

      const data = await result.json();

      if (result.ok) {
        console.log("User added successfully");
      } else {
        console.log("Error: " + data);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const getdata = async () => {
    try {
      const result = await fetch("http://localhost:3001/get-user");
      const data = await result.json();
      setData(data);
      console.log(data);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="h-[100vh] w-full flex flex-col items-center align-middle justify-center ">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          add_data({ email_address: email, name: username });
        }}
      >
        <div className="grid gap-3 w-[300px]">
          <label>Username:</label>
          <input
            placeholder="enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label>Email:</label>
          <input
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button type="submit">Submit</button>
          <button type="button" onClick={() => getdata()}>
            Get data
          </button>
        </div>
      </form>

      {data && (
        <div className="flex flex-col gap-2">
          {data.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center w-full border-b pb-2"
            >
              <div className="w-1/2">
                <span>Username: {item.username}</span>
              </div>
              <div className="w-[300px] text-right">
                <span>Email: {item.email}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

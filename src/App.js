import React from 'react';
import { gql, useQuery, useApolloClient } from '@apollo/client';

const ALL_PEOPLE = gql`
  query AllPeople {
    people {
      id
      name
    }
  }
`;

export default function App() {
  const { loading, data } = useQuery(ALL_PEOPLE);
  const apolloClient = useApolloClient();

  const onHandleChange = (id, value) => {
    const newData = {
      people: data.people.map((person) =>
        person.id === id ? { ...person, name: value } : person
      ),
    };

    apolloClient.writeQuery({
      query: ALL_PEOPLE,
      data: newData,
    });
  };

  return (
    <main>
      <h1>Apollo Client Issue Reproduction</h1>
      <p>
        This application can be used to demonstrate an error in Apollo Client.
      </p>
      <h2>Names</h2>
      {loading ? (
        <p>Loading…</p>
      ) : (
        <ul>
          {data.people.map((person) => (
            <li key={person.id}>
              <input
                value={person.name}
                onChange={(e) => onHandleChange(person.id, e.target.value)}
              />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

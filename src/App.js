import React, {useState, useEffect} from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  async function handleAddRepository({title='No name project',url='https//exampleurl.com',techs=['NodeJS','ReactJS','React Native']}) {
    const response = await api.post('/repositories', {
      title,
      url,
      techs
    });
    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    const repoIndex = repositories.findIndex(repo => repo.id === id);
    repositories.splice(repoIndex, 1);
    const alteredRepositories = [...repositories];
    setRepositories(alteredRepositories);
  }

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository =>
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        )}
      </ul>

      <button onClick={() => handleAddRepository({})}>Adicionar</button>
    </div>
  );
}

export default App;

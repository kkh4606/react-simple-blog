import Layout from "./componments/Layout";

function App() {
  let { getUsers, getUser } = useContext(authContext);
  let { getPosts } = useContext(postContext);

  useEffect(() => {
    getUser();
    getUsers();
    getPosts();
  }, []);

  return <Layout />;
}

export default App;

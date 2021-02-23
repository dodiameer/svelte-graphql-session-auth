<script>
  import { Link, Route, Router } from "svelte-navigator";
  import Login from "./Login.svelte";
  import PrivateRoute from "./PrivateRoute.svelte";
  import Profile from "./Profile.svelte";
  import { initClient } from "@urql/svelte";
  import Home from "./Home.svelte";

  initClient({
    url: "http://localhost:4040/graphql",
    fetchOptions: {
      credentials: "include",
    },
  });
</script>

<Router>
  <nav>
    <Link to="/">Home</Link>
    <Link to="profile">Profile</Link>
  </nav>
  <main>
    <Route path="login"><Login /></Route>
    <Route path="/">
      <Home />
    </Route>
    <Route path="/home">
      <Home />
    </Route>
    <PrivateRoute path="profile">
      <Profile />
    </PrivateRoute>
  </main>
</Router>

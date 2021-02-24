<script>
  import { gql, mutation, operationStore } from "@urql/svelte";
  import { useLocation, useNavigate } from "svelte-navigator";
  import { user } from "../stores";

  const location = useLocation();
  const navigate = useNavigate();

  const mutationStore = operationStore(gql`
    mutation login($username: String!, $password: String!) {
      login(username: $username, password: $password) {
        id
        username
        fullname
        email
      }
    }
  `);

  const runLogin = mutation(mutationStore);

  const formState = {
    username: "",
    password: "",
    isLoading: false,
    error: null,
  };

  const handleSubmit = async () => {
    formState.error = null;
    formState.isLoading = true;
    const result = await runLogin({ ...formState });
    formState.isLoading = false;
    if (result.error) {
      switch (true) {
        case result.error.graphQLErrors.length > 0:
          formState.error = result.error.graphQLErrors[0];
          break;
        case result.error.networkError:
          formState.error = result.error.networkError;
        default:
          formState.error = {
            message: "Something went wrong, please try again.",
          };
          break;
      }
      return;
    }
    user.set(result.data.login);
    const previousLocation = $location?.state?.from ?? "/";
    navigate(previousLocation, {
      replace: true,
    });
  };
</script>

<h1>Login</h1>
<div class="errors">
  {#if formState.isLoading}
    <h2>Loading...</h2>
  {:else if formState.error}
    <h2>Error: {formState.error.message}</h2>
  {/if}
</div>
<form on:submit|preventDefault="{handleSubmit}">
  <label>
    Username:
    <input type="text" bind:value="{formState.username}" />
  </label>
  <label>
    Password:
    <input type="password" bind:value="{formState.password}" />
  </label>
  <button type="submit" disabled="{formState.isLoading}">Login</button>
</form>

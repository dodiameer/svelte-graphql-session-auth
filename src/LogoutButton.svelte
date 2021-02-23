<script>
  import { gql, mutation, operationStore } from "@urql/svelte";
  import { user } from "./stores";
  import { useNavigate } from "svelte-navigator";
  const mutationStore = operationStore(gql`
    mutation {
      logout
    }
  `);

  const navigate = useNavigate();

  const runLogout = mutation(mutationStore);

  const clickHandler = async () => {
    await runLogout();
    setTimeout(() => ($user = null), 100);
    navigate("/", { replace: true });
  };
</script>

<button on:click="{clickHandler}"> Logout </button>

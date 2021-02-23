<script>
  import LogoutButton from "./LogoutButton.svelte";
  import { user } from "./stores";
</script>

<h1>Hi, {$user.username}</h1>
<h2>Your info:</h2>
<ul>
  <li>Name: {$user.fullname}</li>
  <li>
    Email: {$user.email}
  </li>
</ul>

<LogoutButton />

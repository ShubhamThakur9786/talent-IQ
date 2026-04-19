
import './App.css'
import { Show, SignInButton, SignOutButton, SignUpButton, UserButton } from '@clerk/react'

function App() {

  return (
    <>
      <h1>Welcome to my app</h1>
      {/* <SignInButton mode='modal' /> */}
      <Show when="signed-out">
          <SignInButton />
          <SignUpButton />
        </Show>
        <Show when="signed-in">
          <SignOutButton/>
          <UserButton />
        </Show>
    </>
  )
}

export default App

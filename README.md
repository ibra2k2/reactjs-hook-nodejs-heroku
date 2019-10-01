### `data in server`
When creating notes in our application, we would naturally want to store them in some backend server. The json-server (https://nodejs-json-server.herokuapp.com/notes) package claims to be a so-called REST or RESTful API.

### `Sending Data to the Server`
We create a new object for the note but omit the id property, since it's better to let the server generate ids for our resources. The object is sent to the server using the axios post method and recieving data using the axios get method as well as using the axios update and delete method too.


### `Changing the importance of notes`
Let's add a button to every note that can be used for toggling its importance. We add a button to the component and assign its event handler as the toggleImportance function passed in the component's props.

### `Extracting communication with the backend into a separate module`
Let's create a src/services directory and add a file there called notes.js

### `Promises and errors`
If our application allowed users to delete notes, we could end up in a situation where a user tries to change the importance of a note that has already been deleted from the system.
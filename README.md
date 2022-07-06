# Create a react app with npx create-react-app appName --template redux

## npm install axios

## create a data folder and within a db.json file with this Content

{
"todos": [
{
"id": 1,
"text": "Learn Redux",
"completed": false
},
{
"id": 2,
"text": "Learn React",
"completed": false
},
{
"id": 3,
"text": "Learn React Native",
"completed": false
}
]
}

## take the unnecessary things out from app component

## in the features folder delete the counter folder and create a folder called todos

## in the todos folder create a file called todosSlice.js

Step 1
import createSlice and createAsyncThunk from @reduxjs/toolkit
import axios from 'axios'

Step 2
Create an object call initialState that will have three properties:

1. todos: an array of todo objects initially empty
2. status: a string that will be either 'idle', 'loading','succeeded', 'failed'
   initially set to 'idle'
3. error: a error object that will be set to null initially

Step 3
Create a variable called todosSlice that will be a slice of the state
The slice will have the following properties:

1. name: 'todos'
2. initialState: the initialState object
3. reducers: an object that will have three properties
4. addTodo: a function that will take in the current state and the action
   and will mutate the state to add the action.payload to the todos array
5. removeTodo: a function that will take in the current state and the action
   and will mutate the state to remove the action.payload from the todos array
6. toggleTodo: a function that will take in the current state and the action
   and will mutate the state to toggle the completed property of the todo with
   the id saved inaction.payload

Step 4
At the bottom of the file export the actions that will be used in the components from the slice.actions

Step 5
After the action's export - Export default the slice.reducer

Step 6
define the url to fetch all todosSlice from the json server thats running on port 3500 below the imports name the variable TODOS_URL

Step 7 example:
Remember actiontype follows the convention sliceName/action
A thunk can be created like this:
export const actionName = createAsyncThunk('actiontype', async() => {
try {
const { data } = await axios.get(url);
return [...data];
} catch (error) {
return error.message;
}
}

Step 7
Create a thunk for fetching all todosSlice from the json server
a thunk is composed of a string with the sliceName / the action name
and a function that will be called when the thunk is dispatched
the function will return the result of the call of the axios.get

Step 8
create a property called extraReducers after the reducers property inside of createSlice
that will be a function with the following signature:
extraReducers(builder) => {
builder
}

Step 9
start by writing calling builder and then adding a .addCase() where you will first pass
to addCase the thunk.promise status(promise status are pending, fulfilled and rejected)
like for example .addCase(fetchTodos.pending, func) where func is
a function that will take in the current state and the action and will mutate the state
to set the status to 'loading'
DO THIS FOR EACH PROMISE STATUS and update the corresponding state in each case
the 3 cases you have to build will be similar to these:
.addCase(thunkName.pending,func)
.addCase(thunkName.fulfilled,func)
.addCase(thunkName.rejected,func)

Step 10
Bellow TODOS_URL Create a Post url for the todos using json-server endpoint call it
POST_TODO_URL

Step 11
Bellow the thunk to get all the todos from json-server
Create a thunk for hitting the post endpoint of json-server
with a new todo object and a async function that will be called when
the thunk is dispatched the function will return the result of the call
of the axios.post to the POST_TODO_URL with the new todo

Step 12
Bellow the addCase(thunkName.rejected,func)
add a new addCase but this time only for the fulfilled status and use a
function that will take in the current state and the action and will mutate the state
to add the new todo that is in the action payload

Step 13
Bellow step4
create three selectors one for getting all the todos, one for getting the status and
one for getting the error selectors follow this pattern:
export const selectorName = (state) => return state.sliceName.propertyName;

## Create a component call TodoList inside of the features/todos folder

Step 1:
Create a React Functional Component

Step 2:
import useEffect from react

Step3:
import useSelector and useDispatch from 'react-redux';

Step4:
import All the selectors from the todosSlice and the fetchTodos thunk

Step4:
Inside of the Component
initialize useDispatch

Step5:
create a variable todos and set it equal to useSelector(selectAllTodos)

Step6:
create a variable status and set it equal to useSelector(selectStatus)

Step7:
create a variable error and set it equal to useSelector(selectError)

Step8
create a useEffect
Inside it check if status is equal to "idle"
if status is idle then dispatch the fetchtodos(thunk)
In the dependency array put dispatch and status

Step9:
Create a undefined variable called content
like this let content;

Step10:
set content to equal a p tag with the text Loading...
if status variable is equal to "loading"

Step11:
check else if that status === 'succeeded'
and inside it set content to be equal to the result of mapping the todos array

Step12:
check else if that status === 'failed'
and inside it set content to be equal to a p tag with the error message as text

Step13:
in the return statement inside a div include a h1 with the text 'Todos'
after the h1 include the content variable
like this {content}

## Create a component call AddTodoForm inside of the features/todos folder

Step1:
Create a React functional component

Step 2:
import useState from react

Step 3:
import useDispatch from react-redux

Step 4:
import addNewTodo from the todos slice

Step 5:
create a dispatch function

Step 6:
create a todoText state variable and set it to an empty string using useState

Step 7:
create a variable called completed and set it to false
using useState

Step 8:
create a variable addRequestStatus and set it to the 'idle' using useState

Step 9:
create a function called handleTodoTextChange to handle the onChange event for the todoText input
like this example
const handleStateVariableChange = (e) => {
setStateVariable(e.target.value);
}

Step 10:
create a function called handleCompletedChange to handle the onChange event for the completed input
like this example:
const handleStateVariableChange = (e) => {
setStateVariable(e.target.value);
}

Step 11:
After the last handleChange function
add a variable called canSave that will be the result of checking that todoText
is not empty and that addRequestStatus is equal to 'idle'

Step 12:
create a function onSaveTodoClicked to handle the onClick event for the save button of the form that
we will create later.

Step 13:
Inside of onSaveTodoClicked function
check that canSave is true

Step 13:
add a try catch block with a finally block as well

Step 14:
inside of the try block set addRequestStatus to 'pending'
using setAddRequestStatus function

Step 15:
dispatch the addNewTodo(thunk) action with the todoText and completed inside an object declaration as parameters
also add a .unwrap() to the dispatch call
unwrap returns and error if it is rejected.
this will look like this example:
dispatch(addNewTodo({todoText,completed})).unwrap();

Step 16:
setTodoText to an empty string using setTodoText function
setCompleted to false using setCompleted function

Step 17:
In the catch
console.error Failed to save the post and the error
like this example
catch(error){
console.error('Failed to save the post',error);
}

Step 18:
Inside of the finally block
set addRequestStatus to 'idle'
using the setAddRequestStatus function

Step 19:
Inside of the return of the functional component
return a div that within have a h1 with value Add New Todo
and a form for the user to enter the todotext and a checkbox for
completed and a button with the value Save

Step 20:
set the onclick function of the save button to use
the onSaveTodoClicked function we wrote earlier

## Inside of App folder in the store.js file configure the store settings

Step1:
import configureStore from @reduxjs/toolkit

Step2:
import the reducer from the reducer the todos folder in the todosSlice

Step3:
Create and export a const variable named store and set it equal to the configureStore
with and empty object as it's parameter

Step4:
Add the reducer key inside the empty object of configureStore
add a key call todos and a value of the todosReducer we imported
earlier

the final Example would look like:
export const store= configureStore({
reducer: {
todos: todosReducer
}
})

## Inside of the App.js component import both TodoList and AddTodoForm and render AddTodoForm and TodoList

## Create a separate terminal and use json-server --watch --port 3500 data/db.json

## Run The React App

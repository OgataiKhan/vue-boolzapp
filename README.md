# Boolzapp

In this project I am replicating the layout and some of the functionality of the WhatsApp webapp.  
The project will be completed over the span of three separate milestones, and all three will be preserved in the repo separately in order to show my work at various stages of the project.

## Features

TBD

## Workflow

### Milestone 1

In this milestone I recreate the graphical interface of the webapp and populare the list of contacts dynamically with Vue.js.

JS:
1. Use v-for to populate the contact list with the relevant data. Use v-bind to access specific properties.

### Milestone 2

In this milestone I introduce dymanic visualization of messages for each contact on click.

1. Use v-for to populate the chat with the messages of the active contact.  
2. Add Luxon, create a method that reformats message times to show just the hours and minutes, use it to display the times in the message bubbles.  
3. Create a method that changes the contactIndex to match its argument. Use v-on to invoke the method when clicking on a contact in the contact list. This changes the active contact and displays their message history in the chat window.

### Milestone 3

In this milestone I add the possibility to write new messages and have them appear in the chat window after pressing Enter. Each message sent will be followed by an "ok" reply one second later.

1. Add a newMsg property and use v-model to attach it to the new message input field.
2. Create sendMsg method that pushes the value of the input field into the messages array of the active contact along with the current time.
3. Trigger the method when pressing Enter using v-on.
4. Create autoResponse method which sends back an "ok" reply.
5. Invoke autoResponse at the end of sendMsg after one second using setTimeout().

### Milestone 4

In this milestone I add a contact search feature that dynamically filters the contact list based on the string currently present in the searchbar.

1. Create a contactSearch property that tracks the content of the contact search bar with v-model.
2. Use a watcher to dynamically toggle the visible property of users whose names don't include the current search string.

### Milestone 5

In this milestone I add a "delete message" feature. I also visualize the time and text of the last sent or received message for each contact in the contact list.

Part 1:

1. Create a button in the corner of each message bubble that will trigger the appearance of the dropdown menu. The button will only be visible when hovered.  
2. Create the dropdown menu in html and css.
3. Create a dropdownsShown property that will keep track of which dropdown should be open based on a set of coordinates.
4. Create a toggleDropdown method that will close the dropdown if it's open. If it's not, it will open only that dropdown (closing any other open dropdowns if present).
5. Invoke the method on click of the angle symbol with v-on.
6. Create deleteMessage method that uses splice to remove a message from its array.
7. Use v-on to trigger the function when clicking the "Delete message" button, passing it the appropriate arguments.

Part 2:

1. Create getLastMessageTime method that returns nothing if no messages are present for a given contact, the time of the last message if was sent today, and the date of the last message if it was sent before today. Use Luxon to manage dates and times.
2. Create cropMessage method that crops longer messages in order to display them in smaller spaces.
3. Display text and time of the last message for each contact in the contact list.